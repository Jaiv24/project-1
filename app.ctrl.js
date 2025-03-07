const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')

const app = express();

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + '/views');

Model.makeConnection();


app.get("/api", async (req, res) => {
    const patientArray = await Model.getAllPatients();

    const TPL = {
      title: 'Patients App',
      patients: patientArray
    }

    res.render('mypage', TPL)
});

app.get(/^(.+)$/, (req, res) => {
  res.sendFile(__dirname + req.params[0]);
}); 


const server = app.listen(3000, function()
{
  console.log("App listening on PORT 3000....");
});
