/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'; 
import jwt, { Secret } from 'jsonwebtoken'; // Use import for jwt
import config from '../config';

declare global {
  namespace Express {
    interface Request {
      decoded?: any; // Define the 'decoded' property on Request
    }
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction): any => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'Unauthorized Access' });
  }

  const token = authorization.split(' ')[1];

  // Default check option
  jwt.verify(token, config.secret as Secret, function (err: any, decoded: any) {
    if (err) {
      return res.status(401).send({ error: true, message: 'Unauthorized Access' });
    }
    req.decoded = decoded;
    next();
  });
};

export default verifyJWT;
