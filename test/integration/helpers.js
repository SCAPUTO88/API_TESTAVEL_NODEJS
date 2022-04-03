const chai = require('chai'); // importa o chai
const supertest = require('supertest'); // importa o supertest
const app = require('../../app'); // importa o app.js

global.app = app;
global.request = supertest(app);
global.expect = chai.expect; // expect é uma lib do chai que prove um conjunto de funcionalidades
