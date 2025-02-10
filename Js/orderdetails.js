document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const totalAmountElement = document.getElementById("total-amount");
    const counterElement = document.getElementById("counter");
    const clearButton = document.getElementById("clear-storage");
    const buyNowButton = document.getElementById("buy-now");

    function updateCartCounter() {
        if (counterElement) {
            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            counterElement.textContent = totalQuantity;
        }
    }

    function calculateTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += parseFloat(item.Price.replace("$", "")) * item.quantity;
        });
        if (totalAmountElement) {
            totalAmountElement.textContent = total.toFixed(2);
        }
    }

    function renderCart() {
        if (!cartContainer) return;
        cartContainer.innerHTML = "";
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
            <div class="cart-item" data-index="${index}">
                <img src="${item.Image}" alt="${item.Name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${item.Name}</div>
                    <div class="item-price">${item.Price}</div>
                    <div class="item-category">${item.Category}</div>
                    <div class="quantity-control">
                        <button class="decrement">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity">
                        <button class="increment">+</button>
                    </div>
                </div>
                <button class="remove"><i class="fa-solid fa-trash"></i></button>
            </div>`;
        });
        calculateTotal();
        updateCartCounter();
    }

    cartContainer?.addEventListener("click", (event) => {
        const target = event.target;
        const cartItem = target.closest(".cart-item");
        if (!cartItem) return;
        const index = cartItem.dataset.index;

        if (target.classList.contains("increment")) {
            cart[index].quantity++;
        } else if (target.classList.contains("decrement")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        } else if (target.classList.contains("remove") || target.closest(".remove")) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });

    cartContainer?.addEventListener("change", (event) => {
        const target = event.target;
        if (target.classList.contains("quantity")) {
            const cartItem = target.closest(".cart-item");
            if (!cartItem) return;
            const index = cartItem.dataset.index;
            cart[index].quantity = parseInt(target.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            calculateTotal();
            updateCartCounter();
        }
    });

    clearButton?.addEventListener("click", function () {
        localStorage.clear();
        window.location.reload();
    });

    buyNowButton?.addEventListener("click", function () {
        localStorage.setItem("cart", JSON.stringify([])); // تصفير السلة
        window.location.reload();
    });

    renderCart();
    updateCartCounter();

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
});
