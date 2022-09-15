const items = [
    {
        name: "Vintage Backbag",
        price: 2598 / 100,
        quantity: 1,
    },
    {
        name: "Levi Shoes",
        price: 4599 / 100,
        quantity: 1,
    },
    {
        name: "Antique Clock",
        price: 7499 / 100,
        quantity: 1,
    },
];

const itemNames = items.map((x) => x.name);

let subtotalText = document.querySelector("#cart-subtotal").childNodes[3];
let taxText = document.querySelector("#cart-tax").childNodes[3];
let shippingText = document.querySelector("#cart-shipping").childNodes[3];
let totalText = document.querySelector("#cart-total").childNodes[3];

let products = document.querySelector(".products");

products.addEventListener("click", (e) => {
    let productName =
        e.target.parentNode.parentNode.getElementsByTagName("h2")[0]
            .textContent;
    let index = itemNames.indexOf(productName);
    if (e.target.parentNode.className == "quantity-controller") {
        if (e.target.className == "plus") {
            plusCount(e, index);
        } else if (e.target.className == "minus") {
            minusCount(e, index);
        }
        updatePrices();
    } else if (e.target.className == "remove-product") {
        removeItem(index);
        updatePrices();
    }
});

updatePrices();

function plusCount(e, index) {
    items[index].quantity += 1;
    e.target.previousElementSibling.textContent = items[index].quantity;
    e.target.parentNode.parentNode.childNodes[9].textContent = (
        items[index].price * items[index].quantity
    ).toFixed(2);
}

function minusCount(e, index) {
    if (items[index].quantity - 1 == 0) {
        removeItem(index);
    } else {
        items[index].quantity -= 1;
        e.target.nextElementSibling.textContent = items[index].quantity;
        e.target.parentNode.parentNode.childNodes[9].textContent = (
            items[index].price * items[index].quantity
        ).toFixed(2);
    }
}

function removeItem(index) {
    if (confirm("Product will be removed")) {
        items.splice(index, 1);
        itemNames.splice(index, 1);
        document.querySelectorAll(".product")[index].remove();
    }
}

function updatePrices() {
    let subtotal = items.reduce((acc, x) => acc + x.price * x.quantity, 0);
    subtotalText.textContent = subtotal.toFixed(2);
    let tax = (subtotal * 18) / 100;
    taxText.textContent = tax.toFixed(2);
    let shipping = items.length > 0 ? 15 : 0;
    shippingText.textContent = shipping.toFixed(2);
    let total = subtotal + tax + shipping;
    totalText.textContent = total.toFixed(2);
}
