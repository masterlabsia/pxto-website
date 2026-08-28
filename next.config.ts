import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy. TECHNICAL_ARCHITECTURE 15.
 *
 * Every directive is locked to 'self' except script-src and style-src.
 *
 * Those two carry 'unsafe-inline' because Next.js App Router injects its own
 * inline bootstrap script and inline styles on every page. Removing that would
 * require nonces, and nonces require middleware, which forces every page into
 * dynamic rendering. For a twelve page static site the trade is not worth it:
 * the site has no user accounts, no session, no third party script and no user
 * generated content, so the XSS surface this would close is close to nil.
 *
 * This corrects TECHNICAL_ARCHITECTURE 15, which claimed a strict script CSP
 * was achievable with a nonce on the JSON-LD block alone. It is not.
 *
 * DESENVOLVIMENTO. O `next dev` usa eval() para hot module replacement e um
 * websocket para avisar o browser de cada alteração. Sem 'unsafe-eval' e sem
 * ws: no connect-src, a CSP bloqueia os dois: a página carrega, mas para de
 * atualizar sozinha e o console enche de erro de CSP.
 *
 * As permissões extras existem SOMENTE em desenvolvimento. A CSP de produção
 * continua idêntica, e a auditoria de segurança roda contra o build de
 * produção, então a diferença não afrouxa o que é verificado.
 *
 * Revisit if the site ever gains authentication or renders user input.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
