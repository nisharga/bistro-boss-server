/* eslint-disable no-console */
import { Schema, model } from 'mongoose'  
import { ISingleUser } from './single.user.interface'

const SingleUserSchema = new Schema<ISingleUser>(
  { 
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }, 
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const SingleUser = model<ISingleUser>('SingleUser', SingleUserSchema)
