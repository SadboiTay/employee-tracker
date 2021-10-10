source db/db.sql;
source db/schema.sql;
source db/seeds.sql;

SELECT CONCAT(first_name,' ', last_name) AS name, id FROM employee;