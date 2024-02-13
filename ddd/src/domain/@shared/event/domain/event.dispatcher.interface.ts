import { EventInterface } from './domain-event.interface';
import EventHandlerInterface from './event.handler.interface';

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(event: string, handler: EventHandlerInterface): void;
  unregister(event: string, handler: EventHandlerInterface): void;
  unregisterAll(event: string): void;
}
