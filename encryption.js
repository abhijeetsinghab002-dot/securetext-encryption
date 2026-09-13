'use strict';
const crypto = require('crypto');
const ITERATIONS = 210000;
function required(value, name) { if (typeof value !== 'string' || !value) throw new TypeError(`${name} must not be empty.`); }
function key(password, salt) { return crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256'); }
function encrypt(text, password) {
  required(text, 'Text'); required(password, 'Password');
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key(password, salt), iv);
  const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return ['v1', salt, iv, cipher.getAuthTag(), ciphertext].map(v => Buffer.isBuffer(v) ? v.toString('base64') : v).join('.');
}
function decrypt(payload, password) {
  required(payload, 'Encrypted text'); required(password, 'Password');
  const parts = payload.split('.');
  if (parts.length !== 5 || parts[0] !== 'v1') throw new Error('Invalid encrypted text format.');
  try {
    const salt = Buffer.from(parts[1], 'base64'), iv = Buffer.from(parts[2], 'base64');
    const tag = Buffer.from(parts[3], 'base64'), ciphertext = Buffer.from(parts[4], 'base64');
    if (salt.length !== 16 || iv.length !== 12 || tag.length !== 16) throw new Error('Invalid encrypted text format.');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key(password, salt), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
  } catch (error) {
    if (error.message === 'Invalid encrypted text format.') throw error;
    throw new Error('Decryption failed. Check the password and encrypted text.');
  }
}
module.exports = { decrypt, encrypt };
