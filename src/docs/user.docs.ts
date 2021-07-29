/**
 * @swagger
 *
 * components:
 *   schemas:
 *     token:
 *       type: object
 *       properties:
 *        token:
 *          type: string
 *          format: byte
 *          description: JWT
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         role:
 *           type: string
 *           enum:
 *              - user
 *              - admin
 *         password:
 *           type: string
 *           format: password
 *         phone:
 *           type: number
 *         posts:
 *           type: string
 *           description: in this field will be the id post
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       requered:
 *         - password
 *         - email
 *         - username
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     google_oauth:    
 *       type: oauth2
 *       description: This API uses OAuth 2.
 *       flows:
 *          authorizationCode:   
 *              authorizationUrl: http://localhost:5000/auth/google
 *              tokenUrl: http://localhost:5000/google/callback
 *              scopes: {}
 */

/**
 * @swagger
 * tags:
 *  name: Aouth
 *  description: endpoint Aouth
 */

/**
 * @swagger
 * /api/register:
 *  post:
 *    summary: here you can register
 *    Authorization: Bearer <token>
 *    securyty:
 *      $ref: '#components/securitySchemes/bearerAuth'
 *    tags: [Aouth]
 *    requestBody:
 *      description: if you want register, write unsername, email and password
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              passwordRepeat:
 *                type: string
 *                format: password
 *    responses:
 *      '201':
 *        description: return the jwt created
 *        content:
 *             application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/token'
 *                 example:
 *                     token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07fcqOX5MWI
 *      '400':
 *        description: return some problem with fields
 *      '500':
 *       description: return Internal Server Error
 *
 */


/**
 * @swagger
 *  /auth/google:
 *  get:
 *      commit: this route is for authenticate with google
 *      Authorization: google_oauth
 *      securyty:
 *          $ref: '#components/securitySchemes/google_oauth'
 *      tags: [Aouth]
 */
