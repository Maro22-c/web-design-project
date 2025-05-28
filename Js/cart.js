document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button[data-title]");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      if (!window.Auth.isSignedIn()) {
        alert("Please sign in before adding to cart.");
        return;
      }

      const title = this.dataset.title;
      const price = this.dataset.price;
      const user = window.Auth.getCurrentUser();
      const carts = window.Auth.getCarts();

      if (!carts[user]) {
        carts[user] = [];
      }

      carts[user].push({ title, price });
      localStorage.setItem("carts", JSON.stringify(carts));

      alert(`${title} added to cart.`);
    });
  });
});
