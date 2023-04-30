import { Next, Req, Res } from "../models/Http";
import { authSchema, registerSchema } from '../models/Auth';
import { prisma } from '../core/prisma';
import { compare_encrypt, encrypt, genre_jwt } from '../util/auth';

export async function register(req: Req, res: Res<any>, next: Next) {

    try {

        const user = await registerSchema.validate(req.body);

        const exist = await prisma.user.count({ where: { email: user.email } });

        const password = await encrypt(user.password);

        if (Boolean(exist)) return next('este email ya existe');

        const new_user = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password
            }
        });

        return res.status(201).json({message : "usuario creado"});

    } catch (err) {

        return next(err);

    }

}
export async function authenticate(req: Req, res: Res<any>, next: Next) {

    try {

        const credentials = await authSchema.validate(req.body);

        const user = await prisma.user.findFirst({ where: { email: credentials.email } });

        if (!user) return next('usuario o contrasena incorrecta');

        const correct_credentias = compare_encrypt(credentials.password, user.password);

        if (!correct_credentias) return next('ususrio o contrasena incorrecta');

        const token = genre_jwt(user.id);

        return res.json({ token: token });

    } catch (error) {
        next(error)
    }
}
export function verify(req : Req, res : Res<undefined>, next : Next){

    res.status(200);

};