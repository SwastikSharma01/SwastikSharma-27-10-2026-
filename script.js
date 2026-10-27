let vehicles = [
    { name: "Tesla Model 3", type: "Electric Sedan", price: 6000000, fuel: "Electric", transmission: "Automatic", range: "576 km", care: "Medium", origin: "USA", seats: "5 seats", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80" },
    { name: "BMW X5", type: "Luxury SUV", price: 9690000, fuel: "Petrol/Diesel", transmission: "Automatic", range: "540 mi", care: "High", origin: "Germany", seats: "5 seats", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80" },
    { name: "Honda Civic", type: "Compact Sedan", price: 2500000, fuel: "Petrol", transmission: "Automatic", range: "420 mi", care: "Medium", origin: "Japan", seats: "5 seats", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80" },
    { name: "Ford Mustang", type: "Sports Coupe", price: 8000000, fuel: "Petrol", transmission: "Automatic", range: "390 mi", care: "High", origin: "USA", seats: "4 seats", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80" },
    { name: "Mercedes-Benz C-Class", type: "Luxury Sedan", price: 7000000, fuel: "Petrol", transmission: "Automatic", range: "470 mi", care: "High", origin: "Germany", seats: "5 seats", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80" },
    { name: "Kawasaki Ninja ZX-10R", type: "Superbike", price: 2000000, fuel: "Petrol", transmission: "6-speed", range: "210 mi", care: "High", origin: "Japan", seats: "2 seats", image: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=900&q=80" },
    { name: "Royal Enfield Classic 350", type: "Cruiser Bike", price: 189000, fuel: "Petrol", transmission: "5-speed", range: "300 km", care: "Low", origin: "India", seats: "2 seats", image: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=900&q=80" },
    { name: "Audi Q7", type: "Luxury SUV", price: 9229000, fuel: "Petrol", transmission: "Automatic", range: "595 mi", care: "High", origin: "Germany", seats: "7 seats", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80" },
    { name: "Porsche 911", type: "Sports Car", price: 20000000, fuel: "Petrol", transmission: "Automatic", range: "360 mi", care: "High", origin: "Germany", seats: "4 seats", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80" },
    { name: "Hyundai Creta", type: "Compact SUV", price: 1500000, fuel: "Petrol/Diesel", transmission: "Manual/Automatic", range: "500 km", care: "Low", origin: "South Korea", seats: "5 seats", image: "https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?auto=format&fit=crop&w=900&q=80" }
];

let cart = {};
let discount = 0;
let appliedCoupon = "";

function formatPrice(price) {
    if (price === 0) return "₹0";
    if (price >= 10000000) return "₹" + (price / 10000000).toFixed(2) + " Cr";
    return "₹" + (price / 100000).toFixed(2) + " Lakh";
}

function displayVehicles() {
    let output = "";

    vehicles.forEach(function (vehicle, index) {
        output +=
            '<div class="card">' +
            '<img class="card-image" src="' + vehicle.image + '" alt="' + vehicle.name + '">' +
            '<h2>' + vehicle.name + '</h2>' +
            '<p>Vehicle type: ' + vehicle.type + '</p>' +
            '<p class="price">' + formatPrice(vehicle.price) + '</p>' +
            '<p>Fuel: ' + vehicle.fuel + '</p>' +
            '<p>Transmission: ' + vehicle.transmission + '</p>' +
            '<p>Range: ' + vehicle.range + '</p>' +
            '<p>Care level: ' + vehicle.care + '</p>' +
            '<p>Origin: ' + vehicle.origin + '</p>' +
            '<p>Seats: ' + vehicle.seats + '</p>' +
            '<div class="quantity-control">' +
            '<button class="quantity-minus">−</button>' +
            '<span class="quantity">1</span>' +
            '<button class="quantity-plus">+</button>' +
            '</div>' +
            '<button class="add-to-cart" data-index="' + index + '">Add to Cart</button>' +
            '</div>';
    });

    document.getElementById("products").innerHTML = output;
}

function updateCart() {
    let items = Object.values(cart);

    let count = 0;
    let subtotal = 0;

    items.forEach(function (item) {
        count += item.quantity;
        subtotal += item.price * item.quantity;
    });

    if (appliedCoupon === "SAVE10") {
        discount = subtotal * 0.10;
    } else if (appliedCoupon === "SAVE500") {
        discount = Math.min(500, subtotal);
    } else {
        discount = 0;
    }

    document.getElementById("cart-count").textContent = count;
    document.getElementById("empty-cart").disabled = items.length === 0;

    let cartHTML = "";

    items.forEach(function (item) {
        cartHTML +=
            '<div class="cart-item">' +
            '<span>' + item.name + ' × ' + item.quantity + '</span>' +
            '<span>' + formatPrice(item.price * item.quantity) + '</span>' +
            '<div class="cart-item-controls">' +
            '<button data-action="decrease" data-name="' + item.name + '">−</button>' +
            '<button data-action="increase" data-name="' + item.name + '">+</button>' +
            '<button data-action="remove" data-name="' + item.name + '">Remove</button>' +
            '</div></div>';
    });

    document.getElementById("cart-items").innerHTML =
        cartHTML || "Your cart is empty.";

    document.getElementById("cart-total").textContent =
        "Subtotal: " + formatPrice(subtotal);

    document.getElementById("discount").textContent =
        formatPrice(discount);

    document.getElementById("final-total").textContent =
        formatPrice(subtotal - discount);
}

displayVehicles();

document.getElementById("products").addEventListener("click", function (event) {
    let card = event.target.closest(".card");
    if (!card) return;

    let quantityDisplay = card.querySelector(".quantity");
    let quantity = Number(quantityDisplay.textContent);

    if (event.target.classList.contains("quantity-plus")) {
        quantityDisplay.textContent = quantity + 1;
    }

    if (event.target.classList.contains("quantity-minus")) {
        quantityDisplay.textContent = Math.max(1, quantity - 1);
    }

    if (event.target.classList.contains("add-to-cart")) {
        let vehicle = vehicles[event.target.dataset.index];
        let amount = Number(quantityDisplay.textContent);

        if (cart[vehicle.name]) {
            cart[vehicle.name].quantity += amount;
        } else {
            cart[vehicle.name] = {
                name: vehicle.name,
                price: vehicle.price,
                quantity: amount
            };
        }

        event.target.textContent = "Add More";
        event.target.classList.add("added");

        updateCart();
    }
});

document.getElementById("cart-items").addEventListener("click", function (event) {
    let action = event.target.dataset.action;
    let name = event.target.dataset.name;

    if (!action || !cart[name]) return;

    if (action === "increase") {
        cart[name].quantity++;
    } else if (action === "decrease") {
        cart[name].quantity--;

        if (cart[name].quantity === 0) {
            delete cart[name];
        }
    } else if (action === "remove") {
        delete cart[name];
    }

    updateCart();
});

document.getElementById("empty-cart").addEventListener("click", function () {
    cart = {};
    appliedCoupon = "";
    document.getElementById("coupon-code").value = "";
    document.getElementById("coupon-message").textContent = "";
    updateCart();

    document.querySelectorAll(".add-to-cart").forEach(function (button) {
        button.textContent = "Add to Cart";
        button.classList.remove("added");
    });
});

document.getElementById("apply-coupon").addEventListener("click", function () {
    let code = document.getElementById("coupon-code").value.trim().toUpperCase();
    let message = document.getElementById("coupon-message");

    if (Object.keys(cart).length === 0) {
        message.textContent = "Add a vehicle to your cart first.";
    } else if (code === "SAVE10") {
        appliedCoupon = code;
        message.textContent = "10% discount applied!";
    } else if (code === "SAVE500") {
        appliedCoupon = code;
        message.textContent = "₹500 discount applied!";
    } else {
        appliedCoupon = "";
        message.textContent = "Invalid coupon code.";
    }

    updateCart();
});

document.getElementById("checkout-button").addEventListener("click", function () {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let subtotal = 0;

    Object.values(cart).forEach(function (item) {
        subtotal += item.price * item.quantity;
    });

    document.getElementById("checkout-summary").textContent =
        "Subtotal: " + formatPrice(subtotal) +
        " | Discount: " + formatPrice(discount) +
        " | Final Total: " + formatPrice(subtotal - discount);

    document.getElementById("checkout-modal").style.display = "flex";
});

document.getElementById("close-checkout").addEventListener("click", function () {
    document.getElementById("checkout-modal").style.display = "none";
});

document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("customer-name").value;
    let total = 0;

    Object.values(cart).forEach(function (item) {
        total += item.price * item.quantity;
    });

    total -= discount;

    alert("Thank you, " + name + "! Your order total is " + formatPrice(total) + ".");

    cart = {};
    discount = 0;
    appliedCoupon = "";

    updateCart();

    document.getElementById("coupon-code").value = "";
    document.getElementById("coupon-message").textContent = "";
    document.getElementById("checkout-form").reset();
    document.getElementById("checkout-modal").style.display = "none";

    document.querySelectorAll(".add-to-cart").forEach(function (button) {
        button.textContent = "Add to Cart";
        button.classList.remove("added");
    });
});

document.getElementById("theme-change").addEventListener("click", function () {
    document.body.classList.toggle("grey-theme");
});

updateCart();