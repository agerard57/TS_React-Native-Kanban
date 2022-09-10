const todosController = require("../controllers/todos.controller");

module.exports = function (app) {
  // GET all todos / POST new todo
  app.route("/todos").get(todosController.getAll).post(todosController.add);

  // GET todo by id / PUT to update a todo by id / DELETE todo by id
  app
    .route("/todo/:id([0-9a-f]{24})")
    .get(todosController.getOne)
    .put(todosController.update)
    .delete(todosController.delete);
};
