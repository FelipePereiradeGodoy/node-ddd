import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory unit test', () => {
    it('should create a customer', () => {
        let customer = CustomerFactory.create("John");

        expect(customer.getId()).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });

    it('should create a customer with an addresss', () => {
        const address = new Address("Street", 1, "13330-250", "São Paulo")
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.getId()).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });
});