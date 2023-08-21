 const mysql  = require ('mysql2') //Imports my sql

const inquirer = require('inquirer'); // Imports inquirer

require("console.table"); // Allows you to display data as a table

const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
     port: "3306",
     user: "root",
     password: "employee-tracker",
    database: "employee_db"
})

connection.connect(err => {
    if (err) throw err;
    console.log('connected');
    ;
});

// Want to try an create Image Like in mockUp

// uses inquirer to prompt user with list 
const promptUser = () => {
    inquirer.prompt ([{
        type:'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all Departments',
            'Add Department',
            'Delete a Department',
            'View all Roles',
            'Add Role',
            'Delete a role',
            'View all Employees',
            'Add Employee',
            'Delete an Employee',
            'Update an Employee role',
            'No Action'
        ]
    }])
    .then((answers) => {
        const { choices } = answers;

        if (choices === "View all Departments") {
            ShowDepartments();
        }

        if (choices === "Add Department") {
            AddDepartment();
        }

        if (choices === "Delete a Department") {
            DeleteDepartment();
        }

        if (choices === "View all roles") {
            ShowAllRoles();
        }

        if (choices === "Add Role") {
            AddRole();
        }

        if (choices === "Delete a role") {
            DeleteRoll();
        }

        if (choices === "View all Employees") {
            ShowAllEmployees();
        }

        if (choices === "Add Employee") {
            AddEmployee();
        }

        if (choices === "Delete an Employee") {
            DeleteEmployee();
        }

        if (choices === "Update an Employee role") {
            UpdateEmployee();
        }

        if (choices === "No Action") {
            connection.end();
        };
    });  
};

// Function to View All Departments

ShowDepartments = () => {
    console.log('Showing All Departments');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};

// Function to add a department
const AddDepartment = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'addDept',
          message: 'What department do you want to add?',
          validate: (addDept) => {
            if (addDept) {
              return true;
            } else {
              return 'Please enter a department';
            }
          },
        },
      ])
      .then((answer) => {
        const departmentName = answer.addDept;
  
        // SQL query to insert the department into the database
        const sql = 'INSERT INTO department (name) VALUES (?)';
        
        // Execute the query
        connection.query(sql, [departmentName], (err, result) => {
          if (err) {
            console.error('Error adding department:', err);
          } else {
            console.log(`Added "${departmentName}" to departments!`);
          }
        });
      });
  };
