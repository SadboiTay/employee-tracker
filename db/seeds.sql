INSERT INTO department (name)
VALUES 
    ('Management'),
    ('Sales'),
    ('Accounting'),
    ('Quality Assurance'),
    ('HR'),
    ('Customer Service'),
    ('Warehouse'),
    ('Executive');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Regional Manager', 70000.00, 1),
    ('Sales Lead', 40000, 2),
    ('Salesperson', 30000.00, 2),
    ('Payroll', 42000.00, 3),
    ('Taxes', 56000.00, 3),
    ('Expenditures', 55000.00, 3),
    ('QA Rep', 39000.00, 4),
    ('HR Lead', 52000.00, 5),
    ('Staff Training', 45000.00, 5),
    ('Customer Service Rep', 32000.00, 6),
    ('Receptionist', 33000.00, 6),
    ('Warehouse Foreman', 47000.00, 7),
    ('Dock Loader', 29000.00, 7),
    ('Temp', 20000.00, 5),
    ('VP of Northeast Sales', 105000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jan', 'Levinson', 15, null),
    ('Michael', 'Scott', 1, 1),
    ('Jim', 'Halpert', 2, 2),
    ('Dwight', 'Schrute', 3, 3),
    ('Pam', 'Beesly', 11, 2),
    ('Andrew', 'Bernard', 3, 3),
    ('Phyllis', 'Vance', 3, 3),
    ('Stanley', 'Hudson', 3, 3),
    ('Oscar', 'Martinez', 5, 2),
    ('Kevin', 'Malone', 6, 2),
    ('Toby', 'Flenderson', 8, 1),
    ('Angela', 'Martin', 4, 2),
    ('Creed', 'Bratton', 7, 2),
    ('Meredith', 'Palmer', 7, 2),
    ('Ryan', 'Howard', 14, 11),
    ('Kelly', 'Kapoor', 10, 2),
    ('Darryl', 'Philbin', 12, 2),
    ('Nate', 'Nickerson', 13, 17);
    


    -- SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
    -- FROM employee AS e
    -- JOIN role AS r
    -- ON e.role_id =  r.id
    -- JOIN department AS d
    -- ON r.department_id = d.id
    -- LEFT JOIN employee AS mngr
    -- ON e.manager_id = mngr.id
    -- ORDER BY e.id;