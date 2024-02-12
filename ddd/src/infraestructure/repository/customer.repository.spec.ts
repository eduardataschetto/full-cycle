import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../db/sequelize/model/cutomer.model"
import CustomerRepository from "./customer.repository"
import Customer from "../../domain/entity/customer"
import Address from "../../domain/entity/address"

describe("Customer repository tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.drop();
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1246", "Customer 1")
        const address = new Address("Street 1", "City 1", "12345", 1)
        customer.address = address

        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "1246" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1246",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        })

    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1246", "Customer 1")
        const address = new Address("Street 1", "City 1", "12345", 1)
        customer.address = address
        
        await customerRepository.create(customer)

        customer.changeName("Customer 2")

        await customerRepository.update(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: "1246" } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1246",
            name: "Customer 2",
            street: address.street,
            number: address.number,
            zipcode: address.zipcode,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        })

    })

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1246", "Customer 1")
        const address = new Address("Street 1", "City 1", "12345", 1)
        customer.address = address
        
        await customerRepository.create(customer)

        const foundCustomer = await customerRepository.find("1246")

        expect(foundCustomer).toStrictEqual(customer)

    })

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository()
        
       expect(async () => {
            await customerRepository.find("1246")
       }).rejects.toThrow("Customer not found")
    })

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository()

        const customer = new Customer("1", "Customer 1")
        const address = new Address("Street 1", "City 1", "12345", 1)
        customer.address = address
        customer.addRewardPoints(100)

        await customerRepository.create(customer)

        const customer2 = new Customer("2", "Customer 2")
        const address2 = new Address("Street 2", "City 2", "54321", 2)
        customer2.address = address2
        await customerRepository.create(customer2)

        const customers = [customer, customer2]

        const foundCustomers = await customerRepository.findAll()

        expect(foundCustomers).toHaveLength(2)
        expect(foundCustomers).toContainEqual(customers[0])
        expect(foundCustomers).toContainEqual(customers[1])
    })



    // it("should find all products", async () => {
    //     const productRepository = new ProductRepository()

    //     const product = new Product("1", "Product 1", 100)
    //     await productRepository.create(product)

    //     const product2 = new Product("2", "Product 2", 200)
    //     await productRepository.create(product2)

    //     const products = [product, product2]

    //     const foundProducts = await productRepository.findAll()

    //     expect(foundProducts).toEqual(products)

    // })


})