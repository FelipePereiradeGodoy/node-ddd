import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());

    try {
        const customerDTO = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            },
        };
        
        const output = await useCase.execute(customerDTO);

        res.status(200).json(output);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());

    try {
        const output = await useCase.execute({});

        res.status(200).json(output);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});