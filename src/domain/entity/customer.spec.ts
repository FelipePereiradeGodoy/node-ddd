import Address from "./address";
import Customer from "./customer";

describe('Customer uni test', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            new Customer("", "John");
        }).toThrow();
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            new Customer("123", "");
        }).toThrow();
    });

    it('should change name', () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it('should activate customer', () => {
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street1", 123, "13330-250", "São Paulo");

        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it('should throw error when address is undefined when you activate a customer', () => {
        const customer = new Customer("123", "Customer 1");
        
        expect(() => customer.activate()).toThrow();
    });

    it('should deactivate customer', () => {
        const customer = new Customer("123", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it('should add reward points', () => {
        const customer = new Customer("123", "Customer 1");
        
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});