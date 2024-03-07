const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(recipeRoutes);

app.listen(4003, () => {
  console.log("Server 4003 portunu dinlemeye başladı");
});
