// this is we get as a perameter
export type IPaginationMenuOptions = {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

// this will works when we will use ?searchTerm=name that moment
export type IMenuFilterRequest = {
    searchTerm?: string
}

// We will get response like this
export type IGenericMenuResponse<T> = {
    meta: {
      page: number
      limit: number
      total: number
    }
    data: T
  }
  
  //user can search by name and
  export const SearchableFieldsMenu = ['name']