import EventHandlerInterface from "../../../@shared/event/domain/event.handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler  implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log('SendEmailProductCreatedHandler', event);
    }
}