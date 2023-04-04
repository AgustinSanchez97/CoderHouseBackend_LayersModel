

export default class productDTO{
    constructor(productData)
    {
        this.title=productData.title,
        this.description=productData.description,
        this.category=productData.category,
        this.price=productData.price,
        this.stock=productData.stock
    }
}
