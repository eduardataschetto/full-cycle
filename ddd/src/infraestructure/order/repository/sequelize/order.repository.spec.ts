import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../customer/repository/sequelize/cutomer.model';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import Product from '../../../../domain/product/entity/product';
import OrderRepository from './order.repository';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import Order from '../../../../domain/checkout/entity/order';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import ProductModel from '../../../product/repository/sequelize/product.model';

describe('Order repository tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderItemModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 'Zipcode 1', 'City 1', 1);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const item = new OrderItem(
      '123',
      product.id,
      product.name,
      product.price,
      2
    );
    const order = new Order('1234', customer.id, [item]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 'Zipcode 1', 'City 1', 1);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });

    const product2 = new Product('124', 'Product 2', 50);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      '2',
      product2.id,
      product2.name,
      product2.price,
      1
    );

    order.addItem(orderItem2);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
        },
      ],
    });
  });

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 'Zipcode 1', 'City 1', 1);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await orderRepository.find(order.id);

    expect(orderModel).toStrictEqual(order);
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 'Zipcode 1', 'City 1', 1);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    );

    const orderItem2 = new OrderItem(
      '2',
      product.id,
      product.name,
      product.price,
      3
    );

    const order = new Order('123', '123', [orderItem]);
    const order2 = new Order('124', '123', [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order, order2]);
  });
});
