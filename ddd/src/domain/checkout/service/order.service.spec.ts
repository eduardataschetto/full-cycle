import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';
import OrderService from './order.service';

describe('Order Service unit tests', () => {
  it('should get total of all orders', () => {
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 150, 2);
    const item2 = new OrderItem('i2', 'p2', 'Item 2', 50, 3);
    const order1 = new Order('o1', 'c1', [item1, item2]);

    const item3 = new OrderItem('i3', 'p3', 'Item 3', 200, 1);
    const item4 = new OrderItem('i4', 'p4', 'Item 4', 50, 2);
    const order2 = new Order('o2', 'c2', [item3, item4]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(750);
  });

  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1');
    const item = new OrderItem('i1', 'p1', 'Item 1', 50, 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(order.total()).toBe(50);
    expect(customer.rewardPoints).toBe(25);
  });
});
