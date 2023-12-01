// Remove Items From Cart
$('a.remove').click(function(){
  event.preventDefault();
  $( this ).parent().parent().parent().hide( 400 );
 
})

// Just for testing, show all items
  $('a.btn.continue').click(function(){
    $('li.items').show(400);
  })


        // Function to dynamically populate the list items
        function populateCartItems() {

            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            const cartList = document.getElementById('cartList');
            let totalAmount = 0;
            const cartTotalElement = document.getElementById('carttotal');
            const netcartTotalElement = document.getElementById('netcartval');


            // Call the Flask API to fetch cart items
            fetch('http://127.0.0.1:5000/cart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                }).then(response => response.json())
                .then(data => {
                     console.log('API Response:', data);
                    // Iterate through each cart item and create a list item
                    data.cart_items.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('items', 'odd');

                        const itemHtml = `
                            <div class="infoWrap"> 
                                <div class="cartSection" style="width: 80%; float:left">
                                    <img src="images/${item.imgsrc}" alt="" class="itemImg" />
                                    <p class="itemNumber">#QUE-${item.book_id}</p>
                                    <h3>${item.title}</h3>
                                    <p> <input type="text" class="qty" value="${item.quantity}" /> x $${item.price.toFixed(2)}</p>
                                </div>  
                                <div class="prodTotal cartSection" style="width: 20%; float:right">
                                    <p>$${(item.quantity * item.price).toFixed(2)}</p>
                                </div>
                                <div class="cartSection removeWrap" id="removeItem">
                                     <a href="#" class="remove" onclick="removeItem(${item.cart_item_id})">x</a>
                                </div>
                            </div>
                        `;

                        totalAmount += item.quantity * item.price;

                        listItem.innerHTML = itemHtml;
                        cartList.appendChild(listItem);

                        const cartTotalelem = document.getElementById('carttotal');
                        cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;
                        netcartTotalElement.textContent = `$${(totalAmount+9).toFixed(2)}`;
                    });


                })
                .catch(error => {
                    console.error('Error fetching cart items:', error);
                });
        }

         populateCartItems();


         function removeItem(cart_item_id) {

            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
        
            fetch(`http://127.0.0.1:5000/remove_item?cart_item_id=${cart_item_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Item removed successfully:', data);
                    location.reload();

                    // Optionally, update the UI or perform any other actions
                })
                .catch(error => {
                    console.error('Error removing item:', error);
                    // Handle errors from the API request
                });
        }
