import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import appRoute from "./routes/appRoute.js";
import userRoute from "./routes/userRoute.js";
import errorHandler from "./middleware/errorMiddleware.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ERROR */
app.use(errorHandler);

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/", appRoute);
app.use("/api/user/", userRoute);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // noteModel.create({
    //   id: 12332121,
    //   text: "Hello",
    //   time: "Star",
    //   color: "12:30",
    // });
  })
  .catch((error) => console.log(`${error} did not connect`));
