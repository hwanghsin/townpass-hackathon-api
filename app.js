const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bloodPressureRouter = require("./routes/blood_pressure");
const swaggerFile = require("./docs/swagger-output.json");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/blood-pressure", bloodPressureRouter);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
