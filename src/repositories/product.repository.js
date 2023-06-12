import ProductDTO from "../daos/dtos/productDTO.js";
import productDao from "../daos/classes/products.dao.js"

class productRepository
{
    constructor(dao)
    {
        this.dao = dao
    }


    createProduct= async(productData)=>{
        const productDtoInstance = new ProductDTO(productData)
        return await this.dao.create(productDtoInstance)
    }

    getProducts= async()=>{
        const products =this.dao.getAll()
        return await products
    }

}



export default new productRepository(productDao)


