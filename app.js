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
          "Update an employee's role"
        ]
    }
  ])
    .then(answer => {
      switch (answer.initPrompt) {
        case 'View all departments':
          console.log('case: view departments');
          break;
        case 'View all roles':
          console.log('case: view roles');
          break;
        case 'View all employees':
          console.log('case: view employees');
          break;
        //========= Case: Add Department ===========//
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
        //==========================================//
        
        //========== Case: Add Role ================//
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
        //==============================================//
        case 'Add an employee':
        console.log('case: add employee');
        break;
      case "Update an employee's role":
        console.log('case: update employee role');
        break;
    }
  });
}

init();