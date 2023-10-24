/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { SingleUser } from '../Modules/SingleUserModules/single.user.model';

declare global {
  namespace Express {
    interface Request {
      decoded?: any  
    }
  }
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction): any => {
     const email = req.decoded.email;
     const user = SingleUser.findOne({ email: email }).exec()  

    if (user?.role !== 'admin') {
        return res.status(401).send({ error: true, message: 'Forbidden Access' })
    }
    next()
  }

export default verifyAdmin
