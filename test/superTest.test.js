import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080/")


describe("test de la rutas rutas Products /api/products/:id", () => {
    it("POST /api/products", async () => {
        const productMock = {
            title: "testing product",
            description: "testing description",
            category: "testing category",
            price: 25,
            stock: 25,
            owner: "JohnDoe@gmail.com"
        }

        const { body, statusCode, ok} = await request
            .post("api/products/")
            .send(productMock)
                
    })
    it("PUT /api/products/:id", async () => {
        const productMock = {
            title: "testing product",
            description: "testing description",
            category: "testing category",
            price: 25,
            stock: 25,
            owner: "JohnDoe@gmail.com"
        }

        const { body, statusCode, ok} = await request
            .post("api/products/")
            .send(productMock)

        const { body:bodyPut, statusCode:statusCodePut, ok:okPut} = await request
            .put(`api/products/${body.payload._id}`)
            .send({title: "testing product PUT"})

        expect(body.payload.title).to.not.be.equal(bodyPut.payload.title)
        // console.log(statusCode)
        // console.log(ok)
    })

    it("GET /api/products/:id", async () => {
        const productMock = {
            title: "testing product to Get",
            description: "testing description",
            category: "testing category",
            price: 22,
            stock: 21,
            owner: "JohnDoe@gmail.com"
        }

        const { body, statusCode, ok} = await request
            .post("api/products/")
            .send(productMock)

        const { body:bodyPut, statusCode:statusCodePut, ok:okPut} = await request
            .get(`api/products/${body.payload._id}`)
            .send({title: "testing product GET"})

        expect(bodyPut.payload.title).to.not.be.equal(undefined)
    })
})


//CARTS
describe("test de la rutas rutas Carts /api/carts", () => {
    it("POST /api/carts", async () => {
        const cartMock = {
            products:[]
        }

        const { body, statusCode, ok} = await request
            .post("api/carts/")
            .send(cartMock)
                
        expect(body).to.not.be.empty
        expect(statusCode).to.equal(200)
    })
    it("PUT /api/carts/:id", async () => {
        const cartMock = {
            products:[]
        }
        

        const { body, statusCode, ok} = await request
            .post("api/carts/")
            .send(cartMock)
            
            //console.log(body)
        const { body:bodyPut, statusCode:statusCodePut, ok:okPut} = await request
            .put(`api/carts/${body.payload._id}`)
            .send({_productId: '63da72c7061c510a52ac01a3', product: [ '10' ] })
            
        expect(body.payload).to.not.be.equal(bodyPut.payload)

    })

    it("GET /api/carts/:id", async () => {
        const cartMock = {
            products:[]
        }

        const { body, statusCode, ok} = await request
            .post("api/carts/")
            .send(cartMock)

        const { body:bodyPut, statusCode:statusCodePut, ok:okPut} = await request
            .get(`api/carts/${body.payload._id}`)
            .send({title: "testing cart GET"})

        expect(bodyPut.payload).to.not.be.equal(undefined)
    })
})




