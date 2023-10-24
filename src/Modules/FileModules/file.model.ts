/* eslint-disable no-console */
import { Schema, model } from 'mongoose'
import { IFile } from './file.interface'

const fileSchema = new Schema<IFile>(
  {
    id: {
      type: String,
    },
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const File = model<IFile>('File', fileSchema)
