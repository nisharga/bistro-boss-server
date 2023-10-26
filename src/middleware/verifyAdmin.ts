/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { SingleUser } from '../Modules/SingleUserModules/single.user.model'

declare global {
  namespace Express {
    interface Request {
      decoded?: any
    }
  }
}

const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const email = req.decoded.email
  const user = await SingleUser.find({ email: email }).exec() 
  if (user?.role !== 'admin') {
    return res.status(403).send({ error: true, message: 'forbidden message' });
  }
  next();
}

export default verifyAdmin
