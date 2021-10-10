const inquirer = require('inquirer');

const { Department, Role, Employee } = require('./lib/db_queries');
const department = new Department;
const role = new Role;
const employee = new Employee;
const Prompt = require('./lib/prompts');
const prompt = new Prompt;

const initialize = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'Select a task:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then(({ task }) => {
        switch (task) {
            case 'View all departments':
                department.viewAll().then(rows => {
                    console.table('\n\nShowing all departments', rows);
                    initialize();
                });
                break;
            case 'View all roles':
                role.viewAll().then(rows => {
                    console.table('\n\nShowing all roles', rows);
                    initialize();
                });
                break;
            case 'View all employees':
                employee.viewAll().then(rows => {
                    console.table('\n\nShowing all employees', rows);
                    initialize();
                });
                break;
            case 'Add a department':
                prompt.addDepartment(initialize);
                break;
            case 'Add a role':
                prompt.addRole(initialize);
                break;
            case 'Add an employee':
                prompt.addEmployee(initialize);
                break;
            case 'Update an employee role':
                prompt.updateEmployeeRole(initialize);
                break;
            case 'Exit':
                console.log('Bye!');
                process.exit();
        }
    })
}

initialize();