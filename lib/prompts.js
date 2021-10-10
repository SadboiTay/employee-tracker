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
                choices: function doIT() {
                    
                }
            },
        ])
        .then(newRole => {
            // return role.add(newRole);
            console.log(newRole);
        })
    }
}

module.exports = Prompt;

