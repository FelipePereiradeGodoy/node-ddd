import { Not } from "sequelize-typescript";
import CreateCustomerUseCase from "./create.customer.usecase";
import NotificationError from "../../../domain/@shared/notification/notification.error";

const input = {
    name: 'John',
    address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
    },
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe('Unit Test create customer use case', () => {
    it('should create a customer', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        const expectedOutput = {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        }

        expect(output).toEqual(expectedOutput);
    });

    it('should throw an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const inputWithoutName = {
            ...input,
            name: '',
        };

        await expect(usecase.execute(inputWithoutName)).rejects.toThrow('customer: Name is required');
    });
});