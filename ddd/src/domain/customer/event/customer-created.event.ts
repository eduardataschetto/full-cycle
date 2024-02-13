import { EventInterface } from '../../@shared/event/domain/domain-event.interface';

export default class CustomerCreatedEvent implements EventInterface {
  name: string = 'CustomerCreatedEvent';
  eventVersion: number = 1;
  dateTime: Date;
  eventData: {
    customerId: string;
    name: string;
    address: string;
  };

  constructor(eventData: any) {
    this.dateTime = new Date();
    this.eventData = eventData;
  }
}
