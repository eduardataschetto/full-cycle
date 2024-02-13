import Order from './order';
import OrderItem from './order-item';

describe('Order unit tests', () => {
  it('should throw an error when name is empty', () => {
    expect(() => new Order('', 'Customer 1')).toThrow('ID is required');
  });

  it('should throw an error when customer id is empty', () => {
    expect(() => new Order('1', '')).toThrow('Customer ID is required');
  });

  it('should throw an error when items are empty', () => {
    expect(() => new Order('1', 'Customer 1', [])).toThrow(
      'Items are required'
    );
  });

  it('should calculate the total of the order', () => {
    const order = new Order('1', 'Customer 1', [
      new OrderItem('1', 'p1', 'Item 1', 100, 1),
    ]);
    expect(order.total()).toEqual(100);

    const order2 = new Order('1', 'Customer 1', [
      new OrderItem('1', 'p1', 'Item 1', 100, 1),
      new OrderItem('2', 'p2', 'Item 2', 200, 2),
    ]);
    expect(order2.total()).toEqual(500);
  });

  it('should throw an error when order item quantity is less or equal than zero', () => {
    expect(
      () =>
        new Order('1', 'Customer 1', [
          new OrderItem('1', 'p1', 'Item 1', 100, 0),
        ])
    ).toThrow('Order item quantity must be greater than zero');
  });
});
