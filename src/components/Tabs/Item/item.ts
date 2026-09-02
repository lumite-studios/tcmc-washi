export interface Item {
    name: string
    additional: string
    description: string
    image: string
    count?: number
    tags?: string[]
}

export interface Filters {
    name: string
    state: typeof filtersState[number]
    tags: string[]
}

export const filtersState = ['any', 'owned', 'unowned']

export interface Pagination {
    first: number
    rows: number
}

export const text = {
    filters: {
        name: 'Search by Name...',
        tags: 'Select Tags'
    }
}
