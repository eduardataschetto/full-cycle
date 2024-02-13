import EventHandlerInterface from '../../../@shared/event/domain/event.handler.interface';
import CustomerCreatedEvent from '../customer-created.event';

export class LogWhenCustomerIsCreated
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}

export class LogWhenCustomerIsCreated2
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
