import express from "express";
import cors from "cors";

const port = process.env.PORT || 4546;

import usersRouter from "./routes/users";

const app = express();
app.use(express.json()); 
app.use(cors());


app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});