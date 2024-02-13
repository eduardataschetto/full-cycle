import { EventInterface } from './domain/domain-event.interface';
import EventDispatcherInterface from './domain/event.dispatcher.interface';
import EventHandlerInterface from './domain/event.handler.interface';

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandler: { [eventName: string]: EventHandlerInterface[] } = {};

  getEventHandlers(eventName: string): EventHandlerInterface[] {
    return this.eventHandler[eventName] || [];
  }

  public notify(event: EventInterface): void {
    const eventHandlers = this.getEventHandlers(event.name);
    eventHandlers.forEach((eventHandler) => {
      eventHandler.handle(event);
    });
  }

  public register(event: string, handler: EventHandlerInterface): void {
    if (!this.eventHandler[event]) {
      this.eventHandler[event] = [];
    }
    this.eventHandler[event].push(handler);
  }

  public unregister(event: string, handler: EventHandlerInterface): void {
    if (!this.eventHandler[event]) {
      return;
    }

    this.eventHandler[event] = this.eventHandler[event].filter(
      (eventHandler) => {
        return eventHandler !== handler;
      }
    );
  }

  public unregisterAll(event: string): void {
    this.eventHandler = {};
  }
}
