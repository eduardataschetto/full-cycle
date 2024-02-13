import Product from "../entity/product"
import ProductB from "../entity/product-b"
import { v4 as uuid } from 'uuid'
import ProductInterface from "../entity/product.interface"

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
       switch (type) {
        case "a":
            return new Product(uuid(), name, price)
        case "b":
            return new ProductB(uuid(), name, price)
        default:
            throw new Error("Invalid product type")
        }
    }
}