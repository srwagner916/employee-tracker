const addEmployeePrompt = [
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
]

module.exports = addEmployeePrompt;