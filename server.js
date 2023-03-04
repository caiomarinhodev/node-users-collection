const app = require("./app");
require("dotenv").config({ path: __dirname + "/.env" });

const port = process.env.PORT || 3000;

app.listen(port);
console.log("Server started! At http://localhost:" + port);
