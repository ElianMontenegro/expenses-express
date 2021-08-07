/**
 * @swagger
 *  components:
 *      schemas:
 *          category:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      descripton: auto-generated id of category
 *                  name: 
 *                      type: string
 *                      description: category name
 *              example:
 *                  id: 3101d22e2a4b9365e520d8fa
 *                  name : clothes
 */             

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category endpoint
 */

/**
 * @swagger
 *  /api/category:
 *      post:
 *          summari: here you can create a category
 *          tags: [Category] 
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/category' 
 *          responses:
 *              '201':
 *                  description: return category
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/category'
 *              '400':
 *                  description: bad request
 *                  content:
 *                      application/json:
 *                          schema:            
 *                               type: object
 *                               properties:
 *                                  msg:
 *                                     type: string
 *                               example:
 *                                  msg : name empty
 *                          
 *              '500':
 *                  description: server error
 *            
 *  
 */