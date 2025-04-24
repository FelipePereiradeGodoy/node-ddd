import { Sequelize } from "sequelize-typescript";
import UpdateCustomerUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration Test UpdateProductUseCase", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();

        await ProductModel.create({
            id: "1",
            name: "Product A",
            price: 100,
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateCustomerUseCase(productRepository);

        const input = {
            id: "1",
            name: "Updated Product A",
            price: 150,
        };

        const result = await updateProductUseCase.execute(input);

        const updatedProduct = await ProductModel.findByPk("1");

        expect(result).toEqual({
            id: "1",
            name: "Updated Product A",
            price: 150,
        });

        expect(updatedProduct).not.toBeNull();
        expect(updatedProduct?.name).toBe("Updated Product A");
        expect(updatedProduct?.price).toBe(150);
    });
});