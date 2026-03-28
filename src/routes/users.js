import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { validateUserRegistration } from "../middlewares/validation.js";

const router = express.Router();

const users = [];

router.post('/signup', validateUserRegistration, async (request, response) => {
    const { name, email, password } = request.body;
    
    const verificEmail = users.find(user => user.email === email);

    if(verificEmail) {
        return response.status(400).json({message: "Email ja cadastrado!"});
    } 

    const hashedPassword = await bcrypt.hash(password,5);

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    response.status(201).json({message: `Conta criada`, user: newUser});
});

router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    
    const user = users.find(user => user.email === email);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!user || !passwordMatch) {
        return response.status(400).json({
            message: `Credenciais invalidas!`
        });
    }

    response.status(200).json({
        message: "Login efetuado com sucesso! Seja bem vindo meu amigo ", userName: user.name
    });

});

export default router;
