import { object, string, InferType, ref } from 'yup'

export const authSchema = object({
    email : string().required('el campo email es requerido')
    .email('el campo email debe cumplir con la estructura de este example@gmail.com'),
    password : string()
    .matches(/[0-9]/,'la contrasena debe tener al menos un numero')
    .matches(/[A-Z]/, 'la contrasena debe tener mayusculas')
    .matches(/[a-z]/, 'la contrasena debe tener minusculas')
    .min(7, 'la contrasena debe tener almenos 7 caracteres')
    .required('la contrasena es requerida')
});

export const registerSchema = authSchema.shape({

    name : string().max(150).required(),
    confirmPassword : string().oneOf([ref('password')], "contrasena no coincide")
    .min(7, 'la contrasena debe tener almenos 7 caracteres')
    .required('confirmacion de contrasena requerida')

});

export interface Auth extends InferType<typeof authSchema>{};
export interface Register extends InferType<typeof registerSchema>{};