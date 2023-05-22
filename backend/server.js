
const app=require('./app')
const cookieParser = require('cookie-parser');
const db = require("./db-config");


db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});

