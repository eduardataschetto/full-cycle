import Address from '../value-object/address';

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get address(): Address;
  get rewardPoints(): number;
  set address(address: Address);
  validate(): void;
  changeName(name: string): void;
  changeAddress(address: Address): void;
  isActive(): boolean;
  activate(): void;
  deactivate(): void;
  addRewardPoints(points: number): void;
}
