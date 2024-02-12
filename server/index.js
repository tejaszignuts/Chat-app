const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRouter = require("./Routes/messageRoute");
const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/chat", chatRoute);
app.use("/msg", messageRouter);

app.get("/", (req, res) => {
  res.send({ data: "welcome" });
});

//server
app.listen(port, () => {
  console.log(`Server Started on Port${port}`);
});

//database connection code
main()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://tejasp:qPHUodfAjuk7MdJC@cluster0.ghq7di4.mongodb.net/chatApp"
  );
}
