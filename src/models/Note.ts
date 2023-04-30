import { object, string, InferType } from 'yup';
import { Note as NotePrisma } from '@prisma/client';
import { Importance } from "@prisma/client";

export const noteSchema = object({
    title: string().required('El titulo es requerido').max(40),
    content: string().required('EL titulo es requerido')
});

export interface Note extends InferType< typeof noteSchema>, NotePrisma  {};
export interface SortNote  {

    title: string;
    id: number;
    createAt: Date;
    importance: Importance;

}