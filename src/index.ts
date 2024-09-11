import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { Flow } from "../lib/Flow";

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

app.post('/email', async (req: Request, res: Response) => {
    try {
        const flow = new Flow();
        await flow.triggerFlow(req.body);
        res.status(200).send({ message: 'Email processing started', data: req.body });
    } catch(exec: any) {
        res.status(500).send({ message: 'Error processing email flow', error: exec.message });
    }
})