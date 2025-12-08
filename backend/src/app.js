const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const enquiryRoutes = require("./routes/enquiry.routes.js");
const listItemRoutes = require("./routes/listItem.routes.js");
const demoRoutes = require("./routes/demo.routes.js");
const enrollRoutes = require("./routes/enroll.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/enquiry", enquiryRoutes);
app.use("/listItem", listItemRoutes);
app.use("/demo", demoRoutes);
app.use("/enroll", enrollRoutes);

module.exports = app;
