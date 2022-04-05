const BooksController = require('../controllers/books');

module.exports = (app, Books) => {
  const booksController = new BooksController(app.datasource.models.Books);
  app.route('/books')
    .get((req, res) => {
      booksController.getAll()
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/books')
    .post((req, res) => {
      Books.create(req.body)
        .then((result) => res.json(result))
        .catch(() => res.status(412));
    });

  app.route('/books/:id')
    .get((req, res) => {
      Books.findOne({ where: req.params })
        .then((result) => res.json(result))
        .catch(() => res.status(412));
    })

    .put((req, res) => {
      Books.update(req.body, { where: req.params })
        .then((result) => res.json(result))
        .catch(() => res.status(412));
    })

    .delete((req, res) => {
      Books.destroy({ where: req.params })
        .then(() => res.sendStatus(204))
        .catch(() => res.status(412));
    });
};
// module.exports = app;
