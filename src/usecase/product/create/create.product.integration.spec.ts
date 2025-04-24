import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration Test CreateProductUseCase", () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product A",
            price: 100,
        };

        const result = await createProductUseCase.execute(input);

        const productInDb = await ProductModel.findByPk(result.id);

        expect(result).toEqual({
            id: expect.any(String),
            name: "Product A",
            price: 100,
        });

        expect(productInDb).not.toBeNull();
        expect(productInDb?.id).toBe(result.id);
        expect(productInDb?.name).toBe(result.name);
        expect(productInDb?.price).toBe(result.price);
    });
});