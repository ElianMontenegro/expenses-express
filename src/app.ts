import Express from "express";
import "dotenv/config";
import "./dbConnect";
import UserRouter from "./routes/user";
import ExpenseRouter from "./routes/expense";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'
import  { option }  from './swaggerOptions'
import passport from 'passport';
import GoogleStrategy from './middleware/GoogleStrategy';

const App = Express();
App.set('port', process.env.PORT || 5000)
App.use(passport.initialize());
App.use(Express.json());

App.use("/", UserRouter);
App.use("/api", ExpenseRouter);
passport.use(GoogleStrategy);

const specs = swaggerJsDoc(option);
App.use('/docs', swaggerUI.serve , swaggerUI.setup(specs));

export default App;
