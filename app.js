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
  ]).then(answer => {
      console.log(answer.initPrompt);
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
      case 'Add a department':
        console.log('case: add department');
        break;
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