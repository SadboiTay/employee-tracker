const db = require('../db/connection');
const cTable = require('console.table');

class Department {
    // get all departments
    async viewAll() {
        const sql = `SELECT * FROM department`;
        const [rows] = await db.promise().query(sql)
        return rows;
    }

    // add a department
    async add(depName) {
        const sql = `INSERT INTO department (name) 
        VALUES (?)`;

        await db.promise().query(sql, depName)
        console.log('\nSUCCESSFULLY ADDED NEW DEPARTMENT\n')
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
    async viewAll() {
        const sql = `SELECT role.title, role.salary, department.name AS department_name
        FROM role
        JOIN department 
        ON role.department_id =  department.id;`;
        const [rows] = await db.promise().query(sql)
        return rows;
    }

    // add a role
    async add({ title, salary, department_id }) {
        const sql = `INSERT INTO role (title, salary, department_id) 
        VALUES (?,?,?)`;
        const params = [title, salary, department_id];

        const [rows] = await db.promise().query(sql, params)
        console.log('\nSUCCESSFULLY ADDED NEW ROLE\n')
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
    // get all employees
    async viewAll() {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
        FROM employee AS e
        JOIN role AS r
        ON e.role_id =  r.id
        JOIN department AS d
        ON r.department_id = d.id
        LEFT JOIN employee AS mngr
        ON e.manager_id = mngr.id
        ORDER BY e.id`;

        const [rows] = await db.promise().query(sql)
        return rows;
    }

    // get employees by manager
    async viewByManager(manager_id) {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
        FROM employee AS e
        JOIN role AS r
        ON e.role_id =  r.id
        JOIN department AS d
        ON r.department_id = d.id
        LEFT JOIN employee AS mngr
        ON e.manager_id = mngr.id
        WHERE mngr.id = ?
        ORDER BY e.id`;

        const [rows] = await db.promise().query(sql, manager_id)
        return rows;
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
    async updateRole({ employee_id, role_id }) {
        const sql = `UPDATE employee 
        SET role_id = ?
        WHERE id = ?`;
        const params = [role_id, employee_id];

        const [rows] = await db.promise().query(sql, params)
        console.log('\nSUCCESSFULLY UPDATED EMPLOYEE ROLE\n')
        return employee_id;
    }

    // update employe manager
    async updateManager({ employee_id, manager_id }) {
        const sql = `UPDATE employee 
        SET manager_id = ?
        WHERE id = ?`;
        const params = [manager_id, employee_id];

        const [rows] = await db.promise().query(sql, params)
        console.log("\nSUCCESSFULLY UPDATED EMPLOYEE'S MANAGER\n")
        return employee_id;
    }

    async viewById(id) {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
        FROM employee AS e
        JOIN role AS r
        ON e.role_id =  r.id
        JOIN department AS d
        ON r.department_id = d.id
        LEFT JOIN employee AS mngr
        ON e.manager_id = mngr.id
        WHERE e.id = ?`
        
        const [rows] = await db.promise().query(sql, id)
        console.table(rows);
    }
    
    async getNameById(id) {
        const sql = `SELECT CONCAT(first_name,' ', last_name) AS name
        FROM employee
        WHERE id = ?`

        const [row] = await db.promise().query(sql, id)
        const managerName = row[0].name;
        return managerName;
    }

    // generate array of employee names
    async listNames() {
        const sql = `SELECT CONCAT(first_name,' ', last_name) AS name, id FROM employee;`;

        const [rows] = await db.promise().query(sql)
        const list = [];

        for (let i = 0; i < rows.length; i++) {
            list.push({ value: rows[i].id, name: rows[i].name });
        }
        return list;
    }
}

module.exports = {
    Department,
    Role,
    Employee
}