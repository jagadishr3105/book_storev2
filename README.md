# online_bookstore

**Project Requirements:**

1. Install Python3 [https://www.python.org/downloads/]
2. Download Pycharm or any IDE
3. Download Postman


**Setup Backend:**

1. Open the project in Pycharm or any IDE you prefer to code.
2. Open the project terminal.
3. Run the following commands in the terminal:
   > python3 --version

   > python3 -m venv venv

   > source venv/bin/activate

   > pip3 install requirements.txt

   > python app.py

  *The backend is up and running!*

4. This will start the server on your local machine.
5. Open the Postman application and import this collection:
   [https://api.postman.com/collections/17840735-2606b556-64b5-410a-bfa8-e132a79c23bf?access_key=PMAT-01HDHEQYXMAF1QRGK87BN9F043]
6. Use APIs to create data and fetch data from DB.

**API Description**

*User Authentication:*
1. POST /register: new user registration
2. POST /login: login existing users

*Books:*
1. GET /books: fetch all books
2. GET /books/id: fetch book by id
3. POST /books: add a new book
4. PUT /books/id: edit a book description
5. DELETE /books/id: delete a book

*Cart:*
1. GET /cart: fetch all cart items
2. POST /add_to_cart: add a new item to the cart
3. PUT /update_item: update the quantity of cart items
4. DELETE /remove_item: remove item from cart

*Orders:*
1. GET /orders: fetch all orders
2. POST /add_order: add a new order
3. GET /orders/id: fetch an order by id
4. PUT /orders/id: edit order details
5. DELETE /orders/id: delete an order
