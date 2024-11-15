const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactsRouter  = require("./Routes/contacts");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to database:", error);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "healthy server",
  });
});

app.use("/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
