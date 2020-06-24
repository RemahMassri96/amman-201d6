/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

var processOrder = document.getElementById('processOrder');
processOrder.addEventListener('click', function() {
  cart = new Cart([]);
  cart.saveToLocalStorage();
  renderCart();
})


function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  //
  const tbody = document.getElementsByTagName("tbody")[0];
  const items = cart.items;
  for (var i = 0; i < cart.items.length; i++) {
    const item = cart.items[i];
    const tr = document.createElement("tr");
    const deleteTD = document.createElement("td");
    deleteTD.innerText = "X";
    const imgTd = document.createElement("td");
    const image = document.createElement("img");
    image.src = item.product.filePath;
    const quantityTD = document.createElement("td");
    quantityTD.innerText = item.quantity;
    const nameTD = document.createElement("td");
    nameTD.innerText = item.product.name;

    // add to TR
    tr.appendChild(deleteTD);
    tr.appendChild(quantityTD);
    tr.appendChild(nameTD);
    tr.appendChild(image);
    tr["data-item-index"] = i;
    tbody.appendChild(tr);
  }

}

function removeItemFromCart(event) {
  console.log("remove");
  const td = event.target;
  const tr = td.parentElement;
  const itemIndex = tr["data-item-index"];
  cart.removeItem(itemIndex);
  cart.saveToLocalStorage();
  renderCart();
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
