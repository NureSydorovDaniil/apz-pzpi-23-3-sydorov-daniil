let users = JSON.parse(localStorage.getItem("users") || "[]");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// ---------------- PRODUCTS ----------------

const products = [
    {name:"iPhone 15", price:1200, image:"https://i.pinimg.com/1200x/a8/7c/93/a87c93b067cfb697e477fbf8039d64fc.jpg"},
    {name:"Samsung S24", price:1100, image:"https://i.pinimg.com/736x/6f/cd/58/6fcd581f6c3bb4e868ebc7ed05b77a77.jpg"},
    {name:"Xiaomi 14", price:800, image:"https://i.pinimg.com/1200x/5d/d7/2a/5dd72a5695c77afdd551c2b12067322a.jpg"},
    {name:"Pixel 8", price:900, image:"https://i.pinimg.com/1200x/8d/47/1f/8d471f5e2bce2c4a1004f24ce581a6f9.jpg"},
    {name:"OnePlus 12", price:850, image:"https://i.pinimg.com/1200x/49/cf/bd/49cfbd65424b4b03fc1097739536510a.jpg"},

    {name:"iPad Pro", price:1300, image:"https://i.pinimg.com/webp85/1200x/5b/23/53/5b2353e578f90e60f16de47b77f655b5.webp"},
    {name:"Galaxy Tab S9", price:1000, image:"https://i.pinimg.com/736x/8e/54/b8/8e54b81cad1eca4d35e4889f19a6fa44.jpg"},
    {name:"Lenovo Tab", price:600, image:"https://i.pinimg.com/736x/5d/b9/15/5db91567f1ade570ed0c93375c649e0b.jpg"},
    {name:"Huawei MatePad", price:700, image:"https://i.pinimg.com/736x/63/de/92/63de92a37b0c6cb794971c35d8abfa19.jpg"},
    {name:"Xiaomi Pad", price:650, image:"https://i.pinimg.com/736x/af/33/41/af334171785c2c589ceaf9b3ada91a43.jpg"},

    {name:"AirPods Pro", price:250, image:"https://i.pinimg.com/736x/88/12/28/88122855d4faa222a3c0ebb2c33e6726.jpg"},
    {name:"Sony WH-1000XM5", price:400, image:"https://i.pinimg.com/736x/46/03/31/460331037248b5e218a586907a3f3fb9.jpg"},
    {name:"Bose QC45", price:420, image:"https://i.pinimg.com/736x/da/7c/7b/da7c7b293c96afd6355cf78f257c10f0.jpg"},
    {name:"JBL Tune", price:150, image:"https://i.pinimg.com/webp85/1200x/58/aa/87/58aa87c52145dc05a7c85aeae05aee03.webp"},
    {name:"Samsung Buds", price:180, image:"https://i.pinimg.com/1200x/17/b6/cb/17b6cb3d99ae8eec5755086b3f78e7d2.jpg"}
];

// ---------------- AUTH ----------------

function showLogin(){
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("regForm").classList.add("hidden");

    document.getElementById("signinTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");
}

function showRegister(){
    document.getElementById("regForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");

    document.getElementById("signupTab").classList.add("active");
    document.getElementById("signinTab").classList.remove("active");
}

function register(){
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    users.push({email, pass});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Реєстрація успішна");
}

function login(){

    let email = document.getElementById("logEmail").value;
    let pass = document.getElementById("logPass").value;

    // 👑 АДМИН
    if(email === "admin@gmail.com" && pass === "admin123"){
        localStorage.setItem("currentUser", JSON.stringify({
            email,
            role: "admin"
        }));

        window.location.href = "orders.html";
        return;
    }

    let user = users.find(u => u.email === email && u.pass === pass);

    if(!user){
        alert("Невірні дані");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify({
        ...user,
        role: "user"
    }));

    window.location.href = "catalog.html";
}

// ---------------- NAV ----------------

function go(page){
    window.location.href = page + ".html";
}

// ---------------- CATALOG ----------------

function renderCatalog(){
    let el = document.getElementById("products");
    if(!el) return;

    el.innerHTML = "";

    products.forEach((p,i)=>{
        el.innerHTML += `
        <div class="card">
        <img src="${p.image}" alt="${p.name}" class="product-img">
            <h3>${p.name}</h3>
            <p>${p.price}$</p>
            <button class="btn-primary" onclick="addToCart(${i})">
                ${getText("add")}
            </button>
        </div>`;
    });
}

// ---------------- CART ----------------

function addToCart(i){
    cart.push(products[i]);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(getText("add"));
}

