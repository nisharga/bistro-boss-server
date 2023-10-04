import express, { Application,Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import config from "./config";
const app: Application = express();
const port = config.port || 3000

app.use(cors());
//global error handler
app.use(globalErrorHandler);
// parser
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!', port)
})
export default app;
