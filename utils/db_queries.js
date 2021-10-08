const db = require('../db/connection');

// get all departments
function getAllDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        return console.table(rows);
    })
}
// get all roles
// get all employees

// post an employee
// post a department
// post a role

// put employee role

module.exports = getAllDepartments;