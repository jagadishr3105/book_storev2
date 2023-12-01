searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}


let signUpForm = document.querySelector('.signup-form-container');

document.querySelector('#signup-btn').onclick = () =>{
  signUpForm.classList.toggle('active');
}

document.querySelector('#close-signup-btn').onclick = () =>{
  signUpForm.classList.remove('active');
}

function dropDownToggle() {
  document.getElementById("myDropdown").classList.toggle("show");
}

fetch('http://127.0.0.1:5000/books')
            .then(response => response.json())
            .then(data => {
                // Call function to create and display the table
                createBookTable(data);
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });



function createBookTable(books) {
            const table = document.getElementById('booksTable');
            const tbody = document.createElement('tbody');

            // Number of columns in the table
            const columns = 3;

            // Calculate the number of rows needed
            const numRows = Math.ceil(books.length / columns);

            // Loop through the rows
            for (let i = 0; i < numRows; i++) {
                const row = document.createElement('tr');

                // Loop through the columns
                for (let j = 0; j < columns; j++) {
                    const index = i * columns + j;

                    if (index < books.length) {
                        const book = books[index];
                        const cell = document.createElement('td');
                        const imageContainer = document.createElement('div');
                        imageContainer.classList.add('image');

                        // Create image element
                        const imageElement = document.createElement('img');
                        imageElement.src = `images/${book.imgsrc}`;

                        // Append image to the image container
                        imageContainer.appendChild(imageElement);

                        // Create content container
                        const contentContainer = document.createElement('div');
                        contentContainer.classList.add('content');

                        // Create heading element
                        const headingElement = document.createElement('h1');
                        headingElement.textContent = `${book.title} `;
                      
                         // Add the custom class to the heading

                        // Create price element
                        const priceElement = document.createElement('h2');
                        priceElement.textContent = `$${book.price}`;
                        
                        // Create discount price element
                        // const discountPriceElement = document.createElement('span');
                        // discountPriceElement.textContent = discountPriceText;
                        // priceElement.appendChild(discountPriceElement);

                        // Create button element
                        const buttonElement = document.createElement('a');
                        buttonElement.href = '#';
                        buttonElement.classList.add('btn');
                        buttonElement.textContent = 'Add to Cart';
                        buttonElement.setAttribute('onclick', 'addToCart(this)');

                        const bookIdcontainer = document.createElement('div');
                        bookIdcontainer.textContent = book.id;
                        bookIdcontainer.style.display = 'none'; // Optionally hide the cell if you don't want it visible

                        buttonElement.appendChild(bookIdcontainer);



                        // Append heading, price, and button to the content container
                        contentContainer.appendChild(headingElement);
                        contentContainer.appendChild(priceElement);
                        contentContainer.appendChild(buttonElement);

                        // Append image container and content container to the table cell
                        cell.appendChild(imageContainer);
                        cell.appendChild(contentContainer);

                        // Append the table cell to the table body

                        row.appendChild(cell);
                    } else {
                        // Add an empty cell for the remaining columns in the last row
                        const cell = document.createElement('td');
                        row.appendChild(cell);
                    }
                }

                tbody.appendChild(row);
            }

            table.appendChild(tbody);
        }


function addToCart(element) {
            // Retrieve user_id from localStorage
            const userId = localStorage.getItem('user_id');
            const accessToken = localStorage.getItem('accessToken');


            if (userId) {
                // Retrieve book_id from the hidden div inside the <a> tag
                const bookIdElement = element.querySelector('div');
                const bookId = bookIdElement.textContent;

                // Create JSON payload
                const payload = {
                    user_id: parseInt(userId),
                    book_id: parseInt(bookId),
                    quantity: 1
                };

                // Log the payload (you can send it to the Flask API here)
                console.log('JSON Payload:', payload);

                // Example: Send JSON payload to Flask API using fetch
                fetch('http://127.0.0.1:5000/add_to_cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data);
                    const cartIcon = document.getElementById('cartIcon');
                    cartIcon.style.color = 'red';

                    // Show the info window
                    const infoWindow = document.getElementById('infoWindow');
                    infoWindow.style.display = 'block';

                    // Hide the info window after a delay (e.g., 2 seconds)
                    setTimeout(() => {
                        infoWindow.style.display = 'none';
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle errors from the API request
                });
            } else {
                console.error('User is not logged in.'); // Handle the case where user_id is not available
            }
        }


document.getElementById('signInForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const userData = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    alert("Please recheck your username or password!");
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                console.log('Access Token:', data.access_token);
                const accessToken = data.access_token; // Replace with the actual access token
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('user_id',data.user_id)
                // Handle successful sign-in, e.g., redirect to a new page
                const greetingElement = document.getElementById('greeting');
                greetingElement.textContent = `Hi! ${data.user_name}`;
                loginForm.classList.remove('active');
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle authentication failure, e.g., display an error message
            });
        });


document.getElementById('signUpForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const userData = {
                username: formData.get('username'),
                password: formData.get('password'),
                email: formData.get('email')
            };

            fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    alert("Email already exixts with us");
                    throw new Error('Authentication failed');
                }
                return response.json();
            })
            .then(data => {
                alert("User Registered. Please login to continue!");
                signUpForm.classList.remove('active');
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle authentication failure, e.g., display an error message
            });
        });


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

// function loader(){
//   document.querySelector('.loader-container').classList.add('active');
// }

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});