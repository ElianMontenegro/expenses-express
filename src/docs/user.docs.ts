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
 *              scopes: {}
 *     facebook_oauth:    
 *       type: oauth2
 *       description: This API uses OAuth 2.
 *       flows:
 *          authorizationCode:   
 *              authorizationUrl: http://localhost:5000/auth/facebook
 *              scopes: {}    
 *              
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
 *                     refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07
 *      '400':
 *        description: return some problem with fields
 *      '500':
 *       description: return Internal Server Error
 *
 */

/**
 * @swagger
 *  /api/login:
 *      post:
 *          summary: you can login
 *          tags: [Aouth]
 *          requestBody:
 *              description: if you want login, write the email and password
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  format: email
 *                              password:
 *                                  type: string
 *                                  format: password
 *          responses:
 *              '200':
 *                  description: return access token and refresh token
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/token'
 *                          example:
 *                              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07fcqOX5MWI
 *                              refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07
 * 
 * 
 *              '404':
 *                  description: user not found
 *              '400':
 *                  description: fields empty
 *              '500':
 *                  description: server error 
 */



/**
 * @swagger
 *  /api/refreshToken:
 *   post:
 *    summary: here you can get other access token with the refresh token, if token version was modify,then the refresh token will be revoked
 *    security:
 *       - bearerAuth: []
 *    tags: [Aouth]
 *    responses:
 *      '200':
 *         description: return the jwt access
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/token'
 *                  example:
 *                      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGUwNTdhZmQzMjBiMmI5Yzk2ZGE5OSIsImVtYWlsIjoiZWxpYW5tb250ZW5lZ3JvNDkxQGdtYWlsLmNvbSIsImlhdCI6MTYyNjEyMTQzOCwiZXhwIjoxNjI2MjA3ODM4fQ.AgmSJFEbQYZPUAhqJkz03ii1LvQ6dF2P07fcqOX5MWI
 *      '401':
 *        description: UnauthorizedError
 */



/**
 * @swagger
 *  /api/logout:
 *   post:
 *    summary: here you can logged and revoke all the  refresh tokens
 *    security:
 *       - bearerAuth: []
 *    tags: [Aouth]
 *    responses:
 *      '204':
 *         description: revoke token
 *      '401':
 *        description: UnauthorizedError
 *      '500':
 *        description: error server
 */