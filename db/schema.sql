CREATE TABLE department (
  id AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  FOREIGN KEY (department_id),
    REFERENCES department(id),
    ON DELETE SET NULL
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
  FOREIGN KEY (employee_id),
    REFERENCES employee(id),
    ON DELETE SET NULL,
),

CREATE TABLE