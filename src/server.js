"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var app = (0, fastify_1.default)();
//GET,POST, PUT, PATCH, DELETE
app.get('/hello', function (req, res) {
    return 'Hello World';
});
app.listen({
    port: 3333,
}).then(function () {
    console.log('http server listening on port 3333');
});
