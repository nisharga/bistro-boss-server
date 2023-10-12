export type IUser = {
  id: string
  image: string
  name: string
  price: number
  email: string
}

export type IUserFilterRequest = {
  searchTerm?: string
}

export type IUserIAcademicDepartment = {
  email?: string
}

export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']

export type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export const SearchableFields = ['email']
