# Sprint_1

Created 2 class with the following structure:

1 - ProductsManager Class that is responsible for managing products.
a) each product has the following properties: id,title,photo,category, price, stoc.

2 - UsersManager Class that is responsible for managing users
a) each user has the following properties: id, photo, email,password, rol

In both cases, there is private variable that stores the data from products/users into an array.

#Sprint_2

Added features:

1- Created folder structure that consists of:
.
└── Data/
├── FS/
│ ├── ProductManager.js
│ ├── UserManager.js
│ └── Files/
│ ├── users.json (if created)
│ └── products.json (if created)
├── Memory/
│ ├── ProductManager.js
│ └── UserManager.js
└── Readme.MD

2 - To the ProductManager and UserManager classes in Memory, I've added:
a)try / catch for all methods for handling errors
b)readOne() -> method that reads only one ID (or any other attribute) provided
c)destroy() -> method that deletes an object by providing an ID (or any other attribute)

3 - Created ProductManager and UserManager classes in the FS folder that are storing the data in json objects
a) These classes are async and have try/catch blocks for error handling

In order to test the classes:

Users (FS) - ./data/fs/usersManager.js
ProductManager(FS) - ./data/fs/productsManager.js
Users (Memory): node ./data/memory/usersManager.js
ProductManager (Memory): node ./data/memory/productsManager.js
