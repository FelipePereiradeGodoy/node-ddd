import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());

    try {
        const output = await useCase.execute({});

        res.status(200).json(output);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});