module.exports = {
  database: 'books', // nome do banco de dados
  username: '',
  password: '',
  params: { // coisas que vamos precisar pro sequelize
    dialect: 'sqlite', // como vou conversar com o banco?
    storage: `${process.env.NODE_ENV}_books.sqlite`, // onde vou guardar o banco
    define: {
      underscore: true,
    },
  },
};
