let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartText = document.getElementById("cart-count");
const buttons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function showCart() {
    let total = 0;
    cart.forEach(function (item) {
        total = total + item.price;
    });
    cartText.textContent = "Cart: " + cart.length + " | Rs. " + total;
    renderCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function groupCart() {
    const counts = {};
    cart.forEach(function (item) {
        if (counts[item.name]) {
            counts[item.name].qty = counts[item.name].qty + 1;
        } else {
            counts[item.name] = { price: item.price, qty: 1 };
        }
    });
    return counts;
}

function renderCart() {
    cartItems.innerHTML = "";
    const counts = groupCart();
    let total = 0;

    for (const name in counts) {
        const lineTotal = counts[name].price * counts[name].qty;
        total = total + lineTotal;

        const row = document.createElement("p");
        row.textContent = counts[name].qty + " x " + name + " = Rs. " + lineTotal;
        cartItems.appendChild(row);
    }

    cartTotal.textContent = "Total: Rs. " + total;
}

showCart();

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        cart.push({
            name: button.dataset.name,
            price: Number(button.dataset.price)
        });
        saveCart();
        showCart();
    });
});

document.getElementById("order-btn").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const counts = groupCart();

    let message = "Hello Sweet Crumbs! I would like to order:\n";
    let total = 0;

    for (const name in counts) {
        const lineTotal = counts[name].price * counts[name].qty;
        message = message + "- " + counts[name].qty + " x " + name + " (Rs. " + lineTotal + ")\n";
        total = total + lineTotal;
    }

    message = message + "Total: Rs. " + total;

    const url = "https://wa.me/923012345678?text=" + encodeURIComponent(message);
    window.open(url, "_blank");
});