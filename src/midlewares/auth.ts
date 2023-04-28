import { Importance } from "@prisma/client";
import { number, string } from "yup";
import { Next, Res, Req, ErrorResponse } from "../models";
import { validate_token } from '../util/auth';
import { prisma } from '../core/prisma';


export async function auth(req: Req, res: ErrorResponse, next: Next) {

    try {


        const token = await string().required().validate(req.headers.authorization);

        const { id } = validate_token(token);
        

        const exist = await prisma.user.count({ where : {id} })
       
        await number().min(1, 'error authentication').validate(exist)

        req.headers.authorization = id.toString();

        next();
        
    } catch (err) {
        console.log(err);
        
          res.json({ message : 'error al authenticarse' }).status(403);

    }
};

export function role(roles: Importance[]) {

    return ((req: Req, res: Res<any>, next: Next) => {



    });

};