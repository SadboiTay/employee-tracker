const inquirer = require('inquirer');
const { Department, Role, Employee } = require('./db_queries');
const department = new Department;
const role = new Role;
const employee = new Employee;

class Prompt {
    viewEmployeesByManager(initialize) {
        employee.listNames().then(empList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select a manager to view their employees:',
                    choices: empList
                }
            ])
            .then(({ manager_id }) => {
                employee.viewByManager(manager_id).then(rows => {
                    employee.getNameById(manager_id).then(managerName => {
                        console.log(managerName);
                        console.table(`\n\nShowing employees under management of ${managerName}`, rows)
                        initialize();
                    })
                })
            })
        })
    }

    addDepartment(initialize) {
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
            department.add(name).then(() => initialize());
        })
    }

    addRole(initialize) {
        department.listNames().then(depList => {
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
                    choices: depList
                },
            ])
            .then(newRole => {
                role.add(newRole).then(() => initialize());
            })
        });
    }

    addEmployee(initialize) {
        role.listNames().then(roleList => {
            employee.listNames().then(empList => {
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
                        choices: roleList
                    },
                    {
                        type: 'list',
                        name: 'manager_id',
                        message: "Select employee's manager:",
                        choices: empList
                    },
                ])
                .then(newEmployee => {
                    employee.add(newEmployee).then(() => initialize());
                })
            })
        })
    }

    updateEmployeeRole(initialize) {
        employee.listNames().then(empList => {
            role.listNames().then(roleList => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee_id',
                        message: 'Select employee to update:',
                        choices: empList
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Select new role for this employee:',
                        choices: roleList
                    }
                ])
                .then(update => {
                    employee.updateRole(update).then((empId) => {
                        employee.viewById(empId).then(() => initialize());
                    });
                })
            })
        })
    }

    updateEmployeeManager(initialize) {
        employee.listNames().then(empList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select employee to update:',
                    choices: empList
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select a new manager for this employee:',
                    choices: empList
                }
            ])
            .then(update => {
                employee.updateManager(update).then((empId) => {
                    employee.viewById(empId).then(() => initialize());
                });
            })
        })
    }
}

module.exports = Prompt;