function renderCart(){
    let el = document.getElementById("cartItems");
    if(!el) return;

    el.innerHTML = "";

    let total = 0;

    cart.forEach((c,i)=>{

        total += c.price;

        el.innerHTML += `
        <div class="card">

            <img src="${c.image}" alt="${c.name}" class="product-img">

            <h3>${c.name}</h3>
            <p>${c.price}$</p>

            <button class="btn-danger" onclick="removeItem(${i})">
                ${getText("remove")}
            </button>

        </div>`;
    });

    let totalEl = document.getElementById("cartTotal");

    if(totalEl){
        totalEl.innerHTML = `<h2>Загальна сума: ${total}$</h2>`;
    }
}

function removeItem(i){
    cart.splice(i,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ---------------- ACCOUNT ----------------

if(document.getElementById("userEmail")){
    document.getElementById("userEmail").innerText =
        "Email: " + (currentUser ? currentUser.email : "");

    document.getElementById("userPass").innerText =
        "Password: " + (currentUser ? currentUser.pass : "");
}

function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "auth.html";
}

// ---------------- LANGUAGE ----------------

let lang = localStorage.getItem("lang") || "ua";

const dict = {
    ua: {
        catalog: "Каталог",
        cart: "Кошик",
        account: "Акаунт",

        catalog_title: "Каталог товарів",
        cart_title: "Кошик",
        account_title: "Акаунт",

        add: "Додати",
        remove: "Видалити",
        logout: "Вийти"
    },
    en: {
        catalog: "Catalog",
        cart: "Cart",
        account: "Account",

        catalog_title: "Product catalog",
        cart_title: "Cart",
        account_title: "Account",

        add: "Add",
        remove: "Remove",
        logout: "Logout"
    }
};

function toggleLang(){
    lang = (lang === "ua") ? "en" : "ua";
    localStorage.setItem("lang", lang);

    applyLanguage();

    // 🔥 ВАЖНО: мгновенно обновляем UI
    renderCatalog();
    renderCart();
}

function applyLanguage(){

    document.querySelectorAll("[data-i18n]").forEach(el=>{
        let key = el.getAttribute("data-i18n");

        if(dict[lang] && dict[lang][key]){
            el.innerText = dict[lang][key];
        }
    });
}

function getText(key){
    return dict?.[lang]?.[key] || key;
}

// ---------------- INIT ----------------

applyLanguage();
renderCatalog();
renderCart();

/* Для страницы авторизации */
if(document.getElementById("loginForm")){
    showLogin();
}


// ------------- CHECKOUT ----------
function placeOrder(){

    let fullName = document.getElementById("fullName").value;
    let phone = document.getElementById("phone").value;
    let city = document.getElementById("city").value;

    if(!fullName || !phone || !city){
        alert("Заповніть всі поля");
        return;
    }

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: currentUser?.email || "guest",
            fullName,
            phone,
            city,
            products: [...cart],
            total: cart.reduce((sum, p) => sum + p.price, 0),
            date: new Date().toLocaleString()
        })
    })
    .then(res => res.json())
    .then(() => {

        alert("Замовлення оформлено!");

        cart = [];
        localStorage.removeItem("cart");

        window.location.href = "catalog.html";
    })
    .catch(err => {
        console.error(err);
        alert("Помилка при створенні замовлення");
    });
}


function renderOrders(){

    let el = document.getElementById("ordersList");
    if(!el) return;

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(!user || user.role !== "admin"){
        el.innerHTML = "<h3>Доступ заборонено</h3>";
        return;
    }

    fetch("http://localhost:3000/orders")
        .then(res => res.json())
        .then(orders => {

            el.innerHTML = "";

            orders.forEach((o, i) => {

                el.innerHTML += `
                <div class="card">

                    <h3>${o.fullName}</h3>
                    <p>📧 ${o.user}</p>
                    <p>📞 ${o.phone}</p>
                    <p>🏙️ ${o.city}</p>
                    <p>💰 ${o.total}$</p>
                    <p>🕒 ${o.date}</p>

                    <hr>

                    <p>${o.products.map(p => p.name).join(", ")}</p>

                    <button class="btn-danger" onclick="deleteOrder(${o.id})">
                        Видалити замовлення
                    </button>

                </div>`;
            });
        });
}

function deleteOrder(id){

    fetch(`http://localhost:3000/orders/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        renderOrders();
    });
}

function renderAdminPanel(){

    let el = document.getElementById("adminPanel");
    if(!el) return;

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(user?.role === "admin"){
        el.innerHTML = `
            <button class="btn-primary" onclick="go('orders')">
                Адмін-панель (замовлення)
            </button>
        `;
    }
}

if(document.getElementById("ordersList")){
    renderOrders();
}

renderAdminPanel();
