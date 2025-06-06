import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 123, 'Zip', 'City'));

const input = {
    id: customer.getId(),
    name: 'John Updated',
    address: {
        street: 'Street Updated',
        number: 1234,
        zip: 'Zip Updated',
        city: 'City Updated',
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    };
};

describe('Update Customer Use Case Unit Test', () => {
    it('should update a customer', async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);
        
        expect(output).toEqual(input);
    });
});