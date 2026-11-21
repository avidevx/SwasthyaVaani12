import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATIC_DIR = path.resolve(__dirname, 'static');
const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';

const SAFE_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function loadDotEnvIfPresent() {
  const envPath = path.resolve(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      let val = line.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (key && !(key in process.env)) {
        process.env[key] = val;
      }
    }
  } catch {
    // Ignore unreadable .env files
  }
}

loadDotEnvIfPresent();

function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function createLiveKitJwt({apiKey, apiSecret, identity, name, metadata, room}) {
  const now = Math.floor(Date.now() / 1000);
  const header = {alg: 'HS256', typ: 'JWT'};
  const payload = {
    iss: apiKey,
    sub: identity,
    name,
    metadata,
    nbf: now,
    exp: now + 6 * 60 * 60,
    video: {
      roomJoin: true,
      room,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    },
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${signingInput}.${signature}`;
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders,
  });
  res.end(body);
}

function serveStaticFile(req, res, pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(res, 400, {detail: 'Malformed URL path.'});
    return;
  }

  if (decodedPath.includes('\0')) {
    sendJson(res, 400, {detail: 'Invalid path.'});
    return;
  }

  const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, '');
  const resolvedPath = path.resolve(STATIC_DIR, relativePath);

  if (resolvedPath !== STATIC_DIR && !resolvedPath.startsWith(STATIC_DIR + path.sep)) {
    sendJson(res, 403, {detail: 'Forbidden.'});
    return;
  }

  let filePath = resolvedPath;
  try {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch {
    sendJson(res, 404, {detail: 'Not Found'});
    return;
  }

  if (!filePath.startsWith(STATIC_DIR + path.sep)) {
    sendJson(res, 403, {detail: 'Forbidden.'});
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const headers = {'Content-Type': contentType};
  if (path.basename(filePath) === 'sw.js') {
    headers['Cache-Control'] = 'no-cache';
    headers['Service-Worker-Allowed'] = '/';
  }

  res.writeHead(200, headers);
  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) {
      sendJson(res, 500, {detail: 'Failed to read static asset.'});
    } else {
      res.end();
    }
  });
  stream.pipe(res);
}

const server = http.createServer((req, res) => {
  const method = req.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    sendJson(res, 405, {detail: 'Method Not Allowed'});
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/health') {
    sendJson(res, 200, {status: 'ok'});
    return;
  }

  if (url.pathname === '/token') {
    const room = url.searchParams.get('room') || 'asha-demo';
    const beneficiaryId = url.searchParams.get('beneficiary_id') || 'ASHA-104';

    if (!SAFE_ID_PATTERN.test(room) || !SAFE_ID_PATTERN.test(beneficiaryId)) {
      sendJson(res, 422, {
        detail: 'Invalid room or beneficiary_id parameter.',
      });
      return;
    }

    const livekitUrl = (process.env.LIVEKIT_URL || '').trim();
    const apiKey = (process.env.LIVEKIT_API_KEY || '').trim();
    const apiSecret = (process.env.LIVEKIT_API_SECRET || '').trim();

    if (!livekitUrl || !apiKey || !apiSecret) {
      sendJson(
        res,
        503,
        {
          detail:
            'LiveKit credentials are not configured on the server. Set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET.',
        },
        {'Cache-Control': 'no-store'},
      );
      return;
    }

    const identity = `asha-${beneficiaryId}-${crypto.randomBytes(4).toString('hex')}`;
    const token = createLiveKitJwt({
      apiKey,
      apiSecret,
      identity,
      name: `ASHA Worker (${beneficiaryId})`,
      metadata: JSON.stringify({beneficiary_id: beneficiaryId}),
      room,
    });

    sendJson(
      res,
      200,
      {
        url: livekitUrl,
        token,
        room,
        identity,
      },
      {'Cache-Control': 'no-store'},
    );
    return;
  }

  serveStaticFile(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`SwasthyaVaani static PWA server listening on http://${HOST}:${PORT}`);
});
