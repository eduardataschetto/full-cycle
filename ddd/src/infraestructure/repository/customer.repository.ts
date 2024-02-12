import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/cutomer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    
    async create(entity: Customer): Promise<void> {
      await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zipcode,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zipcode,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }

    async find(id: string): Promise<Customer> {
        let customerModel
        try {
            customerModel = await CustomerModel.findOne({ 
                where: { 
                    id, 
                },
            rejectOnEmpty: true,
        })
        }
        catch (error) {
            throw new Error('Customer not found')
        }

        const customer =  new Customer(
            customerModel.id,
            customerModel.name,
        )

        const address = new Address(customerModel.street, customerModel.city, customerModel.zipcode, customerModel.number)
        customer.changeAddress(address)
        customer.addRewardPoints(customerModel.rewardPoints)

        if (customerModel.active) {
            customer.activate()
        } 

        return customer
    }

    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll()

        return  customersModel.map((customerModel) => {
            const customer =  new Customer(
                customerModel.id,
                customerModel.name,
            )
            const address = new Address(customerModel.street, customerModel.city, customerModel.zipcode, customerModel.number)
            customer.changeAddress(address)
            customer.addRewardPoints(customerModel.rewardPoints)

            if (customerModel.active) {
                customer.activate()
            } 

            return customer
        })
    }
}