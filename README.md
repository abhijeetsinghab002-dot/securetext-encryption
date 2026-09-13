# SecureText Encryption App

SecureText is a beginner-friendly text encryption and decryption web app. It runs locally in the browser, so messages and passwords are not transmitted.

## Security design

- AES-256-GCM encrypts and detects tampering.
- PBKDF2-SHA-256 derives the key using 210,000 iterations.
- Every encryption generates a fresh 16-byte salt and 12-byte IV.
- Therefore, encrypting identical text with the same password produces different output.
- Passwords are never stored or included in the result.

## Run

1. Install Node.js 18 or newer.
2. Open this folder in Terminal or Command Prompt.
3. Run `npm start`.
4. Visit `http://localhost:3000`.

No external packages are required. Run `npm test` to execute the included tests.

This is an educational project. A production system also needs secure authentication, key management, HTTPS, monitoring, and professional security review.
