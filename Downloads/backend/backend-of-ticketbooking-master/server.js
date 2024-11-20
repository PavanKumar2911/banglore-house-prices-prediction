require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const cors=require("cors");
const corsOptions={
  origin:"*",
  methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);

app.get("/", (req, res) => {
  res.send("welcome user");
});
app.get("/contact",(req,res)=>{
  res.send("No contact details");
});
connectDb().then(() => {
  app.listen(5000, () => {
    console.log("server is running on port 5000");
  });
});
