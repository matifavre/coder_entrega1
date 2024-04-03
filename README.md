# challenge 1 - API Documentation

Project structure:
.
├── node_modules
├── public
├── src/
│ ├── data/
│ │ ├── FS/
│ │ │ ├── ProductManager.js
│ │ │ └── UserManager.js
│ │ ├── Files/
│ │ │ ├── users.json (if created)
│ │ │ └── products.json (if created)
│ │ └── Memory/
│ │ ├── ProductManager.js
│ │ └── UserManager.js
│ └── routers
├── .gitignore
├── package.json
├── server.js
├── utils.js
└── Readme.MD

productsManager.js -> fs -> Stores saved data in products.json file
productsManager.js -> Static
usersManager.js -> fs -> Stores saved data in users.json file
usersManager.js -> Static

Both fs instances of productsManager and usersManager are using export default in order to be able to use them in server.js

## server.js has the following product endpoints structure

### POST /api/products

- **Description:** Creates a new product and saves it using fs.
- **Method:** `create(data)`
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ id: [new product id], message: "Product created successfully" }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### GET /api/products

- **Description:** Fetches all products from fs. Supports query for filtering by category.
- **Method:** `read()`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ products: [array of products] }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### GET /api/products/:pid

- **Description:** Fetches a single product by its `pid` from fs.
- **Method:** `readOne(pid)`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ product: [product object] }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### PUT /api/products/:pid

- **Description:** Updates an existing product identified by `pid`.
- **Method:** `update(pid, data)`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ updatedProduct: [modified product object] }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### DELETE /api/products/:pid

- **Description:** Deletes a product identified by `pid`.
- **Method:** `destroy(pid)`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ message: "Product deleted successfully" }`
- **Error Handling:** Use `errorHandler` to handle any errors.

## server.js has the following users endpoints structure

### POST /api/users

- **Description:** Creates a new user and saves it using fs. Includes middleware for validating required and default properties.
- **Method:** `create(data)`
- **Success Response:**
  - **Code:** 201
  - **Content:** `{ id: [new user id], message: "User created successfully" }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### GET /api/users

- **Description:** Fetches all users from fs. Supports query for filtering by role.
- **Method:** `read()`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ users: [array of users] }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### GET /api/users/:uid

- **Description:** Fetches a single user by its `uid` from fs.
- **Method:** `readOne(uid)`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ user: [user object] }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### PUT /api/users/:uid

- **Description:** Updates an existing user identified by `uid`.
- **Method:** `update(uid, data)`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ updatedUser: [modified user object] }`
- **Error Handling:** Use `errorHandler` to handle any errors.

### DELETE /api/users/:uid

- **Description:** Deletes a user identified by `uid`.
- **Method:** `destroy(uid)`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ message: "User deleted successfully" }`
- **Error Handling:** Use `errorHandler` to handle any errors.

In order to test the use cases:

npm run dev -> to start the server

In POSTMAN (using products as an example but can be used as well with users)

1. GET /api/products
   To test fetching all products or filtered by category:
   Method: GET
   URL: http://localhost:8080/api/products for all products or http://localhost:8080/api/products?category=Books for filtered results.
   Action: Send the request and observe the response. You should receive a list of all products or a list filtered by the specified category.

2. GET /api/products/:pid
   To test fetching a single product by its ID:
   Method: GET
   URL: http://localhost:8080/api/products/<product_id> (replace <product_id> with the actual product ID you wish to retrieve).
   Action: Send the request and look at the response. You should receive the details of the product with the specified ID.

3. POST /api/products
   To test creating a new product:
   Method: POST
   URL: http://localhost:8080/api/products
   Headers: Set Content-Type to application/json.
   Body: Select raw and input a JSON object
   Action: Send the request and review the response. You should receive confirmation that the product has been created, including the ID of the new product.

4. PUT /api/products/:pid
   To test updating an existing product:
   Method: PUT
   URL: http://localhost:8080/api/products/<product_id> (replace <product_id> with the ID of the product you wish to update).
   Headers: Set Content-Type to application/json.
   Body: Choose raw and input a JSON object
   Action: Send the request and check the response. You should receive the updated product details.

5. DELETE /api/products/:pid
   To test deleting a product:
   Method: DELETE
   URL: http://localhost:8080/api/products/<product_id> (replace <product_id> with the ID of the product you wish to delete).
   Action: Send the request and examine the response. You should receive confirmation that the product has been deleted, including details of the deleted product.
