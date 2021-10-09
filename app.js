const { Department, Role, Employee } = require('./utils/db_queries');
const department = new Department;
const role = new Role;
const employee = new Employee;

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

employee.add(todd);