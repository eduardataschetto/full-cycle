import CustomerAddressChangedEvent from '../customer-address-changed.event';

export default class LogWhenCustomerAddressChanged {
  handle(event: CustomerAddressChangedEvent) {
    console.log(
      `Endereço do cliente: ${event.eventData.customerId}, ${event.eventData.customerName} alterado para: ${event.eventData.address}`
    );
  }
}
