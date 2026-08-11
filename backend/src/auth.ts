import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type Role = 'ADMIN'|'SALES'|'WAREHOUSE'|'ACCOUNTS';

export interface AuthRequest extends Request {
  user?: { id: number; email: string; role: Role; name: string };
}

const secret = process.env.JWT_SECRET || 'dev-secret';

export function signToken(user: {id:number; email:string; role:Role; name:string}) {
  return jwt.sign(user, secret, { expiresIn: '8h' });
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({message:'Authentication required'});
  try {
    req.user = jwt.verify(header.slice(7), secret) as AuthRequest['user'];
    next();
  } catch {
    return res.status(401).json({message:'Invalid or expired token'});
  }
}

export function roles(...allowed: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowed.includes(req.user.role)) return res.status(403).json({message:'Insufficient permissions'});
    next();
  };
}
