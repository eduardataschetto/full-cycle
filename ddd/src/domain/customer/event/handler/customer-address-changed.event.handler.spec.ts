import CustomerAddressChangedEvent from "../customer-address-changed.event";
import LogWhenCustomerAddressChanged from "./customer-address-changed.event.handler";

describe("Customer address changed event handler tests", () => {

    it("should handle the event", () => {
        
        const handler = new LogWhenCustomerAddressChanged();
        const event = new CustomerAddressChangedEvent({
            customerId: "1",
            customerName: "John Doe",
            address: "New address"
        });

        const spyConsoleLog = jest.spyOn(console, "log");

        handler.handle(event);

        expect(spyConsoleLog).toHaveBeenCalledWith(
            `Endereço do cliente: 1, John Doe alterado para: New address`
        );
       
    })    

})