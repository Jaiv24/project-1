const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');

let db;

async function makeConnection(){
    db = await sqlite.open({
        filename: 'patients.db',
        driver: sqlite3.Database
    })
};


async function getPatientById(id) {
    const result = await db.get('SELECT rowid, * FROM Patients WHERE rowid = ?', id);
    return result;    
}
async function getAllPatients() {
    const result = await db.all('SELECT rowid, * FROM Patients');
    return result;
}

async function deletePatient(id) {
    await db.run('DELETE FROM Patients WHERE rowid = ?', id);
}

async function createPatient(data) {
    await db.run(
        'INSERT INTO Patients (name, dob, contact, medical_history, created_at, visit_status) VALUES (?, ?, ?, ?, ?, ?)',
        [data.name, data.dob, data.contact, data.medical_history, new Date().toISOString(), 'Not Visited']
    );
}
async function updateVisitStatus(id, status) {
    await db.run('UPDATE Patients SET visit_status = ? WHERE rowid = ?', status, id);
}

async function updatePatient(id, data) {
    await db.run(
        'UPDATE Patients SET name = ?, dob = ?, contact = ?, medical_history = ? WHERE rowid = ?',
        [data.name, data.dob, data.contact, data.medical_history, id]
    );
}

module.exports = { makeConnection, getAllPatients, deletePatient, getPatientById, createPatient, updateVisitStatus, updatePatient }