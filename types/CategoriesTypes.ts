

export type Subcategories = {
    id : number,
    name : string,
    categoryId : number
}

export type Category = {
    id : number,
    name : string,
    subcategories : Subcategories[]
}