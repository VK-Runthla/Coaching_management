const express = require("express");
const connectedDatabase = require("../server/src/config/db");
const routerCourse = require("./src/routes/academics/courseRouter");
const subjectRouter = require("./src/routes/academics/Subject");
const studentRouter = require("./src/routes/studentRoute/studentRoutes");
const adminRouter = require("./src/routes/adminauthRoutes/addadminRoute");
const sessionrout = require("./src/routes/academics/sessionRout");
const bannerrout = require("./src/routes/academics/bannerRouts");

const app = express();
const port = 4001;
connectedDatabase();
app.use(express.json());
app.use("/api/subject", subjectRouter);
app.use("/api/admin", adminRouter);
app.use("/course", routerCourse);
app.use("/api/student", studentRouter);
app.use("/api/session",sessionrout)
app.use("/api/banner",bannerrout)
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`App is running on port : http://localhost:${port}`)
);
