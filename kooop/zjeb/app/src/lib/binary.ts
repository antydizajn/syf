import msgpack5 from 'msgpack5';

const msgpack = msgpack5();

/**
 * Encodes an object into a MessagePack binary Buffer.
 */
export function encode(data: any): Buffer {
    return msgpack.encode(data).slice();
}

/**
 * Decodes a MessagePack binary Uint8Array back into an object.
 */
export function decode(data: Uint8Array): any {
    return msgpack.decode(Buffer.from(data));
}
