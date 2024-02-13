import CustomerCreatedEvent from '../customer-created.event';
import {
  LogWhenCustomerIsCreated,
  LogWhenCustomerIsCreated2,
} from './customer-created.event.handler';

describe('Customer created event handler tests', () => {
  it('should handle the event', () => {
    const handler = new LogWhenCustomerIsCreated();
    const handler2 = new LogWhenCustomerIsCreated2();

    const event = new CustomerCreatedEvent({
      customerId: '1',
      customerName: 'John Doe',
    });

    const spyConsoleLog = jest.spyOn(console, 'log');

    handler.handle(event);
    handler2.handle(event);

    expect(spyConsoleLog).toHaveBeenCalledTimes(2);

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Esse é o primeiro console.log do evento: CustomerCreated`
    );

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Esse é o segundo console.log do evento: CustomerCreated`
    );
  });
});
