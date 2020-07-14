// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const employee = require('./lib/Employee.js');

class Engineer extends Employee {
    constructor(name, email, id, officeNumber){
        super(name, email, id);

    }
}


module.exports = Engineer;