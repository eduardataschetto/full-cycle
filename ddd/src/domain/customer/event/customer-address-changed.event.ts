import { EventInterface } from '../../@shared/event/domain/domain-event.interface';

export default class CustomerAddressChangedEvent implements EventInterface {
  name: string = 'CustomerAddressChangedEvent';
  dateTime: Date;
  eventVersion: number = 1;
  eventData: any;

  constructor(eventData: any) {
    this.dateTime = new Date();
    this.eventData = eventData;
    this.validate();
  }

  private validate() {
    if (!this.eventData.customerName) {
      throw new Error('Name is required');
    }
    if (!this.eventData.customerId) {
      throw new Error('ID is required');
    }
    if (!this.eventData.address) {
      throw new Error('Address is required');
    }
  }
}
