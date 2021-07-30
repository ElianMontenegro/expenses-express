import mongoose , { ConnectionOptions } from 'mongoose';
import "dotenv/config";

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.ngt7y.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify : false
}

mongoose.connect(uri, mongooseOptions)
.then( () => console.log('Base de datos connecto'))
.catch( e => console.log(e));