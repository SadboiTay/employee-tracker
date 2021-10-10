const inquirer = require('inquirer');

const { Department, Role, Employee } = require('./lib/db_queries');
const department = new Department;
const role = new Role;
const employee = new Employee;
const Prompt = require('./lib/prompts');
const prompt = new Prompt;

const garbageMan = {
    title: 'Garbage Man',
    salary: 15000.00,
    department_id: 5
}

const todd = {
    first_name: 'Todd',
    last_name: 'Packer',
    role_id: 4,
    manager_id: 1
}

const newrole = {
    employee_id: 1,
    role_id: 15
}

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
                department.viewAll();
                break;
            case 'View all roles':
                role.viewAll();
                break;
            case 'View all employees':
                employee.viewAll();
                break;
            case 'Add a department':
                prompt.addDepartment();
                break;
            case 'Add a role':
                prompt.addRole();
                break;
            case 'Add an employee':
                prompt.addEmployee(initialize);
                break;
            case 'Update an employee role':
                prompt.updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Bye!');
                process.exit();
        }
    })
}

initialize();