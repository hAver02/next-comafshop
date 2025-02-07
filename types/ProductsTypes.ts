import { Subcategories } from "./CategoriesTypes";

export interface Products  {
    id : number;
    name : string;
    description : string;
    price : number;
    image : string;
    subcategoryId : number;
    subcategory : Subcategories
}
