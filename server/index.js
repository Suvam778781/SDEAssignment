const express = require("express");
const { connection } = require("./config/config");
const cors = require("cors");
const server = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // Replace with your frontend's URL
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware for parsing JSON requests
server.use(express.json());
server.use(cors(corsOptions));

// Define a route for /api/home
server.get("/api/home", async (req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    data: null,
    message: "Welcome to the home API!",
  });
});

server.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    data: null,
    message: "Route not found.",
  });
});

// Error handler middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// SaveLeague()
// Start the server
// SaveMatch()
server.listen(port, async (err) => {
  if (err) {
    console.log("inside server function");
    console.log(err);
  } else {
    try {
      await connection;
      console.log(port, "connected");
    } catch (error) {
      console.log("Error while connecting to the database:", error);
    }
  }
});
