import { Router } from "express";
import {
    createTodoHandler,
    getTodosHandler,
    getTodoHandler,
    updateTodoHandler,
    deleteTodoHandler
} from "../controllers/todo.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.route("/").get(getTodosHandler).post(createTodoHandler);

router
    .route("/:id")
    .get(getTodoHandler)
    .put(updateTodoHandler)
    .delete(deleteTodoHandler);

export default router;
