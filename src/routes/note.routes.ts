import { Router } from "express";
import { note_controller } from "../controllers";

const note_router = Router();

note_router.get('/:id', note_controller.find);
note_router.get('', note_controller.findAll);
note_router.get('/search/:search', note_controller.search);
note_router.put('/:id', note_controller.update);
note_router.delete('/:id', note_controller.remove);
note_router.post('', note_controller.create);

export { note_router }