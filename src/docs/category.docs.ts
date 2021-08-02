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
 *                      decription: category name
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
 *              '400':
 *                  description: bad request
 *              '500':
 *                  description: server error
 *            
 *  
 */