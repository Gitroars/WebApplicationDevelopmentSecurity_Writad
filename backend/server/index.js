import dotenv from 'dotenv'

import connectToDatabase from './databse.js'
import express from 'express'


//our routes
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()
connectToDatabase()
const app= express()

app.use(express.json())


const port =process.env.PORT||5000;

app.use('/api/books',bookRoutes);

app.listen(port,()=>{
    console.log(`server run on port ${port}`)
});
