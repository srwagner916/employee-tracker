const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const init = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'initPrompt',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        "Update an employee's role",
        'Finish'
      ]
    }
  ])
    .then(answer => {
      switch (answer.initPrompt) {
      ///=========== Case: View departments
        case 'View all departments':
          let viewDepartmentssql = `SELECT * FROM departments`
          db.query(viewDepartmentssql, (err, result) => {
            if (err) throw err;
            console.table(result);
            init();
          });
          break;
      // end case

      //=========== Case: view roles
        case 'View all roles':

          let viewRolessql= `SELECT role.id, role.title, role.salary, departments.name AS department
                             FROM role
                             JOIN departments ON role.department_id = departments.id`;

          db.query(viewRolessql, (err, result) => {
            if (err) throw err;
            console.table(result);
            init();
          });

          break;
      //end case
      
      //========== Case: View all employees
        case 'View all employees':
          const viewAllEmployeessql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, departments.name AS department, role.salary AS salary, CONCAT(manager.first_name, ' ', manager.last_name, ' ') AS manager
                                       FROM employee
                                       JOIN role ON role.id = employee.role_id
                                       JOIN departments ON departments.id = role.department_id
                                       LEFT JOIN employee manager ON employee.manager_id = manager.id`
          
          db.query(viewAllEmployeessql, (err, result) => {
            if (err) throw err;
            console.table(result);
            init();
          });

          break;

        //========= Case: Add Department
        case 'Add a department':
          inquirer.prompt([
            {
              type: 'input',
              name: 'departmentNameInput',
              message: 'What is the name of the department you are adding?'
            }
          ])
            .then(answer => {
              const newDepartment = answer.departmentNameInput;

              const sql = `INSERT INTO departments (name)
                           VALUES (?)`;
              db.query(sql, newDepartment, (err, result) => {
                if (err) throw err
                console.log(`${newDepartment} added`);
                init();
              });
            });
        
          break;
        // end case
        
        //========== Case: Add Role
        case 'Add a role':
          inquirer.prompt([
            {
              type: 'input',
              name: 'roleTitleInput',
              message: 'What is the title of the role you are adding?'
            },
            {
              type: 'input',
              name: 'salaryInput',
              message: 'What is the salary of this role?'
            },
            {
              type: 'input',
              name: 'departmentIdInput',
              message: 'What is the id of the department this role belongs to?'
            }
          ])
            .then(answers => {
              const params = [answers.roleTitleInput, answers.salaryInput, answers.departmentIdInput];
              const sql = `INSERT INTO role (title, salary, department_id)
                           VALUES (?, ?, ?)`;
              db.query(sql, params, (err, result) => {
                if (err) throw err
                console.log(`${answers.roleTitleInput} added`);
                init();
              });
            });

          break;
        // end case
        case 'Add an employee':
        console.log('case: add employee');
        break;
      case "Update an employee's role":
        const employeeArr = [];
        const roleArr = [];
        const whiteSpace = ' ';
        // query to get employee names
        db.query(`SELECT employee.first_name, employee.last_name FROM employee`, (err, result) => {
          if (err) {
            console.log(err)
          }
          employeeMap = result.map(employee => {
            return employee.first_name.concat(whiteSpace, employee.last_name);
          });
          employeeMap.forEach(employee => {
            employeeArr.push(employee);
          });
        });
        // query to get roles
        db.query(`SELECT role.title FROM role`, (err, result) => {
          if (err) {
            console.log(err);
          }
          roleMap = result.map(role => {
            return role.title;
          });
          roleMap.forEach(role => {
            roleArr.push(role);
          });
        });



        
        break;
      case 'Finish':
        break;
    }
  });
}

init();