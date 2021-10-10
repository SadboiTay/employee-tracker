source db/db.sql;
source db/schema.sql;
source db/seeds.sql;

SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, CONCAT(mngr.first_name, ' ', mngr.last_name, ' ') AS manager
FROM employee AS e
JOIN role AS r
ON e.role_id =  r.id
JOIN department AS d
ON r.department_id = d.id
LEFT JOIN employee AS mngr
ON e.manager_id = mngr.id
ORDER BY e.id;