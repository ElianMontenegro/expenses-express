
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
 * 
 *              requered:
 *                  - id
 *                  - title
 *                  - amount
 *                  - category
 *                  - user
 *              example:
 *                  title: today's expense 
 *                  amount: 100
 *                  category : 6101d22e2a4b9365e520d8fa
 *                  user : 6101b519f4abb50194eba22b
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
 *                          $ref: '#/components/schemas/expense'
 *          responses: 
 *             201:
 *              description: the expense was successfully created
 *             401:
 *              description: Unauthorized
 *             400:
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