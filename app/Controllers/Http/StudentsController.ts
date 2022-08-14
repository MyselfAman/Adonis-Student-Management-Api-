import { Response } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student';
import {schema} from '@ioc:Adonis/Core/Validator'

export default class StudentsController {

    public async index(ctx:HttpContextContract){
        // return 'GET studentS';
        return Student.all();
    }
    public async store({request, response}:HttpContextContract){
        const newStudentSchema = schema.create({
            name: schema.string({trim:true})
        });
        const payload = await request.validate({schema: newStudentSchema});
        
        const student = await Student.create(payload);
        response.status(201);
        return student;
    }
    public async show({params}:HttpContextContract){
        return Student.findOrFail(params.id)
    }
    public async update({params, request}:HttpContextContract){
        const body = request.body();
        const student = await Student.findOrFail(params.id);
        student.name = body.name;
        return student.save();
    }
    public async destroy({params}, response:HttpContextContract){
        const student = await Student.findOrFail(params.id);
        // response.status(204);
        await student.delete();
        return student;

    }

}
