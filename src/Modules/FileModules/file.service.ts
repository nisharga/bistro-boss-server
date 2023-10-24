/* eslint-disable @typescript-eslint/no-explicit-any */

import { IFile } from "./file.interface"
import { File } from "./file.model"

 
const createFile = async (fileDetails: IFile): Promise<IFile | null> => {
    const file = await File.create(fileDetails)
    return file;
  }

export const FileService = {
    createFile
}
