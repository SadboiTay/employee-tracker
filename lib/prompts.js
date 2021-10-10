const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./db_queries');
const department = new Department;
const role = new Role;
const employee = new Employee;
const db = require('../db/connection');

class Prompt {
    addDepartment() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter department name:',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter the department name");
                        return false;
                    }
                }
            }
        ])
        .then(({ name }) => {
            return department.add(name);
        })
    }

    addRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter role title:',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log("Please enter the role title");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary to the penny (ex. 25000.00):'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select a department for this role:',
                choices: ['1', '2', '3']
            },
        ])
        .then(newRole => {
            return role.add(newRole);
        })
    }

    addEmployee() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter first name:',
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    } else {
                        console.log("Please enter employees first name:");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter last name:',
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log("Please enter employees last name:");
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select a role for this employee:',
                choices: ['1', '2', '3']
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Select employee's manager:",
                choices: ['1', '2', '3']
            },
        ])
        .then(newEmployee => {
            return employee.add(newEmployee);
        })
    }

    updateEmployeeRole() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select employee to update:',
                choices: ['1', '2', '3']
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select new role for this employee:',
                choices: ['1', '2', '3']
            }
        ])
        .then(update => {
            return employee.updateRole(update);
        })
    }
}

module.exports = Prompt;

