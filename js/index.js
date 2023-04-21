let slide_index = 0;
let slide_play = true;
let slides = document.querySelectorAll(".slide");

hideAllSlides = () => {
  slides.forEach((e) => {
    e.classList.remove("active");
  });
};

fetch("http://localhost:8080/api/product")
  .then((response) => response.json())
  .then((data) => {
    let product_list = data;
    renderProducts(product_list);
  })
  .catch((error) => console.error(error));

showSlide = () => {
  hideAllSlides();
  slides[slide_index].classList.add("active");
};

nextSlide = () => {
  slide_index = slide_index + 1 === slides.length ? 0 : slide_index + 1;
  showSlide();
};

prevSlide = () => {
  slide_index = slide_index - 1 < 0 ? slides.length - 1 : slide_index - 1;
  showSlide();
};

document
  .querySelector(".slider")
  .addEventListener("mouseover", () => (slide_play = false));

document
  .querySelector(".slider")
  .addEventListener("mouseleave", () => (slide_play = true));

document.querySelector(".slide-next").addEventListener("click", nextSlide);
document.querySelector(".slide-prev").addEventListener("click", prevSlide);

showSlide();

setInterval(() => {
  if (!slide_play) return;
  nextSlide();
}, 3000);

renderProducts = (products) => {
  let product_list = document.querySelector("#latest-products");
  let best_product_list = document.querySelector("#best-products");

  products.forEach((e) => {
    let prod = `
      <div class="col-3 col-md-6 col-sm-12">
        <div class="product-card">
          <div class="product-card-img">
            <img src="${e.image}" alt=""> 

          </div>
          <div class="product-card-info">
            <div class="product-btn">
            <a href="./product-detail.html" class="btn-flat btn-hover btn-shop-now" data-product-id="${e.id}">shop now</a>
              <button class="btn-flat btn-hover btn-cart-add">
                <i class='bx bxs-cart-add'></i>
              </button>
              <button class="btn-flat btn-hover btn-cart-add">
                <i class='bx bxs-heart'></i>
              </button>
            </div>
            <div class="product-card-name">
              ${e.name}
            </div>
            <div class="product-card-price">
              <span><del>${e.old_price}</del></span>
              <span class="curr-price">${e.price}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    product_list.insertAdjacentHTML("beforeend", prod);
    best_product_list.insertAdjacentHTML("afterbegin", prod);
  });
};
const shopNowButtons = document.querySelectorAll("#latest-products");
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

const link = document.querySelector("a[href='./Login.html']");
if (localStorage.getItem("data") !== null) {
  link.setAttribute("href", "./User.html");
}
