const express = require("express");
const connectDB = require("./Connection");
// const messageRoutes = require("./newroutes/messageRoutes");
connectDB();
const app = express();
const userRoutes = require("./routes/UserRoutes");
app.use(express.json());
app.use("/api/user", userRoutes);
app.get("/helo", (req, res) => {
  res.send("hello wprld");
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());