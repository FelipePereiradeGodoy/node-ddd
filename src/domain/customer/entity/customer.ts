import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, private readonly eventDispatcher: EventDispatcherInterface) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if(this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }

    const event = new CustomerCreatedEvent({
      "id": this._id,
      "name": this._name
    });

    if(this.eventDispatcher) {
      this.eventDispatcher.notify(event);
    }
  }

  getId(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        message: "Id is required",
        context: "customer"
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer"
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }
  
  changeAddress(address: Address) {
    this._address = address;
    
    const event = new CustomerChangedAddressEvent({
      id: this._id,
      name: this._name,
      address: this._address.toString()
    });

    if(this.eventDispatcher) {
      this.eventDispatcher.notify(event);
    }
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}