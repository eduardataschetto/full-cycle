import Address from '../value-object/address';
import CustomerInterface from './customer.interface';

export default class Customer implements CustomerInterface {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  static create(id: string, name: string): Customer {
    const customer = new Customer(id, name);
    return customer;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set address(address: Address) {
    this._address = address;
  }

  validate(): void {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._id.length === 0) {
      throw new Error('ID is required');
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error('Address is required to activate customer');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }
}
