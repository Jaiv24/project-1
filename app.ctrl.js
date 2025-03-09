const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')
const bodyParser = require('body-parser');
const app = express();

app.engine("mustache", mustacheExpress());

app.set("view engine", "mustache");
app.set("views", __dirname + '/views');


app.use(bodyParser.urlencoded({ extended: true })); 

Model.makeConnection();


app.get("/", async (req, res) => {
    const patientArray = await Model.getAllPatients();
    const allPatients = patientArray.map((patient, index) => ({
        ...patient,
        index: index + 1
    }));
    const TPL = {
        title: 'Patients App',
        patients: allPatients
    };
    res.render('mypage', TPL)
});

app.get("/patient/:id", async (req, res) => {
  const patient = await Model.getPatientById(req.params.id);
  console.log(patient);
  const TPL = {
    title: 'Patient Details',
    patient,
    isEdit: false
  };
  res.render('patientForm', TPL);
}
);

app.get("/add", async (req, res) => {
  const TPL = {
      title: 'Add New Patient',
      isEdit: false
  };
  res.render('patientForm', TPL);
});

app.post("/add", async (req, res) => {
  const errors = validateForm(req.body);
  if (Object.keys(errors).length > 0) {
      const TPL = {
          title: 'Add New Patient',
          isEdit: false,
          patient: req.body,
          errors
      };
      return res.render('patientForm', TPL);
  }

  await Model.createPatient(req.body);
  res.redirect('/');
});

app.get("/delete/:id", async (req, res) => {

  await Model.deletePatient(req.params.id);
  
  const patientArray = await Model.getAllPatients();
    const allPatients = patientArray.map((patient, index) => ({
        ...patient,
        index: index + 1
    }));
    const TPL = {
        title: 'Patients App',
        patients: allPatients
    };
    res.render('mypage', TPL)
});


app.get(/^(.+)$/, (req, res) => {
  res.sendFile(__dirname + req.params[0]);
}); 




// Form validation
function validateForm(data) {
  const errors = {};
  if (!data.name || data.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
  }
  if (!data.contact || !/^\d{10}$/.test(data.contact)) {
      errors.contact = 'Contact must be a valid 10-digit phone number';
  }
  return errors;
}

const server = app.listen(3000, function()
{
  console.log("App listening on PORT 3000....");
});
