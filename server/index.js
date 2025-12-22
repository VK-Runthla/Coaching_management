const express = require("express");
const connectedDatabase = require("../server/src/config/db");
const routerCourse = require("./src/routes/academics/courseRouter");
const subjectRouter = require("./src/routes/academics/Subject");
const studentRouter = require("./src/routes/studentRoute/studentRoutes");
const sessionrout = require("./src/routes/sessionRout");
const adminRouter = require("./src/routes/adminauthRoutes/addadminRoute");
// const subjectRouter = require("./src/routes/SubjectRoutes");
const popularCourseRoute = require('./src/routes/popularCourseRoute/popularCourseRoute');

const app = express();
const port = 4001;

connectedDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/subject", subjectRouter);
app.use("/api/admin", adminRouter);
app.use("/course", routerCourse);
app.use("/api/student", studentRouter);
app.use('/api/popular-course', popularCourseRoute);
app.use("/api/session", sessionrout)


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`App is running on port : http://localhost:${port}`)
);
