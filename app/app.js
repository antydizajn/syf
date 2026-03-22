// Gniewisława Identity Keys (Ed25519)
process.env.ED25519_PRIVATE_KEY = '0i+ajrhjr/PN3M4Y5kZoknc61ZW2UMbPlfw0Lqlw/END9zKY8UBkSCK7CBCKgZUDBVinMxN8bdBCnrt7uIp2tQ==';
process.env.ED25519_PUBLIC_KEY = 'Q/cymPFAZEgiuwgQioGVAwVYpzMTfG3QQp67e7iKdrU=';

process.env.PORT = process.env.PORT || '51236';

require('./server.js');
