
# Employee Tracker
![License Badge](https://img.shields.io/badge/license-MIT-green)
## Description
The purpose of this application is to provide a business with a way of keeping track of all their employees. It organizes all of the employees of a business into an easy to navigatedatabase. The database is organized into three tables; departments, roles, and employees. The user can view a table of all departments, all roles, or all employees. The department table provides the user with a department's name as well as its ID. The roles table provides the user with all the roles ID numbers, titles, salaries, and the department it belongs to. The employees table provides the user with all employees' ID numbers, first and last names, their roles, salaries, departments, and managers. Application also enables the user to add new departments, roles, employees and to update an employee's role.
## Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Contribution](#Contribution)
  * [License](#License)
  * [Contact](#Questions)
## Installation
To install this application, clone all the code and install the npm dependencies.  To do so navigate to the project's root directory and run the command npm install.  The packages this application uses are 'mysql2', 'inquirer', 'console.table', and 'dotenv'. The user also needs to establish a connection to MySql. Navigate to connection.js in the 'db' subdirectory and replace 'user:' and 'password:' with your username and password. 
## Usage
To start the application, run the command 'node app.js' in your terminal. The application will start. A menu will be displayed where you can choose to view departments, roles, or employees. There are also options to add a department, role, or employee. To add a department select that option and enter the new department's name. It will then be added to the database. The same goes for role and employee. Select those options and follow the prompts that are given. Adding a new role will ask for the name of the role, salary, and the ID of the department it belongs to. Adding a new employee will ask for the new employee's first name, last name, the ID of their role, and the manager they report to's ID.  The final option is to update an employee's role.  Select that option and follow the prompts. It will ask you to chose the name of the employee you would like to update and the role that they are changing to. To exit the application press 'ctrl c' on your keyboard. [A link to a walkthrough video can be found here](https://drive.google.com/file/d/152xvmZVWl7LotUPbQTSxd5BcNdIsjPDW/view).
## Contribution
This is for an assignment. I don't expect any contribution.

## License
MIT License

Copyright (c) 2021, Shay Wagner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## Questions
GitHub: srwagner916<br>
Email: <srwagner916@gmail.com>
