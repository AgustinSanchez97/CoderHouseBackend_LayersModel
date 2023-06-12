

export default class ticketDTO{
    constructor(ticketData)
    {
        this.code=ticketData.code,
        this.purchase_datetime=ticketData.date,
        this.amount=ticketData.totalCost,
        this.purchaser=ticketData.contact
        this.leftProducts=ticketData.leftProducts
    }
}
