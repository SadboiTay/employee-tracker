INSERT INTO department (name)
VALUES 
    ('Management'),
    ('Sales'),
    ('Accounting'),
    ('Quality Assurance'),
    ('HR'),
    ('Customer Service'),
    ('Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Regional Manager', 70000.00, 1),
    ('Sales Lead', 40000, 2),
    ('Salesperson', 30000.00, 2),
    ('Payroll', 42000.00, 3),
    ('Taxes', 55000.00, 3),
    ('Expenditures', 55000.00, 3),
    ('QA Rep', 45000.00, 4),
    ('HR Lead', 55000.00, 5),
    ('Staff Training', 45000.00, 5),
    ('Customer Service Rep', 32000.00, 6),
    ('Receptionist', 33000.00, 6),
    ('Warehouse Foreman', 47000.00, 7),
    ('Dock Loader', 29000.00, 7),
    ('Temp', 20000.00, 5);

    -- select role.*, department.name AS department_name
    -- FROM role
    -- JOIN department ON role.department_id =  department.id;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, null),
    ('Jim', 'Halpert', 2, 1),
    ('Dwight', 'Schrute', 3, 3),
    ('Pam', 'Beesly', 11, 1),
    ('Andrew', 'Bernard', 3, 3),
    ('Phyllis', 'Vance', 3, 3),
    ('Stanley', 'Hudson', 3, 3),
    ('Oscar', 'Martinez', 5, 1),
    ('Kevin', 'Malone', 6, 1),
    ('Toby', 'Flenderson', 8, 1),
    ('Angela', 'Martin', 4, 1),
    ('Creed', 'Bratton', 7, 1),
    ('Meredith', 'Palmer', 7, 1),
    ('Ryan', 'Howard', 14, 10),
    ('Kelly', 'Kapoor', 10, 1),
    ('Darryl', 'Philbin', 12, 1),
    ('Nate', 'Nickerson', 13, 1);