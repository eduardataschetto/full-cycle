import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-product-created.handler';
import ProductCreatedEvent from '../../product/event/product-created.event';
import EventDispatcher from './event.dispatcher';

describe('Event dispatcher tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(ProductCreatedEvent.name, handler);

    expect(
      eventDispatcher.getEventHandlers(ProductCreatedEvent.name).length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers(ProductCreatedEvent.name)
    ).toContain(handler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();
    const handler2 = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(ProductCreatedEvent.name, handler);
    eventDispatcher.register(ProductCreatedEvent.name, handler2);

    eventDispatcher.unregister(ProductCreatedEvent.name, handler);

    expect(
      eventDispatcher.getEventHandlers(ProductCreatedEvent.name)
    ).not.toContain(handler);
    expect(
      eventDispatcher.getEventHandlers(ProductCreatedEvent.name)
    ).toContain(handler2);
    expect(
      eventDispatcher.getEventHandlers(ProductCreatedEvent.name).length
    ).toBe(1);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(ProductCreatedEvent.name, handler);
    eventDispatcher.unregisterAll(ProductCreatedEvent.name);

    expect(eventDispatcher.getEventHandlers(ProductCreatedEvent.name)).toEqual(
      []
    );

    expect(
      eventDispatcher.getEventHandlers(ProductCreatedEvent.name).length
    ).toBe(0);
  });

  it('should notify an event', () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(handler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', handler);

    expect(
      eventDispatcher.getEventHandlers('ProductCreatedEvent')[0]
    ).toMatchObject(handler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: '1',
      name: 'Product 1',
      price: 100,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
  });
});
