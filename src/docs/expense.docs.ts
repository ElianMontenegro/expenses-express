
/**
 * @swagger
 * components:
 *      schemas:
 *          expense:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description:  auto-generated id of expense
 *                  title:
 *                      type: string
 *                      description: expenses name
 *                  amount:
 *                      type: number
 *                      description: the amount expense will go here
 *                  category:
 *                      type: string
 *                      description : the category id will go here 
 *                  user: 
 *                      type: string
 *                      description: the user id will go here    
 *                  createdAt:
 *                      type: string
 *                      format: data-time
 *                      description: created date
 *                  updatedAt:
 *                      type: string
 *                      format: data-time
 *                      description: date update, default created date

 *              requered:
 *                  - title
 *                  - amount
 *                  - category
 *                  - user
 *              example:
 *                  title: today's expense 
 *                  amount: 100
 *                  category : 6101d22e2a4b9365e520d8fa
 *                  user : 6108ad0c585a8d153026677d
 *                  createdAt : 2021-08-06T21:55:48.935+00:00
 *                  updatedAt : 2021-08-06T21:55:48.935+00:00
 *  
 *      parameters:
 *          expenseId:
 *              in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: the expense id
 */


/**
 * @swagger
 * tags:
 *  name: Expenses
 *  description: expenses endpoint
 */

//CREATE

/**
 * @swagger
 *  /api/expense:
 *      post:
 *          summary: in this route you can create a expenses
 *          security:
 *              - bearerAuth: []
 *          tags: [Expenses]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  description: expenses name
 *                              amount:
 *                                  type: number
 *                                  description: the amount expense will go here
 *                              category:
 *                                  type: string
 *                                  description : the category id will go here 
 *                          
 *          responses: 
 *             '201':
 *              description: the expense was successfully created
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/expense' 
 *             '401':
 *              description: Unauthorized
 *             '400':
 *              description: fields empty
 *                      
 * 
 */


//DELETE

/**
 * @swagger
 * /api/expense/{id}:
 *  delete:
 *      summary: delete a expense by id
 *      tags: [Expenses]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/expenseId'
 *      responses:
 *          '204':
 *              description: success delete , dont return any body
 *          '404':
 *              description: not found
 *
 */

//UPDATE

/**
 * @swagger
 * /api/expense/{id}:
 *  put:
 *      summary: update a expenses
 *      tags: [Expenses]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: expenses name
 *                          amount:
 *                              type: number
 *                              description: the amount expense will go here
 *                          category:
 *                              type: string
 *                              description : the category id will go here   
 *                           
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/expenseId'
 *      responses:
 *          '200': 
 *              description: expenses updated
 *          '404':
 *              description: expenses not founded
 *          '500': 
 *              description: error server
 */

//GET ALL EXPENSES

    
/**
 * @swagger
 * /api/expense:
 *  get:
 *      summary: get all expenses
 *      tags: [Expenses]
 *      responses:
 *          '200': 
 *              description: return expenses
 *          '404':
 *              description: expenses not founded
 *          '500': 
 *              description: error server
 */

// GET EXPENSE BY USER


/**
 * @swagger
 *  /api/expense/{id}:
 *      get:
 *          summary: here you can know all the user's expenses
 *          security:
 *              - bearerAuth: []
 *          tags: [Expenses]
 *          parameters:
 *              - $ref: '#/components/parameters/expenseId'
 *          responses:
 *              '200':
 *                  description: return expenses
 *              '404':
 *                  description: this user dont have expenses
 *              '500':
 *                  description: server error              
 *      
 */