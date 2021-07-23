import Express from "express";
import "dotenv/config";
import "./dbConnect";
const App = Express();

App.set('port', process.env.PORT || 5000)

export default App;
