import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentSchemaValidator from 'App/Validators/StudentSchemaValidator'
import Student from 'App/Models/Student'
import StudentUpdateValidator from 'App/Validators/StudentUpdateValidator'

export default class StudentsController {

    public async index ({ response }: HttpContextContract) {
        const students = await Student.all()
        return response.json(students)
    }
    
    public async store ({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(StudentSchemaValidator)
            const student = await Student.create(data)
            return response.json(student)
        }
        catch (error) {
            return response.status(400).json(error.messages.errors)
        }       
    }
    
    public async show ({ params, response }: HttpContextContract) {
        try {
            const student = await Student.findOrFail(params.id)
            return response.json(student)
        }catch{
            return response.status(404).json({message: 'Aluno não encontrado'})
        }
    }
    
    public async update ({ params, request, response }: HttpContextContract) {
        try {
            const student = await Student.findOrFail(params.id)
            try{
                const data = await request.validate(StudentUpdateValidator)
                student.merge(data)
                await student.save()
                return response.json(student)
            }catch(error){
                return response.status(400).json(error.messages.errors)
            }
        }catch{
            return response.status(404).json({message: 'Aluno não encontrado'})
        }
    }
    
    public async destroy ({ params, response }: HttpContextContract) {
        try {
            const student = await Student.findOrFail(params.id)
            await student.delete()
            return response.status(302).json({message: 'Aluno deletado com sucesso'})
        }catch{
            return response.status(404).json({message: 'Aluno não encontrado'})
        }
    }
    
}
