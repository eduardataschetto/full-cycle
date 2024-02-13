import OrderFactory from "./order.factory"

describe("Order factory unit test", () => {

    it("should create an order", () => {
        const orderProps = {
            id: "234567",
            customerId: "123",
            items: [
                {
                    id: "1",
                    productId: "123",
                    name: "Product 1",
                    price: 100,
                    quantity: 2
                }
            ]
        }

        const order = OrderFactory.create(orderProps)

        expect(order.id).toBe("234567")
        expect(order.customerId).toBe("123")
        expect(order.items.length).toBe(1)
        expect(order.items[0].id).toBe("1")
    })

})