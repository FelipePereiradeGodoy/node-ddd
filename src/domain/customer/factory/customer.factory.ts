import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/event-dispatcher";

export default class CustomerFactory {
    public static create(name: string): Customer {
        return new Customer(uuid(), name, new EventDispatcher());
    }

    public static createWithAddress(name: string, address: Address): Customer {
        const customer = new Customer(uuid(), name, new EventDispatcher());
        customer.changeAddress(address);

        return customer;
    }
}