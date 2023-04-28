import { Response,  NextFunction, Request } from "express";

export type Res<T> = Response<T>;

export type Paginable<T> = Response<{ data : T[], count : number, limit : number, page : number }>

export type ErrorResponse = Response<{ message : string }>;

export { NextFunction as Next, Request as Req };