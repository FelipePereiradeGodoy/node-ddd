import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log2.handler";
import Address from "../value-object/address";
import Customer from "./customer";

describe('Customer uni test', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            new Customer("", "John", new EventDispatcher());
        }).toThrow();
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            new Customer("123", "", new EventDispatcher());
        }).toThrow();
    });

    it('should change name', () => {
        const customer = new Customer("123", "John", new EventDispatcher());
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it('should activate customer', () => {
        const customer = new Customer("123", "Customer 1", new EventDispatcher());
        const address = new Address("Street1", 123, "13330-250", "São Paulo");

        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it('should throw error when address is undefined when you activate a customer', () => {
        const customer = new Customer("123", "Customer 1", new EventDispatcher());
        
        expect(() => customer.activate()).toThrow();
    });

    it('should deactivate customer', () => {
        const customer = new Customer("123", "Customer 1", new EventDispatcher());

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it('should add reward points', () => {
        const customer = new Customer("123", "Customer 1", new EventDispatcher());
        
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

    it('should send event when customer created', () => {
        const eventDispatcher = new EventDispatcher();

        const logHandler1 = new EnviaConsoleLog1Handler();
        const logHandler2 = new EnviaConsoleLog2Handler();

        const spyHandler1 = jest.spyOn(logHandler1, "handle");
        const spyHandler2 = jest.spyOn(logHandler2, "handle");

        eventDispatcher.register(CustomerCreatedEvent.name, logHandler1);
        eventDispatcher.register(CustomerCreatedEvent.name, logHandler2);

        const customer = new Customer("123", "Customer 1", eventDispatcher);

        expect(spyHandler1).toHaveBeenCalledTimes(1);
        expect(spyHandler2).toHaveBeenCalledTimes(1);

        expect(spyHandler1).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent));
        expect(spyHandler2).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent));
    });

    it('should send event when change address', () => {
        const eventDispatcher = new EventDispatcher();

        const logHandler = new EnviaConsoleLogHandler();

        const spyHandler = jest.spyOn(logHandler, "handle");

        eventDispatcher.register(CustomerChangedAddressEvent.name, logHandler);

        const customer = new Customer("123", "Customer 1", eventDispatcher);
        const newAddress = new Address('Rua 321', 321, '321-2313', 'São Paulo');

        customer.changeAddress(newAddress);
        
        expect(spyHandler).toHaveBeenCalledTimes(1);
        expect(spyHandler).toHaveBeenCalledWith(expect.any(CustomerChangedAddressEvent));
    });
});