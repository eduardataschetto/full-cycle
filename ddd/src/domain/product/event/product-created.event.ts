import { EventInterface } from '../../@shared/event/domain/domain-event.interface';

export default class ProductCreatedEvent implements EventInterface {
  name: string = 'ProductCreatedEvent';
  dateTime: Date;
  eventData: any;

  eventVersion: number = 1;

  constructor(eventData: any) {
    this.dateTime = new Date();
    this.eventData = eventData;
  }
}
