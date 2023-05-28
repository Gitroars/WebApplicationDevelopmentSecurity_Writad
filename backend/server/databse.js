//connection to database
import mongoose  from 'mongoose'

const connectToDatabase= async()=>{
    console.log((process.env.MONGO_URI))
    try{
        mongoose.set('strictQuery')
        const connect =await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true, useNewUrlParser:true,
        });

        console.log(`Connected : ${connect.connection.host}`);

    }catch(error){
        console.log(`error:${error.message}`);
    }

};

export default connectToDatabase;