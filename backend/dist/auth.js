"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.auth = auth;
exports.roles = roles;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'dev-secret';
function signToken(user) {
    return jsonwebtoken_1.default.sign(user, secret, { expiresIn: '8h' });
}
function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer '))
        return res.status(401).json({ message: 'Authentication required' });
    try {
        req.user = jsonwebtoken_1.default.verify(header.slice(7), secret);
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
function roles(...allowed) {
    return (req, res, next) => {
        if (!req.user || !allowed.includes(req.user.role))
            return res.status(403).json({ message: 'Insufficient permissions' });
        next();
    };
}
