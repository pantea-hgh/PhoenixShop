let cart = JSON.parse(localStorage.getItem("phoenixCart")) || [];

function saveCart() {
    localStorage.setItem("phoenixCart", JSON.stringify(cart));
}

function openCoin() {
    document.getElementById("coinPopup").classList.add("show");
}

function closeCoin() {
    document.getElementById("coinPopup").classList.remove("show");
}

function openPip() {
    document.getElementById("pipPopup").classList.add("show");
}

function closePip() {
    document.getElementById("pipPopup").classList.remove("show");
}

function openVip() {
    document.getElementById("vipPopup").classList.add("show");
}

function closeVip() {
    document.getElementById("vipPopup").classList.remove("show");
}

function openOgVip() {
    document.getElementById("ogvipPopup").classList.add("show");
}

function closeOgVip() {
    document.getElementById("ogvipPopup").classList.remove("show");
}

function openChP() {
    document.getElementById("chpPopup").classList.add("show");
}

function closeChP() {
    document.getElementById("chpPopup").classList.remove("show");
}

// اضافه کردن به سبد
function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    saveCart();
    updateCart();

    alert(name + " به سبد خرید اضافه شد 🛒");
}

// باز کردن سبد
function openCart() {

    document.getElementById("cartPopup").style.display = "flex";

    updateCart();
}

// بستن سبد
function closeCart() {

    document.getElementById("cartPopup").style.display = "none";
}

// آپدیت سبد
function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("totalPrice");

    if (!cartItems || !cartCount || !totalPrice) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} تومان</span>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>
        `;
    });

    cartCount.innerText = cart.length;

    totalPrice.innerText =
        total.toLocaleString() + " تومان";
}

// حذف محصول
function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    updateCart();
}


// ثبت سفارش
async function checkout() {

    if (cart.length === 0) {

        alert("سبد خرید خالی است!");
        return;
    }

    const response = await fetch("/api/orders", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            items: cart
        })
    });

    const data = await response.json();

    alert(data.message);
}

// وقتی صفحه باز شد
updateCart();