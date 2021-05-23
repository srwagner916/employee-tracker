const db = require('./db/connection');
const inquirer = require('inquirer');

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
              })
            });
        
          break;
        //==========================================//
        
        case 'Add a role':
          console.log('case: add role');
          break;
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