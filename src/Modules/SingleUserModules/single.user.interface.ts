// this will tells us which type of data we expected
export type ISingleUser = {
  name: string
  image: string
  email: string
  role: string
}
// this will works when we will use ?searchTerm=name that moment
export type ISingleUserFilterRequest = {
  searchTerm?: string
}
// this is our pagination options for single user
export type ISingleUserPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
// this is for Single User Generic Response
export type ISingleUserGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
