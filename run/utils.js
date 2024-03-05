"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const maxlen = 6;
function generate() {
    let id = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < maxlen; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}
exports.generate = generate;
