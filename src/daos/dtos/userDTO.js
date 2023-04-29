

export default class userDTO{
    constructor(userData)
    {
        this.first_name=userData.first_name
        this.last_name=userData.last_name
        this.email=userData.email
        this.age=userData.age
        this.password=userData.password
        this.role=userData.role
        this.cart=userData.cart
        this.restoreCode=userData.restoreCode
        this.restoreDate=userData.restoreDate
    }
}

