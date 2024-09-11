import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { Flow } from "../lib/MarketFlow";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send(`whatup`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.post('/email', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Email processing started', data: req.body });
    const flow = new Flow();
    flow.triggerFlow(req.body);
})