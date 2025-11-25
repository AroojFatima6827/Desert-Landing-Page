
  const cartItems = document.querySelectorAll('[class^="Items-collection"]');
  const cartCount = document.querySelector(".Cart");
  const cartImage = document.querySelector(".empty-cart");
  const cartText = document.querySelector(".cart-dis");
  const cartTotal = document.querySelector(".cart-total");
  const confirmBtn = document.querySelector(".confirm-order-btn");
  const popup = document.querySelector(".popup");
  const closePopup = document.querySelector(".close-popup");

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.forEach((itemBox) => {
    const addText = itemBox.querySelector("span");
    const icon = itemBox.querySelector("img");

    const priceEl = itemBox.parentElement.querySelector("span[class$='price']");
    const itemPrice = parseFloat(priceEl.textContent.replace("$", ""));

    const quantityWrapper = document.createElement("div");
    quantityWrapper.style.display = "none";
    quantityWrapper.style.justifyContent = "center";
    quantityWrapper.style.alignItems = "center";
    quantityWrapper.style.gap = "15px";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.style.borderRadius = "20px";
    minusBtn.style.backgroundColor = "#A34D36";
    minusBtn.style.border = "none";
    const quantity = document.createElement("span");
    quantity.textContent = "1";
    quantity.style.fontWeight = "bold";


    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.style.borderRadius = "20px";
    plusBtn.style.backgroundColor = "#A34D36";
    plusBtn.style.border = "none";

    [minusBtn, plusBtn].forEach(btn => {
      btn.style.padding = "0.4rem 1rem";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "18px";
    });

    quantityWrapper.append(minusBtn, quantity, plusBtn);
    itemBox.appendChild(quantityWrapper);

    itemBox.addEventListener("click", () => {
      if (addText.style.display !== "none") {
        addText.style.display = "none";
        icon.style.display = "none";
        quantityWrapper.style.display = "flex";
        quantity.textContent = "1";
        totalItems += 1;
        totalPrice += itemPrice;
        updateCart();
      }
    });

    plusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let qty = parseInt(quantity.textContent);
      if (qty < 4) {
        qty += 1;
        quantity.textContent = qty;
        totalItems += 1;
        totalPrice += itemPrice;
        updateCart();
      }
    });

    minusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let qty = parseInt(quantity.textContent);
      if (qty > 1) {
        qty -= 1;
        quantity.textContent = qty;
        totalItems -= 1;
        totalPrice -= itemPrice;
        updateCart();
      } else {
        quantityWrapper.style.display = "none";
        addText.style.display = "inline";
        icon.style.display = "inline";
        totalItems -= 1;
        totalPrice -= itemPrice;
        updateCart();
      }
    });
  });

  function updateCart() {
    cartCount.textContent = `Your Cart (${totalItems})`;
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

    if (totalItems === 0) {
      cartImage.style.display = "block";
      cartText.textContent = "Your added items will appear here";
    } else {
      cartImage.style.display = "none";
      cartText.textContent = "Your items have been added successfully!";
    }
  }

  confirmBtn.addEventListener("click", () => {
    if (totalItems === 0) {
      alert("Your cart is empty!");
      return;
    }
    popup.style.display = "flex";
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
    resetCart();
  });

  function resetCart() {
    totalItems = 0;
    totalPrice = 0;
    cartCount.textContent = "Your Cart (0)";
    cartTotal.textContent = "Total: $0.00";
    cartImage.style.display = "block";
    cartText.textContent = "Your added items will appear here";

    cartItems.forEach((itemBox) => {
      const addText = itemBox.querySelector("span");
      const icon = itemBox.querySelector("img");
      const quantityWrapper = itemBox.querySelector("div:last-child");

      addText.style.display = "inline";
      icon.style.display = "inline";
      if (quantityWrapper && quantityWrapper.style) {
        quantityWrapper.style.display = "none";
        const quantity = quantityWrapper.querySelector("span");
        if (quantity) quantity.textContent = "1";
      }
    });
  }

