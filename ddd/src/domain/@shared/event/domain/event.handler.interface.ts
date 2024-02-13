import { EventInterface } from './domain-event.interface';

export default interface EventHandlerInterface<
  T extends EventInterface = EventInterface
> {
  handle(event: T): void;
}
