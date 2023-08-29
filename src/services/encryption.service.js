import CryptoJS from "crypto-js";

export function encrypt(payload) {
  console.log(payload);
  
  const stringifiedPayload = JSON.stringify(payload);

  const password = process.env.REACT_APP_PASSWORD;
  const secretKey = process.env.REACT_APP_SECRET;

  const hash = CryptoJS.PBKDF2(
    password,
    CryptoJS.enc.Utf16LE.parse(secretKey),
    {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA1,
    }
  );

  const keyWords = hash.words.slice(0, 6);
  const ivWords = hash.words.slice(6, 8);

  const key = CryptoJS.lib.WordArray.create(keyWords);
  const iv = CryptoJS.lib.WordArray.create(ivWords);

  const encrypted = CryptoJS.TripleDES.encrypt(
    CryptoJS.enc.Utf16LE.parse(stringifiedPayload),
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.toString();
}

export function decrypt(encryptedPayload) {
  const password = process.env.REACT_APP_PASSWORD;
  const secretKey = process.env.REACT_APP_SECRET;

  const hash = CryptoJS.PBKDF2(
    password,
    CryptoJS.enc.Utf16LE.parse(secretKey),
    {
      keySize: 256 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA1,
    }
  );

  const keyWords = hash.words.slice(0, 6);
  const ivWords = hash.words.slice(6, 8);

  const key = CryptoJS.lib.WordArray.create(keyWords);
  const iv = CryptoJS.lib.WordArray.create(ivWords);

  const decrypted = CryptoJS.TripleDES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(encryptedPayload),
    },
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf16LE);

  return JSON.parse(decryptedStr);
}
