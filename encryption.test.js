'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),{encrypt,decrypt}=require('../encryption');
test('round trip',()=>{const message='Confidential message 🔐',result=encrypt(message,'StrongPassword!123');assert.equal(decrypt(result,'StrongPassword!123'),message)});
test('same input has unique output',()=>assert.notEqual(encrypt('same','StrongPassword!123'),encrypt('same','StrongPassword!123')));
test('wrong password fails',()=>{const result=encrypt('secret','CorrectPassword');assert.throws(()=>decrypt(result,'WrongPassword'),/Decryption failed/)});
test('tampering fails',()=>{const result=encrypt('secret','CorrectPassword');assert.throws(()=>decrypt(`${result.slice(0,-2)}AA`,'CorrectPassword'),/Decryption failed/)});
