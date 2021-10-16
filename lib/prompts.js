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
                            console.table(`\n\nShowing employees under management of ${managerName}`, rows)
                            initialize();
                        })
                    })
                })
        })
    }

    viewEmployeesByDepartment(initialize) {
        department.listNames().then(depList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department to view employees:',
                    choices: depList
                }
            ])
                .then(({ department_id }) => {
                    employee.viewByDepartment(department_id).then(rows => {
                        department.getNameById(department_id).then(depName => {
                            console.table(`\n\nShowing employees in the ${depName} department`, rows)
                            initialize();
                        })
                    })
                })
        })
    }

    viewBudget(initialize) {
        department.listNames().then(depList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department to view utilized budget:',
                    choices: depList
                }
            ])
                .then(({ department_id }) => {
                    department.viewBudget(department_id).then(rows => {
                        console.table('\nShowing the sum of all employee salaries billed to this department:', rows)
                        initialize();
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

    deleteRecords(initialize) {
        inquirer.prompt([
            {
                type: "list",
                name: "delete_action",
                message: "What would you like to remove?",
                choices: [
                    'Delete an employee',
                    'Delete a role',
                    'Delete an entire department'
                ]
            }
        ])
            .then(({ delete_action }) => {
                switch (delete_action) {
                    case 'Delete an employee':
                        this.deleteEmployee(initialize)
                        break;
                    case 'Delete a role':
                        this.deleteRole(initialize)
                        break;
                    case 'Delete an entire department':
                        this.deleteDepartment(initialize)
                        break;
                }
            })
    }

    deleteEmployee(initialize) {
        employee.listNames().then(empList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select an employee to remove from record:',
                    choices: empList
                }
            ])
                .then(({ employee_id }) => {
                    employee.getNameById(employee_id).then(empNameToDelete => {
                        inquirer.prompt([
                            {
                                type: "confirm",
                                name: "confirm_delete",
                                message: `Are you sure you want to permanently remove ${empNameToDelete} from the company record?`
                            }
                        ])
                            .then(({ confirm_delete }) => {
                                if (confirm_delete) {
                                    employee.destroy(employee_id).then(() => {
                                        console.log(`\nSuccessfully deleted ${empNameToDelete} from company record.\n`)
                                        initialize();
                                    })
                                } else {
                                    console.log('\nCancelled. Returning to main menu.\n')
                                    initialize();
                                }
                            })
                    })
                })
        })
    }

    deleteRole(initialize) {
        role.listNames().then(roleList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select a company role to remove from record:',
                    choices: roleList
                }
            ])
                .then(({ role_id }) => {
                    role.getNameById(role_id).then(roleNameToDelete => {
                        inquirer.prompt([
                            {
                                type: "confirm",
                                name: "confirm_delete",
                                message: `Are you sure you want to permanently remove the ${roleNameToDelete} role from the company?\n\n Doing so will DELETE ALL EMPLOYEE RECORDS associated with this role.\n\n Be sure to reassign employees being retained to new roles first.`
                            }
                        ])
                            .then(({ confirm_delete }) => {
                                if (confirm_delete) {
                                    role.destroy(role_id).then(() => {
                                        console.log(`\nSuccessfully deleted the ${roleNameToDelete} role from company record. All associated employees have been removed.\n`)
                                        initialize();
                                    })
                                } else {
                                    console.log('\nCancelled. Returning to main menu.\n')
                                    initialize();
                                }
                            })
                    })
                })
        })
    }

    deleteDepartment(initialize) {
        department.listNames().then(depList => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department to remove from record:',
                    choices: depList
                }
            ])
                .then(({ department_id }) => {
                    department.getNameById(department_id).then(depNameToDelete => {
                        inquirer.prompt([
                            {
                                type: "confirm",
                                name: "confirm_delete",
                                message: `Are you sure you want to permanently remove the ${depNameToDelete} department from the company?\n\n Doing so will DELETE ALL roles and employee records associated with this department.\n\n Be sure to reassign employees being retained to new roles in other departments first.`
                            }
                        ])
                            .then(({ confirm_delete }) => {
                                if (confirm_delete) {
                                    department.destroy(department_id).then(() => {
                                        console.log(`\nSuccessfully deleted the ${depNameToDelete} department from company record. All associated roles and employees have been removed.\n`)
                                        initialize();
                                    })
                                } else {
                                    console.log('\nCancelled. Returning to main menu.\n')
                                    initialize();
                                }
                            })
                    })
                })
        })
    }
}

module.exports = Prompt;

