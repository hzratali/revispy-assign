const express = require("express");
const app = express();
const cors = require("cors");
const ConnectToDatabase = require("./config/db-connection");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const cookieParser = require("cookie-parser");
const loadCategories = require("./utils/loadCategories");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api", categoryRoutes);

loadCategories();
ConnectToDatabase();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
