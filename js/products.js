let filter_col = document.querySelector("#filter-col");

document
  .querySelector("#filter-toggle")
  .addEventListener("click", () => filter_col.classList.toggle("active"));

document
  .querySelector("#filter-close")
  .addEventListener("click", () => filter_col.classList.toggle("active"));

// ======

// const shopNowButtons = document.querySelectorAll(".btn-shop-now");

const product_list = document.querySelector("#products");

fetch("http://localhost:8080/api/product")
  .then((response) => response.json())
  .then((data) => {
    renderProducts(data);
    // console.log(data);
  })
  .catch((error) => console.error(error));
const renderProducts = (products) => {
  products.forEach((e) => {
    let prod = `
        <div class="col-4 col-md-6 col-sm-12">
            <div class="product-card">
                <div class="product-card-img">
                    <img src="${e.image}" alt="${e.name}">
                </div>
                <div class="product-card-info">
                    <div class="product-btn">
                        <a href="./product-detail.html" class="btn-flat btn-hover btn-shop-now" data-product-id="${
                          e.id
                        }">shop now</a>
                        <button class="btn-flat btn-hover btn-cart-add">
                            <i class='bx bxs-cart-add'></i>
                        </button>
                        <button class="btn-flat btn-hover btn-cart-add">
                            <i class='bx bxs-heart'></i>
                        </button>
                    </div>
                    <div class="id" style="display:none"> ${e.id} </div>
                    <div class="product-card-name">
                        ${e.name}
                    </div>
                    <div class="product-card-price">
                        <span>$${e.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
      `;
    product_list.insertAdjacentHTML("beforeend", prod);
  });

  const shopNowButtons = document.querySelectorAll(".btn-shop-now");
  // console.log(shopNowButtons);
  shopNowButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      // event.preventDefault();
      const productId = event.target.dataset.productId;
      try {
        if (localStorage.getItem("productId") != null) {
          localStorage.removeItem("productId");
        }
        localStorage.setItem("productId", String(productId));
        console.log(localStorage.getItem("productId"));
      } catch (error) {
        console.error(error);
      }
    });
  });
};
