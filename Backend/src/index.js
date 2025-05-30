require("dotenv").config();
const express = require("express");
const { DB_NAME } = require("./constants");
const { connectToDB } = require("./connection/index");
const { taskRouter } = require("./routes/tasks");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

const allowedOrigins = [
  'https://todo-app-mern-3deh.vercel.app'
];

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:5173');
}

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

connectToDB(`${process.env.DB_URL}/${DB_NAME}`);

app.use("/tasks", taskRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
