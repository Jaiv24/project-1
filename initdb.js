var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("patients.db");

db.serialize(function() {
  db.run("DROP TABLE IF EXISTS Patients");
  db.run("CREATE TABLE Patients (" +
         "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
         "name TEXT, " +
         "dob TEXT, " +
         "contact TEXT, " +
         "medical_history TEXT, " +
         "created_at TEXT DEFAULT CURRENT_TIMESTAMP, " +
         "visit_status TEXT)");
  
  db.run("INSERT INTO Patients (name, dob, contact, medical_history, created_at, visit_status) VALUES (?,?,?,?,?,?)",
    ["John Doe", "1985-05-15", "555-123-4567", 
     "No major issues. Occasional headaches.", 
     new Date().toISOString(), "Visited"]);
  
  db.run("INSERT INTO Patients (name, dob, contact, medical_history, created_at, visit_status) VALUES (?,?,?,?,?,?)",
    ["Jane Smith", "1990-10-08", "555-987-6543", 
     "Allergic to penicillin. Asthma.", 
     new Date().toISOString(), "Not Visited"]);
  
  db.run("INSERT INTO Patients (name, dob, contact, medical_history, created_at, visit_status) VALUES (?,?,?,?,?,?)",
    ["Robert Johnson", "1978-03-22", "555-333-2222", 
     "Hypertension. Takes medication daily.", 
     new Date().toISOString(), "Visited"]);
     
  db.run("INSERT INTO Patients (name, dob, contact, medical_history, created_at, visit_status) VALUES (?,?,?,?,?,?)",
    ["Maria Garcia", "1992-07-14", "555-444-5555", 
     "Recent surgery (2023). Follow-up scheduled.", 
     new Date().toISOString(), "Visited"]);
     
  db.run("INSERT INTO Patients (name, dob, contact, medical_history, created_at, visit_status) VALUES (?,?,?,?,?,?)",
    ["David Brown", "1965-12-01", "555-666-7777", 
     "Diabetes type 2. Regular checkups required.", 
     new Date().toISOString(), "Not Visited"]);
     
  console.log("Database initialized with sample patient data.");
  
  db.all("SELECT * FROM Patients", function(err, rows) {
    if (err) {
      console.error("Error querying data:", err);
    } else {
      console.log("Sample patients added:");
      console.log(rows);
    }
  });
});

// Export the database connection for use in other files
module.exports = db;