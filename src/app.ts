import Express from "express";
import "dotenv/config";
import "./dbConnect";
import UserRouter from "./routes/user";

const App = Express();
App.set('port', process.env.PORT || 5000)

App.use(Express.json());

App.use("/", UserRouter);

export default App;
