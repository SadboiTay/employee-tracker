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
            return console.table('\n\nShowing all departments', rows);
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
                message: console.log('SUCCESSFULLY ADDED NEW DEPARTMENT\n'),
                data: this.viewAll()
            }
        })
    }

    // generate array of department names
    async listNames() {
        const sql = `SELECT * FROM department`;

        const [rows] = await db.promise().query(sql)
        const list = [];

        for (let i = 0; i < rows.length; i++) {
            const depName = rows[i].name;
            list.push({ value: rows[i].id, name: depName });
        }
        return list;
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
            return console.table('\n\nShowing all roles', rows)
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
                message: console.log('SUCCESSFULLY ADDED NEW ROLE\n'),
                data: this.viewAll()
            }
        })
    }

    // generate array of roles
    async listNames() {
        const sql = `SELECT title, id FROM role`;

        const [rows] = await db.promise().query(sql)
        const list = [];

        for (let i = 0; i < rows.length; i++) {
            list.push({ value: rows[i].id, name: rows[i].title });
        }
        return list;
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
            return console.table('\n\nShowing all employees', rows)
        })
    }

    // add an employee
    async add({ first_name, last_name, role_id, manager_id }) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
        const params = [first_name, last_name, role_id, manager_id];

        await db.promise().query(sql, params)

        console.log('\nSUCCESSFULLY ADDED NEW EMPLOYEE\n')
    }

    // update employee role
    updateRole({ employee_id, role_id }) {
        const sql = `UPDATE employee 
        SET role_id = ?
        WHERE id = ?`;
        const params = [role_id, employee_id];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return {
                message: console.log('SUCCESSFULLY UPDATED EMPLOYEE ROLE\n'),
                data: this.viewById(employee_id)
            }
        })
    }

    viewById(id) {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
        FROM employee AS e
        JOIN role AS r
        ON e.role_id =  r.id
        JOIN department AS d
        ON r.department_id = d.id
        LEFT JOIN employee AS mngr
        ON e.manager_id = mngr.id
        WHERE e.id = ?`
        

        db.query(sql, id, (err, row) => {
            if (err) {
                console.log(`error: ${err.message}`);
                return;
            }
            return console.table(row);
        })
    }

    // generate array of employee names
    async listNames() {
        const sql = `SELECT first_name, last_name, id FROM employee`;

        const [rows] = await db.promise().query(sql)
        const list = [];

        for (let i = 0; i < rows.length; i++) {
            const depName = rows[i].name;
            list.push({ value: rows[i].id, name: depName });
        }
        return list;
    }
}

module.exports = {
    Department,
    Role,
    Employee
}