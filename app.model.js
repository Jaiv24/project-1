const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');

let db;

async function makeConnection(){
    db = await sqlite.open({
        filename: 'patients.db',
        driver: sqlite3.Database
    })
};

async function getAllPatients() {
    const result = await db.all('SELECT rowid, * FROM Patients');
    return result;
}

async function deletePatient(id) {
    await db.run('DELETE FROM Patients WHERE rowid = ?', id);
}

module.exports = { makeConnection, getAllPatients, deletePatient }