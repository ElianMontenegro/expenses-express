import Express from "express";
import "dotenv/config";
import "./dbConnect";
import UserRouter from "./routes/user";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'
import  { option }  from './swaggerOptions'

const App = Express();
App.set('port', process.env.PORT || 5000)

App.use(Express.json());

App.use("/", UserRouter);


const specs = swaggerJsDoc(option);
App.use('/docs', swaggerUI.serve , swaggerUI.setup(specs));


export default App;
