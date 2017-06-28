var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

//var Employee = require('./models/Employee');

var app = express();
var Employee= require('./models/Employee');
mongoose.connect('mongodb://localhost/EmployeeDetails');
var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', users);

app.get('/',function(req, res){
	res.sendFile( __dirname + "/" + "home.html" );
});


app.get('/api/Employee',function(req, res)
{
	Employee.getEmployees(function(err,Employees){
		if(err)
		{
			throw err;
		}
		
		res.send(JSON.stringify(Employees));
	});
});

app.get('/api/Employee/:_id',function(req, res)
{
	Employee.getEmployeeById(req.params._id, function(err,Employee){
		if(err)
		{
			throw err;
		}
		
		res.send(Employee);
	});
});

app.post('/api/Employee',function(req, res){
	
	 employees =  { 
	 _id:req.body.ID,
	 ID: req.body.ID,
	              NAME: req.body.NAME,
                  DESIGNATION: req.body.des  } ;
				  
	console.log(employees);
	Employee.addEmployee(employees, function(err, employees){
		if(err)
		{
			res.send("Please enter all the fields");
		}
		//res.setHeader('Content-Type', 'text/html');
		
		
		var html = '<html>'+
'<body>'+
'<center>'+
'<h3>'+
'<b><u>Add Employees</u></b>'+

'</h3>'+
'<br>'+
'<br>'+
'<table border="1" style="width:25%" >'+
'<thead>'+
  '<tr>'+
    '<th>ID</th>'+
    '<th>NAME</th>'+		
    '<th>DESIGNATION</th>'+
  '</tr>'+
  '</thead>'+
  '<tbody>'+
  '<tr>'+
    '<td>'+employees.ID+ '</td>'+
    '<td>'+ employees.NAME+ '</td>'+		
    '<td>'+ employees.DESIGNATION+ '</td>'+
  '</tr>'+
  '</tbody>'+
 
'</table>'+
'</center>'+
'<center>'+
'<a href=/>Add Another Employee</a><br>'+
'<a href=/api/Employee>get employees</a><br>'+

'</center>'+
'</body>'+
'</html>';

		res.send(html);
		
		
	});
});


app.get('/api/update',function(req,res){
	res.sendFile( __dirname + "/" + "update.html" );
})	
app.post('/api/update',function(req,res){
	
	var id = req.body._id;
	console.log(id);
	employees = { 
            NAME: req.body.nm1,
            AGE: req.body.age1
            };
	console.log(employees);
	Employee.updateEmployee(id,employees,{},function(err,employees){
		
		if(err) {throw err};
		
		res.json(employees);
		
		
	})
})
	app.get('/api/remove',function(req,res){
		res.sendFile(__dirname + "/" + "remove.html");
	})

app.post('/api/remove',function(req,res){

	var id = req.body.id;
	console.log(id);
	

	Employee.removeEmployee(id,function(err,employees){
		
		if(err) {throw err};
		
		res.json(employees);
		
		
	});
	
})
	
/*Employee.updateEmployee(employees, function(err, employees){
	
})*/
app.listen(4000);
console.log("running on 4000");




