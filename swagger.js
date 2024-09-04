const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API文件",
    description: "台北通黑客松相關API",
  },
  host: "localhost:5001",
  schemes: ["http"],
};

const outputFile = "./docs/swagger-output.json";
const endpointsFiles = ["./app.js"]; // Point this to the main file or array of files containing your endpoints

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app"); // Your application's root file
});
