/**
 * URL Validator & Protocol Sanitizer
 * Generated autonomously by Hiven Swarm Engine V3
 */

const ALLOWED_PROTOCOLS = new Set(["https:", "wss:", "http:"]);

export function isValidUrl(input) {
  if (!input || typeof input !== "string") return false;
  try {
    const parsed = new URL(input);
    return ALLOWED_PROTOCOLS.has(parsed.protocol);
  } catch {
    return false;
  }
}

export function sanitizeUrl(input) {
  if (!isValidUrl(input)) {
    throw new Error("Invalid or untrusted URL protocol.");
  }
  const parsed = new URL(input);
  parsed.hash = "";
  return parsed.toString();
}
