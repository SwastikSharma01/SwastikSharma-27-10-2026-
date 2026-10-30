let vehicles = [
    { name: "Tesla Model 3", price: 6000000 },
    { name: "BMW X5", price: 9690000 },
    { name: "Honda Civic", price: 2500000 },
    { name: "Ford Mustang", price: 8000000 },
    { name: "Mercedes-Benz C-Class", price: 7000000 },
    { name: "Kawasaki Ninja ZX-10R", price: 2000000 },
    { name: "Royal Enfield Classic 350", price: 189000 },
    { name: "Audi Q7", price: 9229000 },
    { name: "Porsche 911", price: 20000000 },
    { name: "Hyundai Creta", price: 1500000 }
];

let cart = [];
let discount = 0;
let appliedCoupon = "";

function formatPrice(price) {

    if (price >= 10000000) {
        return "₹" + (price / 10000000).toFixed(2) + " Cr";
    }

    return "₹" + (price / 100000).toFixed(2) + " Lakh";
}


// Change Quantity

function changeQuantity(index, value) {

    let quantity = document.getElementById("quantity-" + index);

    let number = Number(quantity.textContent);

    number = number + value;

    if (number < 1) {
        number = 1;
    }

    quantity.textContent = number;
}


// Add to Cart

function addToCart(index) {

    let quantity = Number(
        document.getElementById("quantity-" + index).textContent
    );

    let found = false;

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].name === vehicles[index].name) {

            cart[i].quantity += quantity;

            found = true;
        }
    }

    if (found === false) {

        cart.push({
            name: vehicles[index].name,
            price: vehicles[index].price,
            quantity: quantity
        });
    }

    updateCart();
}


// Update Cart

function updateCart() {

    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    for (let i = 0; i < cart.length; i++) {

        let itemTotal = cart[i].price * cart[i].quantity;

        total += itemTotal;

        count += cart[i].quantity;

        let item = document.createElement("div");

        item.className = "cart-item";

        let name = document.createElement("p");

        name.textContent = cart[i].name + " , Qty: " + cart[i].quantity;

        let price = document.createElement("p");

        price.textContent = formatPrice(itemTotal);

        let button = document.createElement("button");

        button.textContent = "Remove";

        button.onclick = function () {
            removeItem(i);
        };

        item.appendChild(name);

        item.appendChild(price);

        item.appendChild(button);

        cartItems.appendChild(item);
    }

    if (cart.length === 0) {

        cartItems.textContent = "Your cart is empty.";
    }

    // Calculate Discount

    if (appliedCoupon === "SAVE10") {
        discount = total * 0.10;
    } else if (appliedCoupon === "SAVE25") {
        discount = total * 0.25;
    } else {
        discount = 0;
    }

    document.getElementById("cart-count").textContent = count;

    document.getElementById("cart-total").textContent =
        "Subtotal: " + formatPrice(total);

    document.getElementById("discount").textContent =
        formatPrice(discount);

    document.getElementById("final-total").textContent =
        formatPrice(total - discount);

    document.getElementById("empty-cart").disabled = cart.length === 0;
}


// Remove Item

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// Empty Cart
document.getElementById("empty-cart").addEventListener("click", function () {

    cart = [];

    appliedCoupon = "";

    document.getElementById("coupon-code").value = "";

    document.getElementById("coupon-message").textContent = "";

    updateCart();
});


// Apply Coupon

document.getElementById("apply-coupon").addEventListener("click", function () {

    let code = document.getElementById("coupon-code").value.trim().toUpperCase();

    if (cart.length === 0) {

        document.getElementById("coupon-message").textContent =
            "Add items to cart first.";

    } else if (code === "SAVE10") {

        appliedCoupon = code;

        document.getElementById("coupon-message").textContent =
            "10% discount applied!";

    } else if (code === "SAVE25") {

        appliedCoupon = code;

        document.getElementById("coupon-message").textContent =
            "25% discount applied!";

    } else {

        appliedCoupon = "";

        document.getElementById("coupon-message").textContent =
            "Invalid coupon code.";
    }

    updateCart();
});


// Checkout

document.getElementById("checkout-button").addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

    } else {

        let total = 0;

        for (let i = 0; i < cart.length; i++) {

            total += cart[i].price * cart[i].quantity;
        }

        document.getElementById("checkout-summary").textContent =
            "Your Final Total: " + formatPrice(total - discount);

        document.getElementById("checkout-modal").style.display = "flex";
    }
});


// Close Checkout

document.getElementById("close-checkout").addEventListener("click", function () {

    document.getElementById("checkout-modal").style.display = "none";
});


// Place Order

document.getElementById("checkout-form").addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.getElementById("customer-name").value;

    alert("Thank you " + name + "! Your order has been placed.");

    cart = [];

    appliedCoupon = "";

    updateCart();

    document.getElementById("checkout-form").reset();

    document.getElementById("coupon-code").value = "";

    document.getElementById("coupon-message").textContent = "";

    document.getElementById("checkout-modal").style.display = "none";
});


// Change Theme

document.getElementById("theme-change").addEventListener("click", function () {

    document.body.classList.toggle("grey-theme");
});

updateCart();
