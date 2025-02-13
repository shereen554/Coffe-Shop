document.addEventListener("DOMContentLoaded", function () {
  let productData = localStorage.getItem("selectedProduct");

  // 🔹 التحقق مما إذا كانت البيانات غير موجودة
  if (!productData) {
      console.warn("⚠️ No product data found in localStorage.");
      showNoProductMessage();
      return; // إنهاء تنفيذ الكود لتجنب الخطأ
  }

  let product;
  try {
      product = JSON.parse(productData);
      if (!product || typeof product !== "object") {
          throw new Error("Invalid product data");
      }
  } catch (error) {
      console.error("❌ Error parsing product data:", error);
      showNoProductMessage();
      return;
  }

  console.log("✅ Loaded product:", product);

  let productDetails = document.getElementById("product-details");
  if (productDetails) {
      let productImage = product.Image || "../imgs/coffe-1.jpg"; // صورة افتراضية
      let productName = product.Name || "Unknown Product";
      let productPrice = product.Price || "N/A";

      productDetails.innerHTML = `
      <div class="cont-img">
          <img src="${productImage}" alt="${productName}">
      </div>
      <div class="des">
          <h2>${productName}</h2>
          <span>High quality coffee beans</span>
          <div class="cont-price">
              <h4>${productPrice}</h4>
          </div>
          <button class="log" id="Add-Product">Add To Cart</button>
      </div>`;

      // ⏳ انتظري تحميل الزر ثم أضيفي الحدث
      setTimeout(() => {
          let addButton = document.getElementById("Add-Product");
          if (addButton) {
              addButton.addEventListener("click", function () {
                  AddCart(product);
              });
          } else {
              console.error("❌ Add-Product button not found!");
          }
      }, 100);
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function AddCart(product) {
      if (!product) return;

      const existingItem = cart.find((item) => item.Name === product.Name);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          product.quantity = 1;
          cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`🛒 ${product.Name} added to cart!`);
      window.location.href = "../Html/orderdetails.html";
  }

  function showNoProductMessage() {
      let productContainer = document.getElementById("product-details");
      if (productContainer) {
          productContainer.innerHTML = "<p>⚠️ No product details available.</p>";
      }
  }
});


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
