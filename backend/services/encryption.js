const crypto = require('crypto');

// 🔑 32-byte key for AES-256-GCM
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 64 hex characters
const IV_LENGTH = 16; // AES standard

// ----------------------
// Encrypt text (password)
// ----------------------
function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  // Store as iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

// ----------------------
// Decrypt text
// ----------------------
function decrypt(encryptedText) {
  const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );

  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };
