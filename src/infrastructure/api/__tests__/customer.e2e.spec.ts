import CustomerModel from "../../customer/repository/sequelize/customer.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe('E2E test for customer API', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should list all customers', async () => {
        await CustomerModel.create({
            id: '1',
            name: 'John1',
            street: '1 Main St',
            number: 1,
            zipcode: '12345',
            city: 'Anytown',
            active: true,
            rewardPoints: 0,
        });

        await CustomerModel.create({
            id: '2',
            name: 'John2',
            street: '2 Main St',
            number: 2,
            zipcode: '12345',
            city: 'Anytown',
            active: true,
            rewardPoints: 0,
        });

        const response = await request(app)
            .get('/customer')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.customers.length).toBe(2);

        expect(response.body.customers[0].id).toBe('1');
        expect(response.body.customers[0].name).toBe('John1');
        expect(response.body.customers[0].address.street).toBe('1 Main St');
        expect(response.body.customers[0].address.number).toBe(1);

        expect(response.body.customers[1].id).toBe('2');
        expect(response.body.customers[1].name).toBe('John2');
        expect(response.body.customers[1].address.street).toBe('2 Main St');
        expect(response.body.customers[1].address.number).toBe(2);

        await CustomerModel.destroy({ where: { id: '1' } });
        await CustomerModel.destroy({ where: { id: '2' } });
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    number: 123,
                    zip: '12345'
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.address.street).toBe('123 Main St');
        expect(response.body.address.number).toBe(123);
    });

    it('should not create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: '',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    number: 123,
                    zip: '12345'
                }
            });

        expect(response.status).toBe(500);
    });
});