const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

// Array for team members
const teamMembers = [];

// Array for the id number
const idArray = [];

console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

// creates the prompts for the questions
function appMenu() {
// creates the function for creating manager questions
  function createManager() {
    console.log('Please build your team 👥');
    inquirer
      .prompt([
        
        {
          type: 'input',
          name: 'managerName',
          message: "What is the team manager's name?",
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'What is your ID number?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: 'What is your email?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: 'What is your office number?',
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.officeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }
// prompts user to choose if adding more team members
  function createTeam() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of team member would you like to add?',
          choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }
// creates the function for creating engineer questions
  function addEngineer() {
    inquirer
      .prompt([
     
        {
          type: 'input',
          name: 'engineerName',
          message: 'What is your name?',
        },
        {
          type: 'input',
          name: 'engineerId',
          message: 'What is your ID number?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: 'What is your email?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'github',
          message: 'Enter your GitHub user name',
        },
      ])
      .then((answers) => {
       
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.github,
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);

        createTeam();
      });
  }
// creates the function for creating intern questions
  function addIntern() {
    inquirer
      .prompt([
     
        {
          type: 'input',
          name: 'internName',
          message: 'What is your name?',
        },
        {
          type: 'input',
          name: 'internId',
          message: 'What is your ID number?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: 'What is your email?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'school',
          message: 'What is your school?',
        },
      ])
      .then((answers) => {
      
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.school,
        );
        teamMembers.push(intern);
        idArray.push(answers.engineerId);



        createTeam();
      });
  }

  function buildTeam() {
    
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();
