import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John", null);
const address = new Address("Street", 1, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe('Unit Test find customer use case', () => {
    it('should find a customer', async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        };

        const output = await usecase.execute(input);

        const expectedOutput = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 1,
                zip: "Zip",
            },
        };

        expect(output).toEqual(expectedOutput);
    });

    it('should not find a customer', async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow('Customer not found');
    });
});