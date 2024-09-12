const { generateKey } = await import('node:crypto');

generateKey('hmac', { length: 256 }, (err, key) => {
    if (err) throw err;
    console.log(key.export().toString('hex'));
});