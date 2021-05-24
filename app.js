////
//========Dependencies
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
// Prompts
const addDepartmentPrompt = require('./lib/addDepartmentPrompt');
const addRolePrompt = require('./lib/addRolePrompt');
const addEmployeePrompt = require('./lib/addEmployeePrompt');
const initPrompt = require('./lib/initPrompt');

/////////////////////////
/// View Tables Functions
/////////////////////////
// View all Departments
//=====================
const viewAllDepartments = () => {
  let viewDepartmentssql = `SELECT * FROM departments`
  db.query(viewDepartmentssql, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
}
/////
// View all Roles
////=============
const viewAllRoles = () => {
  let viewRolessql= `SELECT role.id, role.title, role.salary, departments.name AS department
                     FROM role
                     JOIN departments ON role.department_id = departments.id`;

  db.query(viewRolessql, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  });
}
/////
// View All Employees
////=================
const viewAllEmployees = () => {
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
}
//////////////////
/// Add Functions
//////////////////
/// Add a department
///=================
const addDepartment = () => {
  inquirer.prompt(addDepartmentPrompt)
    .then(answer => {
      const params = answer.departmentNameInput;

      const addDepartmentsql = `INSERT INTO departments (name)
                                VALUES (?)`;

      db.query(addDepartmentsql, params, (err, result) => {
        if (err) throw err;
        console.log(`=====Department added!=====`);
        init();
      });
    });
}
///////
/// Add role
///=========
const addRole = () => {
  const addRolesql = `SELECT *
                      FROM departments`;

  db.query(addRolesql, (err, result) => {
    if (err) throw err;
    console.table('\n', result);
  })
  inquirer.prompt(addRolePrompt)
    .then(answers => {
      const params = [answers.roleTitleInput, answers.salaryInput, answers.departmentIdInput];
      const addRolesql = `INSERT INTO role (title, salary, department_id)
                          VALUES (?, ?, ?)`;
      db.query(addRolesql, params, (err, result) => {
        if (err) throw err
        console.log(`=====Role added!=====`);
        init();
      });
    });
}
//////
/// Add Employee
///=============
const addEmployee = () => {
  // Statement for manager table
  const managerIdsql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, departments.name AS department
                        FROM employee
                        JOIN role ON role.id = employee.role_id
                        JOIN departments ON departments.id = role.department_id
                        WHERE employee.manager_id IS null`
  // Statement for role table
  const roleIdsql = `SELECT role.id, role.title FROM role`

  db.query(roleIdsql, (err, result) => {
    if (err) throw err
          
    console.table('\n', result);
  })
  db.query(managerIdsql, (err, result) => {
    if (err) throw err;
    console.table('\n', result);
  })
  // add employee prompts
  inquirer.prompt(addEmployeePrompt)
    .then(answers => {
      const params = [answers.firstNameInput, answers.lastNameInput, answers.roleIdInput, answers.managerIdInput];
      // sql statement to add new employee
      const addEmployeesql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                              VALUES (?,?,?,?)`
        db.query(addEmployeesql, params, (err, result) => {
          if (err) throw err
          console.log('=====Employee Added!=====');
          init();
        });
    });
}

/////////////////////
/// Update Functions
////////////////////
/// Update Employee Role
//===================
const updateEmployeeRole = () => {
  // statment to get employee names
  const employeeNamesql = `SELECT employee.id,
                           CONCAT(employee.first_name, ' ', employee.last_name)
                           AS name
                           FROM employee`;

  // statement to get role titles
  const roleTitlesql = `SELECT role.title FROM role`;

  // statement to update employee's role
  const updateEmployeesql = `UPDATE employee SET role_id = ?
                             WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`

  db.promise().query(employeeNamesql)
    .then(result => {
      let employeeArr = [];
      let roleArr = [];
      // push employee names to array
      result[0].map(employee => {
        return employeeArr.push(employee.name);
      })
      // push role titles to array
      db.promise().query(roleTitlesql)
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
              // if chosen role is = to index of array
              if (answers.updatedRoleList.toString() === roleArr[i]) {
                // roleId = role-id
                let roleId = roleArr.indexOf(roleArr[i]) + 1;
                const params = [roleId, answers.updateEmployeeList]
                db.query(updateEmployeesql, params);
                console.log('=====Employee Role Updated!======')
              }
            }
            init();
          });
    });
}
////////
////// initial prompt
////=================
const init = () => {
  inquirer.prompt(initPrompt)
    .then(answer => {
      switch (answer.initPrompt) {
      //================================= Case: View departments
        case 'View all departments':
          viewAllDepartments();
          break;
      // end case

      //================================= Case: view roles
        case 'View all roles':
          viewAllRoles();
          break;
      //end case
      
      //================================= Case: View all employees
        case 'View all employees':
          viewAllEmployees();
          break;

      //================================= Case: Add Department
        case 'Add a department':
          addDepartment();
          break;
      // end case
        
      //================================= Case: Add Role
        case 'Add a role':
          addRole();
          break;
      // end case

      //================================= Case: Add Employee
        case 'Add an employee':
          addEmployee();
        break;
      // End Case

      //================================= Case update an employee's role
      case "Update an employee's role":
        updateEmployeeRole();
        break;
      // End Case
    }
  });
}

// Call to initial prompt
init();