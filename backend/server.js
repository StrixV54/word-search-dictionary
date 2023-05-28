import express from "express";
import searchRoutes from "./route.js";

const app = express();
const PORT = 5000;

app.use("/search", searchRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
