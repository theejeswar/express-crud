const Employee = require('../model/Employee');

const getAllEmployees = async (req,res)=>{
    const employees = await Employee.find();
    if (!employees) return res.send(204).json({'message': 'No employees found'});
    res.json(employees);
}

const createNewEmployee = async (req,res)=>{
    if (!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({'message':'firstname and lastname required'})
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastnamename: req.body.lastname
        });
        res.status(201).json(result)
    } catch (err){
        console.error(err);
    }
}

const updateEmployee = async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID parameter is required.'})
    }
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee){
        return res.status(204).json({'message':`No employee matches id  ${req.body.id} not found`});
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req,res)=>{
    if (!req?.body?.id) return res.status(400).json({'message': 'Employee ID is required'});
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee){
         return res.status(204).json({'message':`No employee matches id  ${req.body.id} not found`});
    };
    const results = await employee.deleteOne({_id : req.body.id})
    res.json(results);
}

const getEmployee = async (req,res)=>{
    if (!req?.params?.id) return res.status(400).json({'message': 'Employee ID is required'});
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee){
        return res.status(204).json({'message':`No employee matches id  ${req.body.id} not found`});
    };
    res.json(employee);
}

module.exports = {getAllEmployees, getEmployee, createNewEmployee, updateEmployee, deleteEmployee};