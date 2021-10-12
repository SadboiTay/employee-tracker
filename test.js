const { Department, Role, Employee } = require('./lib/db_queries');
const department = new Department;
const role = new Role;
const employee = new Employee;

employee.getNameById(2).then(name => console.log(name));