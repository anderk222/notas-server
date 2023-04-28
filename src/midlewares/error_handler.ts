import { ErrorResponse, Next, Req, Res } from '../models/Http';

export function error_handler(err: any, req: Req, res: ErrorResponse, next: Next) {

    return res.status(500).json({ message: (<Error>err).message })


}