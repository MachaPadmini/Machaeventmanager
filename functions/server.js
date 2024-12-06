
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const path = require('path');
const app = express();
const port = 5000;
const fs = require('fs');
const serverless = require("serverless-http");
const router = express.Router();

// Enable CORS
app.use(cors());

// MongoDB connection URI
const uri =
  "mongodb+srv://machapdmn30798:padmini6899@eventsclusster.3voip.mongodb.net/?retryWrites=true&w=majority&appName=EventsClusster";
const client = new MongoClient(uri);

async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Define API route
app.get("/api", async (req, res) => {
  try {
    const cursor = client
      .db("eventsdb")
      .collection("eventscollection")
      .find({});
    const results = await cursor.toArray();
    res.json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/portfolio', (req, res) => {
    const filePath = path.join(__dirname,'index.html'); 
    fs.readFile(".netlify/functions/public/index.html", 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Failed to load the page');
      }
      res.send(data); // Send the HTML content
    });
  });

// Start the server
app.use("/", router);

// Export as serverless function
module.exports.handler = async (event, context) => {
  await connectMongoDB(); // Ensure the database is connected for each request
  return serverless(app)(event, context);
};

