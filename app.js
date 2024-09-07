const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bloodPressureRouter = require("./routes/blood_pressure");
const swaggerFile = require("./docs/swagger-output.json");

const app = express();
const port = process.env.PORT || 5001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  ); //Add other headers used in your requests
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/blood-pressure", bloodPressureRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
