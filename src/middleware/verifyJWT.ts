/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import config from '../config';
// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires, no-undef
var jwt = require('jsonwebtoken');

const verifyJWT = (req: Request, res: Response, next: NextFunction): any => {
  const authorization = req.headers.authorization;
  if(!authorization) {
    res.status(401).send({error: true, message: 'Unauthorize Access'});
  }
  // if authorization
  const token = authorization.split(' ')[1];

  // Default check option
  jwt.verify(token, config.secret, function(err:any, decoded:any) {
    if(err){
       res.status(401).send({error: true, message: 'Unauthorize Access'});
    }
    req.decoded = decoded;
    next();
  });

}

export default verifyJWT
