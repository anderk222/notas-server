import { number, string } from 'yup';
import { prisma } from '../core';
import {
    Res, Next, Req, Paginable, Note,
    noteSchema
} from '../models';
import { getPaginable } from '../util';

export async function create(req: Req, res: Res<Note>, next: Next) {

    try {

        const userId = await number().required()
            .min(1).validate(parseInt(req.headers.authorization!));

        const data = req.body as Note;
        await noteSchema.validate(data);

        const new_note = await prisma.note.create({ data: { ...data, userId } });

        return res.json(new_note).status(201);

    } catch (error) {
        return next(error)
    }

}

export async function update(req: Req, res: Res<Note>, next: Next) {

    try {

        const id = await number().required()
            .min(1).validate(parseInt(req.params.id));
        const userId = await number().required()
            .min(1).validate(parseInt(req.headers.authorization!));
        const data = req.body as Note;

        await noteSchema.validate(data);

        const exits = await prisma.note.count({ where: { id, userId } });

        if (!exits) return next('nota no existe');

        const update_note = await prisma.note
            .update({ data: data, where: { id } });

        return res.json(update_note);

    } catch (error) {

        return next(error);

    }

}

export async function remove(req: Req, res: Res<Note>, next: Next) {

    try {

        const id = parseInt(req.params.id);


        const userId = await number().required()
            .min(1).validate(parseInt(req.headers.authorization!));

        await number().min(1).required().validate(id);

        const exits = await prisma.note.count({ where: { id, userId } });

        if (!exits) next('nota no existe');

        const deleted = await prisma.note.delete({ where: { id } });

        return res.json(deleted);

    } catch (error) {

        return next(error);

    }
}
export async function findAll(req: Req, res: Paginable<Note>, next: Next) {

    try {

        const userId = await number().required()
            .min(1).validate(parseInt(req.headers.authorization!));

        const exist_user = await prisma.user.count({ where: { id: userId } });

        await number().equals([1], 'usuario no existe').required().validate(exist_user);

        const { limit: take, page, skip } = getPaginable(req);

        const data = await prisma.note.findMany({ where: { userId }, take, skip });

        return res.json({ limit: take, page, count: 0, data });

    } catch (error) {

        next(error);


    }

}


export async function find(req: Req, res: Res<Note>, next: Next) {

    try {

        const userId = await number().required()
            .min(1).validate(parseInt(req.headers.authorization!));

        const id = await number().required()
            .min(1).validate(parseInt(req.params.id));

        const note = await prisma.note.findFirst({
            where: { id, userId }
        });

        if (!note) return next('note not found')

        return res.json(note);


    } catch (error) {

        next(error)

    };

}

export async function search(req: Req, res: Paginable<Note>, next: Next) {

    try {

        const userId = await number().max(1).required('error authentication')
            .validate(parseInt(req.headers.authorization!));

        const search = await string().required()
            .min(2, 'la nota a buscar debe tener minimo 2 caracteres').validate(req.params.search)

        const { limit: take, page, skip } = getPaginable(req);

        const data = await prisma.note.findMany({
            where: {
                OR: {
                    title: { contains: search },
                    content: { contains: search }

                },userId
            },
            take,
            skip
        });

        res.json({ page, limit: take, count: 0, data })

    } catch (error) {

        next(error)

    }

}