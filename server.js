const mysql = require('mysql2') //Imports my sql

const inquirer = require('inquirer'); // Imports inquirer

require("console.table"); // Allows you to display data as a table

require('dotenv').config();

// Mysql connection using .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected');
    afterConnection();
});

// uses inquirer to prompt user with list 
const promptUser = () => {
    inquirer.prompt ([{
        type:'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all employees',
            'View all roles',
            

        ]
    }])
}