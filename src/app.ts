import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler'
import config from './config'
const app: Application = express()
const port = config.port
import routes from './routes/index'

app.use(cors())
//global error handler
app.use(globalErrorHandler)
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Routes
app.use('/api/v1', routes); 


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
export default app
