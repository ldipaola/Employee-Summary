const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

const manager = [];
const engineers = [];
const interns = [];

function managerInput() {

    return inquirer.prompt([
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        {
            type: "input",
            message: "ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Email: ",
            name: "email"
        },
        {
            type: "input",
            message: "Office Number: ",
            name: "officeNumber"
        }
    ]);
  }

  function engineerInput() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        {
            type: "input",
            message: "ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Email: ",
            name: "email"
        },
        {
            type: "input",
            message: "gitHub: ",
            name: "github"
        }
    ]);

  }
  function internInput() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        {
            type: "input",
            message: "ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Email: ",
            name: "email"
        },
        {
            type: "input",
            message: "School: ",
            name: "school"
        }
    ]);

  }

  function askForInput () {
     return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What role would you like to add?",
            choices: ["Engineer", "Intern", "None, my team is complete"]
          },
    ]);
  }

  async function employeeInput () {
     let addEmployee = await askForInput();
     if (addEmployee.role === "Engineer"){
         let engineer = await engineerInput();
         let myEngineer = new Engineer (engineer.name, engineer.id, engineer.email, engineer.github);
         engineers.push(myEngineer);
         employeeInput();
     } else if (addEmployee.role === "Intern"){
         let intern = await internInput();
         let myIntern= new Intern (intern.name, intern.id, intern.email, intern.school);
         interns.push(myIntern);
         employeeInput();
     } else {
        htmlRender(); 
     }
  }


  managerInput()
    .then(function(answers) {
        let myManager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber);
        manager.push(myManager);
        employeeInput();
    });
async function htmlRender () {
    let combinedEmployees = [
        ...manager,
        ...engineers,
        ...interns
    ];
    let html = await render(combinedEmployees);
    writeFileAsync(outputPath, html).then(function(){console.log(outputPath + " successfully created")});
}

