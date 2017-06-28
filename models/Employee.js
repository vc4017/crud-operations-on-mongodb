var mongoose = require('mongoose');


//schema
var employeeSchema = mongoose.Schema({
	
	_id:{
	    type:String,
		required:true
	},
	ID:{
		type:String,
		required: true
		
	},
	
	description:
	{
		type:String
	},
	NAME:{
		type:String,
		required:true
	},
	AGE:
	{
		type:String
	},
	DESIGNATION:{
		type:String,
	},
	create_date:{
		type:Date,
		default: Date.now
	}
	});
var Employee= module.exports = mongoose.model('Employee',employeeSchema);

//get Employees

module.exports.getEmployees = function(callback,limit)
{
Employee.find(callback).limit(limit);	
}
module.exports.getEmployeeById = function(id,callback)
{
Employee.findById(id, callback);	
}

//add Employee

module.exports.addEmployee= function(employees, callback)
{
	Employee.create(employees, callback);
}


//update Employee
module.exports.updateEmployee = function(id, employees, options, callback){
var query = {_id: id};
var update = {
	
	NAME:employees.NAME,
	AGE:employees.AGE
	
}

Employee.findOneAndUpdate(query, update, options, callback);	
}

//remove Employee
module.exports.removeEmployee = function(id, callback)
{
	var query = { _id: id};
	
	Employee.remove(query,callback);
}