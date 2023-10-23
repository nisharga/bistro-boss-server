import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler'
const app: Application = express()
import routes from './routes/index'

app.use(cors())
//global error handler
app.use(globalErrorHandler)
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static images from the 'uploads' folder
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/v1', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
export default app
