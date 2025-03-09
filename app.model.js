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

module.exports = { makeConnection, getAllPatients, deletePatient, getPatientById, createPatient }