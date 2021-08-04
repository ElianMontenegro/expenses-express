"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = void 0;
exports.option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Store api',
            version: '1.0.0',
            description: 'store api with Oauth authentication',
            contact: {
                name: "Elian Montenegro",
                email: "elianmontenegro491@gmail.com",
            },
        },
        servers: [{
                url: "http://localhost:5000",
                description: "Local server"
            }]
    },
    apis: ["./src/docs/*.ts"]
};
