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
          const managerIdsql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, departments.name AS department
                                FROM employee
                                JOIN role ON role.id = employee.role_id
                                JOIN departments ON departments.id = role.department_id
                                WHERE employee.manager_id IS null`
          db.query(`SELECT role.id, role.title FROM role`, (err, result) => {
            if (err) {
              console.log(err)
            }
            console.table('\n', result);
          })
          db.query(managerIdsql, (err, result) => {
            if (err) {
              console.log(err)
            }
            console.table('\n', result);
          })
          inquirer.prompt([
            {
              type: 'input',
              name: 'firstNameInput',
              message: 'What is the first name of employee?',
              validate: firstName => {
                if (firstName) {
                  return true;
                }
                console.log('You must enter a name')
                return false;
              }
            },
            {
              type: 'input',
              name: 'lastNameInput',
              message: 'What is the last name of employee?',
              validate: lastName => {
                if (lastName) {
                  return true;
                }
                console.log('You must enter a name');
                return false;
              }
            },
            {
              type: 'input',
              name: 'roleIdInput',
              message: "What is the id of employee's role? (See Role Table Above)",
              validate: role => {
                if (role) {
                  return true;
                }
                console.log('You must enter role ID');
                return false;
              }
            },
            {
              type: 'input',
              name: 'managerIdInput',
              message: "What is the ID of employee's manager? (See manager table above)",
            }
          ])
            .then(answers => {
              const params = [answers.firstNameInput, answers.lastNameInput, answers.roleIdInput, answers.managerIdInput];
              const addEmployeesql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                      VALUES (?,?,?,?)`
                db.query(addEmployeesql, params, (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log('Employee Added');
                  init();
                });
            });
        break;
      // End Case
      //========Case update an employee's role
      case "Update an employee's role":
        updateEmployeeRole();
        break;
      case 'Finish':
        break;
    }
  });
}

//==========Update Employee Role Function
const updateEmployeeRole = () => {
  db.promise().query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`)
    .then(result => {
      let employeeArr = [];
      let roleArr = [];
      result[0].map(employee => {
        return employeeArr.push(employee.name);
      })
      db.promise().query(`SELECT role.title FROM role`)
        .then(result => {
          result[0].map(role => {
            return roleArr.push(role.title);
          })
        })
        inquirer.prompt([
          {
            type: 'list',
            name: 'updateEmployeeList',
            message: 'Which employee would you like to update?',
            choices: employeeArr
          },
          {
            type: 'list',
            name: 'updatedRoleList',
            message: 'What is their new role?',
            choices: roleArr
          }
        ])
          .then(answers => {
            for (let i=0; i<roleArr.length; i++) {
              if (answers.updatedRoleList.toString() === roleArr[i]) {
                console.log(answers.updateEmployeeList)
                let roleId = roleArr.indexOf(roleArr[i]) + 1;
                const params = [roleId, answers.updateEmployeeList]
                db.query(`UPDATE employee SET role_id = ? WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`, params)
              }
            }
            init();
          });
    });
}


init();