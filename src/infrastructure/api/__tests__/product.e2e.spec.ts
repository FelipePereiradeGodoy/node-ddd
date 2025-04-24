import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe('E2E test for product API', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should list all products', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product1',
            price: 100,
        });

        await ProductModel.create({
            id: '2',
            name: 'Product2',
            price: 200,
        });

        const response = await request(app)
            .get('/product')
            .send();

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(2);

        expect(response.body.products[0].id).toBe('1');
        expect(response.body.products[0].name).toBe('Product1');
        expect(response.body.products[0].price).toBe(100);

        expect(response.body.products[1].id).toBe('2');
        expect(response.body.products[1].name).toBe('Product2');
        expect(response.body.products[1].price).toBe(200);

        await ProductModel.destroy({ where: { id: '1' } });
        await ProductModel.destroy({ where: { id: '2' } });
    });
});