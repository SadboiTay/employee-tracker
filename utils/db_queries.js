const db = require('../db/connection');
const cTable = require('console.table');

class Department {
    // get all departments
    viewAll() {
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return console.table('Showing all departments', rows);
        })
    }

    // add a department
    add(depName) {
        const sql = `INSERT INTO department (name) 
        VALUES (?)`;

        db.query(sql, depName, (err, result) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return {
                message: console.log('Successfully added new department'),
                data: this.viewAll()
            }
        })
    }
}

class Role {
    // get all roles
    viewAll() {
        const sql = `SELECT role.title, role.salary, department.name AS department_name
        FROM role
        JOIN department 
        ON role.department_id =  department.id;`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return console.table('Showing all roles', rows)
        })
    }

    // add a role
    add({ title, salary, department_id }) {
        const sql = `INSERT INTO role (title, salary, department_id) 
        VALUES (?,?,?)`;
        const params = [title, salary, department_id];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return {
                message: console.log('Successfully added new role\n'),
                data: this.viewAll()
            }
        })
    }
}

class Employee {
    viewAll() {
        // get all employees
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
        FROM employee AS e
        JOIN role AS r
        ON e.role_id =  r.id
        JOIN department AS d
        ON r.department_id = d.id
        LEFT JOIN employee AS mngr
        ON e.manager_id = mngr.id
        ORDER BY e.id`;

        db.query(sql, (err, rows) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return console.table('Showing all employees', rows)
        })
    }

    // add an employee
    add({ first_name, last_name, role_id, manager_id }) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
        const params = [first_name, last_name, role_id, manager_id];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return {
                message: console.log('Successfully added new employee\n'),
                data: this.viewAll()
            }
        })
    }
}



// update employee role

module.exports = {
    Department,
    Role,
    Employee
}