/**
 * Created by gxk on 2017/8/29.
 */
var crypto = require('crypto');

//加密
export function cipher (buf) {
    var encrypted = "";
    var cip = crypto.createCipher('rc4', 'pkdpkq');
    encrypted += cip.update(buf, 'hex', 'hex');
    encrypted += cip.final('hex');
    return encrypted
};

//解密
export function decipher(encrypted) {
    var decrypted = "";
    var decipher = crypto.createDecipher('rc4', 'pkdpkq');
    decrypted += decipher.update(encrypted, 'hex', 'hex');
    decrypted += decipher.final('hex');
    return decrypted
};