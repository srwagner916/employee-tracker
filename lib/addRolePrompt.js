const addRolePrompt = [
  {
    type: 'input',
    name: 'roleTitleInput',
    message: 'What is the title of the role you are adding?',
    validate: roleTitle => {
      if (roleTitle) {
        return true;
      }
      console.log('You must enter a role title');
      return false;
    }
  },
  {
    type: 'input',
    name: 'salaryInput',
    message: 'What is the salary of this role?',
    validate: salary => {
      if (Number.isInteger(parseInt(salary))) {
        return true;
      }
      console.log('Salary must be a number');
        return false;
    }
  },
  {
    type: 'input',
    name: 'departmentIdInput',
    message: 'What is the id of the department this role belongs to? (See table above)',
    validate: departmentId => {
      if (departmentId) {
        return true;
      }
      console.log('You must enter a department ID');
      return false;
    }
  }
]

module.exports = addRolePrompt;