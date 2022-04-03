const Sequelize = require('sequelize'); // importa o Sequelize
const fs = require('fs'); // file-system - importar para ler os models
const path = require('path'); // path - para termos os paths relativos

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

module.exports = (app) => {
  if (!database) { // teste se o database ja nao foi iniciado
    const { config } = app; // vou pegar as configs do meu app e importar aqui
    const sequelize = new Sequelize( // inicia o Sequelize com a cfg que criamos no outro arquivo
      config.database,
      config.username,
      config.password,
      config.params,
    );

    database = {
      sequelize, // nosso banco inicializado acima
      Sequelize, // tambem exportar a dependencia inteira do Sequelize
      models: {}, // exportar a lista de models
    };
    database.models = loadModels(sequelize);

    sequelize.sync().done(() => database);// cada vez que inicar o app, ele vai sincronizar
  }

  return database;
};
