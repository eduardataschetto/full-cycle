import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrow('ID is required');
  });

  it('should throw an error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrow('Name is required');
  });

  it('should change the name', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeName('Jane Doe');
    expect(customer.name).toEqual('Jane Doe');
  });

  it('should ativate customer', () => {
    const customer = new Customer('1', 'John Doe');
    customer.address = new Address('Main St', 'Springfield', '123456-533', 1);
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it('should throw an error when activating customer without address', () => {
    expect(() => {
      const customer = new Customer('1', 'John Doe');
      customer.activate();
    }).toThrow('Address is required to activate customer');
  });

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John Doe');

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it('should add reward points', () => {
    const customer = new Customer('c1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
