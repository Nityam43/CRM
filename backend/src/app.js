const express = require("express");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const enquiryRoutes = require("./routes/enquiry.routes.js");
const listItemRoutes = require("./routes/listItem.routes.js");
const demoRoutes = require("./routes/demo.routes.js");
const enrollRoutes = require("./routes/enroll.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://crm-bu7r.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/enquiry", enquiryRoutes);
app.use("/listItem", listItemRoutes);
app.use("/demo", demoRoutes);
app.use("/enroll", enrollRoutes);
app.use("/work", require("./routes/work.routes.js"));
app.use("/expense", require("./routes/expense.routes.js"));

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
