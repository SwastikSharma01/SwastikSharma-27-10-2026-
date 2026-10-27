let vehicles = [
    {
        name: "Tesla Model 3",
        type: "Electric sedan",
        price: 42000,
        fuel: "Electric",
        transmission: "Automatic",
        range: "358 mi",
        care: "Low",
        origin: "USA",
        seats: "5 seats",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "BMW X5",
        type: "Luxury SUV",
        price: 76000,
        fuel: "Diesel",
        transmission: "Automatic",
        range: "540 mi",
        care: "Medium",
        origin: "Germany",
        seats: "7 seats",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Honda Civic",
        type: "Compact car",
        price: 28000,
        fuel: "Petrol",
        transmission: "Manual",
        range: "420 mi",
        care: "Medium",
        origin: "Japan",
        seats: "5 seats",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Ford Mustang",
        type: "Sports coupe",
        price: 61000,
        fuel: "Petrol",
        transmission: "Automatic",
        range: "390 mi",
        care: "Medium",
        origin: "USA",
        seats: "4 seats",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Mercedes C-Class",
        type: "Executive sedan",
        price: 52000,
        fuel: "Petrol",
        transmission: "Automatic",
        range: "470 mi",
        care: "Medium",
        origin: "Germany",
        seats: "5 seats",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Kawasaki Ninja",
        type: "Sport bike",
        price: 18000,
        fuel: "Petrol",
        transmission: "6-speed",
        range: "210 mi",
        care: "Medium",
        origin: "Japan",
        seats: "1 seat",
        image: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Royal Enfield Classic",
        type: "Cruiser bike",
        price: 22000,
        fuel: "Petrol",
        transmission: "5-speed",
        range: "300 mi",
        care: "Low",
        origin: "India",
        seats: "2 seats",
        image: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Audi Q7",
        type: "Premium SUV",
        price: 69000,
        fuel: "Diesel",
        transmission: "Automatic",
        range: "595 mi",
        care: "Medium",
        origin: "Germany",
        seats: "7 seats",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Porsche 911",
        type: "Performance coupe",
        price: 98000,
        fuel: "Petrol",
        transmission: "Automatic",
        range: "360 mi",
        care: "High",
        origin: "Germany",
        seats: "4 seats",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80"
    },
    {
        name: "Hyundai Creta",
        type: "Compact SUV",
        price: 25000,
        fuel: "Petrol",
        transmission: "Automatic",
        range: "500 mi",
        care: "Low",
        origin: "South Korea",
        seats: "5 seats",
        image: "https://images.unsplash.com/photo-1552519507-88aa2dfa9fdb?auto=format&fit=crop&w=900&q=80"
    }
];

let output = "";

vehicles.forEach(function (v) {
    output += `
        <div class="card">
            <img class="card-image" src="${v.image}" alt="${v.name}">
            <h2>${v.name}</h2>
            <p><strong>Vehicle type:</strong> ${v.type}</p>
            <p class="price">₹${v.price}</p>
            <p><strong>Fuel:</strong> ${v.fuel}</p>
            <p><strong>Transmission:</strong> ${v.transmission}</p>
            <p><strong>Range:</strong> ${v.range}</p>
            <p><strong>Care level:</strong> ${v.care}</p>
            <p><strong>Origin:</strong> ${v.origin}</p>
            <p><strong>Seats:</strong> ${v.seats}</p>

            <div class="quantity-control">
                <button class="quantity-minus">−</button>
                <span class="quantity">1</span>
                <button class="quantity-plus">+</button>
            </div>

            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;
});

document.getElementById("products").innerHTML = output;

let cart = {};

function updateCart() {
    let items = Object.values(cart);
    let count = items.reduce((sum, item) => sum + item.quantity, 0);
    let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById("cart-count").textContent = count;

    document.getElementById("empty-cart").disabled = items.length === 0;

    document.getElementById("cart-items").innerHTML = items.length
        ? items.map(item => `
            <div class="cart-item">
                <span>${item.name} — ₹${item.price * item.quantity}</span>

                <div class="cart-item-controls">
                    <button data-action="decrease" data-name="${item.name}">−</button>
                    <span>${item.quantity}</span>
                    <button data-action="increase" data-name="${item.name}">+</button>
                    <button class="remove-item" data-action="remove" data-name="${item.name}">Remove</button>
                </div>
            </div>
        `).join("")
        : "Your cart is empty.";

    document.getElementById("cart-total").textContent = `Total: ₹${total}`;
}

document.getElementById("empty-cart").addEventListener("click", function () {
    cart = {};
    updateCart();
});

document.getElementById("cart-items").addEventListener("click", function (event) {
    let button = event.target.closest("button[data-action]");

    if (!button) return;

    let name = button.dataset.name;
    let item = cart[name];

    if (!item) return;

    if (button.dataset.action === "increase") {
        item.quantity++;
    }

    if (button.dataset.action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            delete cart[name];
        }
    }

    if (button.dataset.action === "remove") {
        delete cart[name];
    }

    updateCart();
});

document.querySelectorAll(".card").forEach(function (card, index) {
    let quantity = 1;
    let quantityDisplay = card.querySelector(".quantity");

    card.querySelector(".quantity-plus").addEventListener("click", function () {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    card.querySelector(".quantity-minus").addEventListener("click", function () {
        quantity = Math.max(1, quantity - 1);
        quantityDisplay.textContent = quantity;
    });

    card.querySelector(".add-to-cart").addEventListener("click", function (event) {
        let vehicle = vehicles[index];

        if (cart[vehicle.name]) {
            cart[vehicle.name].quantity += quantity;
        } else {
            cart[vehicle.name] = {
                name: vehicle.name,
                price: vehicle.price,
                quantity: quantity
            };
        }

        event.currentTarget.classList.add("added");
        event.currentTarget.textContent = "Add More";

        updateCart();
    });
});

let themeButton = document.getElementById("theme-change");

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("grey-theme");
    });
}

