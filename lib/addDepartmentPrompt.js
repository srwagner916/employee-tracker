const addDepartmentPrompt = [{
  type: 'input',
  name: 'departmentNameInput',
  message: 'What is the name of the department you are adding?',
  validate: name => {
    if (name) {
      return true;
    }
      console.log('You must enter a department name');
  }
}]

module.exports = addDepartmentPrompt;