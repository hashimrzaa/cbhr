import express from "express";
const app = express();
import cors from "cors";
import ConnectDB from "./config/mongodb.mjs";
import router from "./routes/index.mjs";
import { PORT } from "./config/enviroment.mjs";
const port = PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", router);

ConnectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
