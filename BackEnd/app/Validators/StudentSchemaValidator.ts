import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StudentSchemaValidator {
  constructor(protected ctx: HttpContextContract) {}
  
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'students', column: 'email' }),
    ]),
    cpf: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'students', column: 'cpf' }),
    ]),
    ra: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'students', column: 'RA' }),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.minLength': 'O campo nome deve ter no mínimo 3 caracteres',
    'name.maxLength': 'O campo nome deve ter no máximo 255 caracteres',
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'email.unique': 'O campo email deve ser único',
    'cpf.required': 'O campo cpf é obrigatório',
    'cpf.unique': 'O campo cpf deve ser único',
    'ra.required': 'O campo RA é obrigatório',
    'ra.unique': 'O campo RA deve ser único',
  }
}
