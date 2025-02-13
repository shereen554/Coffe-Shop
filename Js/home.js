let slideIndex = 0;
const slides = document.querySelectorAll(".mySlides");
const dots = document.querySelectorAll(".dot");

function showSlides(n) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slideIndex = (n + slides.length) % slides.length;

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}

function plusSlides(n) {
    showSlides(slideIndex + n);
}

function currentSlide(n) {
    showSlides(n - 1);
}

function autoSlide() {
    plusSlides(1);
    setTimeout(autoSlide, 3000);
}

// Start the slider
document.addEventListener("DOMContentLoaded", () => {
    slides[0].classList.add("active"); 
    dots[0].classList.add("active");  
    setTimeout(autoSlide, 3000);
});


    // ------------------------show product--------------------------------
    products=[
        {
            Image: "../imgs/hot1.jpg",
            Name: "Latte",
            Price: "10$",
            Category: "Hot",
            Category1:"all",
        },
        {
            Image: "../imgs/hot2.jpg",
            Name: "Vanilla",
            Price: "20$",
            Category: "Hot",
            Category1:"all",
        },
        {
            Image: "../imgs/hot3.jpg",
            Name: "chocolet",
            Price: "30$",
            Category: "Hot",
            Category1:"all",
        },
        {
            Image: "../imgs/hot4.jpg",
            Name: "Milk Check",
            Price: "20$",
            Category: "Hot",
            Category1:"all",
        },
        {
            Image: "../imgs/hot5.jpg",
            Name: "Caramel",
            Price: "50$",
            Category: "Hot",
            Category1:"all",
        },
        {
            Image: "../imgs/hot6.jpg",
            Name: "Moka",
            Price: "10$",
            Category: "Hot",
            Category1:"all",
        },
        {
            Image: "../imgs/icecoffe1.jpg",
            Name: "Vanilla",
            Price: "20$",
            Category: "Ice",
            Category1:"all",
        },
        {
            Image: "../imgs/icecoffe2.jpg",
            Name: "Ice Moka",
            Price: "30$",
            Category: "Ice",
            Category1:"all",
        },
        {
            Image: "../imgs/icecoffe3.jpg",
            Name: "Ice Latte",
            Price: "10$",
            Category: "Ice",
            Category1:"all",
        },
        {
            Image: "../imgs/icecoffe1.jpg",
            Name: "Sbanch latte",
            Price: "50$",
            Category: "Ice",
            Category1:"all",
        },
        {
            Image: "../imgs/juice1.jpg",
            Name: "watermelon",
            Price: "20$",
            Category: "Juice",
            Category1:"all",
        },
        {
            Image: "../imgs/juice2.jpg",
            Name: "Lemon with mint",
            Price: "10$",
            Category: "Juice",
            Category1:"all",
        },
        {
            Image: "../imgs/juice3.jpg",
            Name: "kiwi",
            Price: "60$",
            Category: "Juice",
            Category1:"all",
        },
        {
            Image: "../imgs/juice4.jpg",
            Name: "Strawberry with milk",
            Price: "20$",
            Category: "Juice",
            Category1:"all",
        },
        {
            Image: "../imgs/juice5.jpg",
            Name: "blue",
            Price: "20$",
            Category: "Juice",
            Category1:"all",
        },
        {
            Image: "../imgs/juice6.jpg",
            Name: "red",
            Price: "20$",
            Category: "Juice",
            Category1:"all",
        }
    ]


    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //category
    const product = document.getElementById("product");
function showProducts(category) {
    product.innerHTML = "";
  products.forEach((item) => {
    if (item.Category === category || item.Category1 === category) {
        product.innerHTML += `
<div class="me-5 mb-5 col-3 pro">
              <div class="cont-img">
                <img src="${item.Image}" alt="product">
              </div>
              <div class="des">
               <h5>${item.Name}</h5>
               <span>High quality coffee beans</span>
               <div class="Start">
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star-half-stroke"></i>
                 <i class="fa-regular fa-star"></i>
               </div>
               <div class="cont-price">
                <h4>${item.Price}</h4>
           <div class="circle"  onclick='showInfo(${JSON.stringify(item)})'></div>
            <li ><a href="../Html/orderdetails.html" class="text-primary-emphasis"><i class="fa-solid fa-cart-shopping cart"  onclick='addToCart(${JSON.stringify(item)})'></i></a></li>
               </div>
              </div>
           </div>`;
    } 

  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    showProducts("all")
  });
  document.getElementById("all").addEventListener("click", () => showProducts("all"));
  document.getElementById("Ice").addEventListener("click", () => showProducts("Ice"));
  document.getElementById("Hot").addEventListener("click", () => showProducts("Hot"));
  document.getElementById("Juice").addEventListener("click", () => showProducts("Juice"));

  function showDetails(selectedProduct) {
    let productContainer = document.getElementById("product");
    if (!productContainer) return;

    productContainer.innerHTML = "";
    
    products.forEach((item) => {
        if (item.Name === selectedProduct.Name) {
            productContainer.innerHTML += `
            <div class="me-5 mb-5 col-3 pro">
                <div class="cont-img">
                    <img src="${item.Image}" alt="product">
                </div>
                <div class="des">
                    <h5 id="pro-Name">${item.Name}</h5>
                    <span>High quality coffee beans</span>
                    <div class="Start">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="cont-price">
                        <h4>${item.Price}</h4>
                        <i class="fa-solid fa-eye" style="cursor:pointer" onclick='showInfo(${JSON.stringify(item)})'></i>
                        <a href="#">
                            <i class="fa-solid fa-cart-shopping cart"></i>
                        </a>
                    </div>
                </div>
            </div>`;
        }
    });
}

function showInfo(product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "../Html/Product.html";
  }



  function addToCart(product) {
    const existingItem = cart.find((item) => item.Name === product.Name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
  }


  let username = localStorage.getItem("username");
    let usernameElem = document.querySelector(".display-username");
    let loginButton = document.querySelector(".log");

    if (usernameElem) {
        usernameElem.textContent = username ? `Welcome ${username}` : "Welcome Guest";
    }
    if (loginButton) {
        if (username) {
            loginButton.textContent = "Logout";
            loginButton.addEventListener("click", () => {
                localStorage.removeItem("username");
                window.location.reload();
            });
        } else {
            loginButton.textContent = "Login";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        let backToTopButton = document.getElementById("back-to-top");
    
        window.addEventListener("scroll", function () {
            if (window.scrollY > 700) { // يظهر بعد التمرير 200 بكسل
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        });
    
        backToTopButton.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    const scrollToTopBtn = document.getElementById("back-to-top");

    // Scroll to top
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });