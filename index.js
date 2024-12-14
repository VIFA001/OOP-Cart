const CART_ITEMS_CONTAINER = document.getElementById("cart-items-container");
const TOTAL_COST_TEXT = document.getElementById("total-cost");

//product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

//a cart item constructor inheriting properties from the product class
class CartItem extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price, quantity);
    this.quantity = quantity;
  }

  // a method to calculate the cost of each item on the cart
  calculateCartItem() {
    return this.price * this.quantity;
  }
}

//A class to store all the shopping cart items
class ShoppingCart {
  constructor(userShoppingCart) {
    this.userShoppingCart = userShoppingCart;
  }
  // a method to display all items in the cart
  displayShoppingCartItems() {
    let userProducts = this.userShoppingCart.map((item) => {
      return ` <div class="flex justify-between border-b">
          <div>
            <h1 class="text-2xl font-semibold text-gray-400">${item.name}</h1>
            <button
            id=${item.id}
              class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer my-2 delete--btn"
            >
              <i class="bi bi-trash"></i>
            </button>
            <h4>${item.calculateCartItem()}</h4>
          </div>

          <div>
            <h3 class="text-2xl font-semibold">${item.price}</h3>
            <div class="flex gap-4 items-center">
              <button
              id=${item.id}
                class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer increase--btn"
              >
                <i class="bi bi-plus"></i>
              </button>
              <p>${item.quantity}</p>
              <button
              id=${item.id}
                class="bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer decrease--btn"
              >
                <i class="bi bi-dash"></i>
              </button>
            </div>
          </div>
        </div>`;
    });

    CART_ITEMS_CONTAINER.innerHTML = userProducts.join("");
    //targeting all the buttons with the class of increase-btn
    const INCREASE_BTN = document.querySelectorAll(".increase--btn");
    //targeting all the buttons with the class of decrease-btn
    const DECREASE_BTN = document.querySelectorAll(".decrease--btn");

    //targeting all the buttons with the class of delete-btn
    const DELETE_BTN = document.querySelectorAll(".delete--btn");

    console.log(DELETE_BTN);

    INCREASE_BTN.forEach((value) => {
      //getting the value of the id attribute of each of the button
      let id_of_product = value.getAttribute("id");
      //adding a click event on each of the increase--btn button
      value.addEventListener("click", () =>
        this.increaseCartItems(id_of_product)
      );
    });
    //******
    DECREASE_BTN.forEach((value) => {
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () =>
        this.decreaseCartItems(id_of_product)
      );
    });
    //*****

    DELETE_BTN.forEach((value) => {
      let id_of_product = value.getAttribute("id");
      value.addEventListener("click", () => this.deleteCartItem(id_of_product));
    });
  }

  // a method to increase the quality of an item
  increaseCartItems(id_of_product) {
    //use the .forEach array method to go through all the products the user has in his cart
    this.userShoppingCart.forEach((item) => {
      //check if any product in the user shopping cart matchhes the id attribute of the product that is clicked
      if (item.id === id_of_product) {
        //increase the quantity of that product by 1
        item.quantity = item.quantity + 1;
      }
    });
    //then redisplay the product again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalCostOfItemsInCart();
  }
  //***
  decreaseCartItems(id_of_product) {
    //use the .forEach array method to go through all the products the user has in his cart
    this.userShoppingCart.forEach((item) => {
      //check if any product in the user shopping cart matchhes the id attribute of the product that is clicked
      if (item.id === id_of_product && item.quantity > 1) {
        //subtract the quantity of that product by 1
        item.quantity = item.quantity - 1;
      }
    });
    //then redisplay the product again with the updated quantity
    this.displayShoppingCartItems();
    this.calculateTotalCostOfItemsInCart();
  }
  //****
  //a method for deleting a cart item
  deleteCartItem(id_of_product) {
    //use the filter method to remove the product that has the id that is clicked
    let itemsLeftInCart = this.userShoppingCart.filter(
      (item) => item.id !== id_of_product
    );

    this.userShoppingCart = itemsLeftInCart;
    this.displayShoppingCartItems();
    this.calculateTotalCostOfItemsInCart();
  }
  // A methodto calculate the total cost of product in the cart
  calculateTotalCostOfItemsInCart() {
    let total = 0;
    this.userShoppingCart.forEach((item) => {
      //this calc runs from left to right
      total = total + item.price * item.quantity;
    });

    TOTAL_COST_TEXT.innerText = total;
  }
}

const cart = new ShoppingCart([
  new CartItem("1", "Iphone", 2000, 1),
  new CartItem("2", "Samsung", 4000, 1),
  new CartItem("3", "Techno", 1000, 1),
  new CartItem("4", "itel", 1000, 1),
]);

cart.displayShoppingCartItems();
cart.calculateTotalCostOfItemsInCart();
