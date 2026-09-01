export interface Washi {
    name: string
    size: string
    description: string
    image: string
}

export interface Year {
    year: string
    washis: Washi[]
}
