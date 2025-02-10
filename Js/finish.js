document.addEventListener("DOMContentLoaded", function () {
    // ✅ استرجاع بيانات المستخدم والسلة
    let username = localStorage.getItem("username");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.removeItem("cart");
  
    // ✅ التأكد من عدم إعادة تعيين السلة إذا كانت تحتوي على بيانات
    if (!cart.length) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  
    // ✅ تحديث اسم المستخدم في الصفحة
    let usernameElem = document.querySelector(".display-username");
    if (usernameElem) {
      usernameElem.textContent = username ? `Welcome ${username}` : "Welcome Guest";
    }
  
    // ✅ التعامل مع زر تسجيل الدخول/الخروج
    let loginButton = document.querySelector(".log");
    if (loginButton) {
      if (username) {
        loginButton.textContent = "Logout";
        loginButton.addEventListener("click", () => {
          localStorage.removeItem("username");
          alert("You have logged out!"); // ✅ رسالة تنبيهية
          window.location.href = "login.html"; // ✅ توجيه إلى صفحة تسجيل الدخول
        });
      } else {
        loginButton.textContent = "Login";
        loginButton.addEventListener("click", () => {
          window.location.href = "login.html"; // ✅ توجيه المستخدم لتسجيل الدخول
        });
      }
    }
  });
  