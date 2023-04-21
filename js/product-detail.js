const product_list = document.querySelector("#related-products");

const renderProducts = (products) => {
  products.forEach((product) => {
    const productCard = `
      <div class="col-4 col-md-6 col-sm-12">
        <div class="product-card">
          <div class="product-card-img">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-card-info">
            <div class="product-btn">
              <a href="./product-detail.html" class="btn-flat btn-hover btn-shop-now">shop now</a>
              <button class="btn-flat btn-hover btn-cart-add">
                <i class='bx bxs-cart-add'></i>
              </button>
              <button class="btn-flat btn-hover btn-cart-add">
                <i class='bx bxs-heart'></i>
              </button>
            </div>
            <div class="product-card-name">
             ${product.id}. ${product.name}
            </div>
            <div class="product-card-price">
              <span><del>${product.price}</del></span>
              <span class="curr-price">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    console.log(id);
    product_list.insertAdjacentHTML("beforeend", productCard);
  });
};

const productId = localStorage.getItem("productId");

// Gọi API để lấy thông tin sản phẩm với id tương ứng
fetch(`http://localhost:8080/api/product/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    // Thêm các thông tin về sản phẩm vào trang HTML
    const productName = document.querySelector(".product-info h1");
    productName.textContent = data.name;

    const productBrand = document.querySelector(".product-info-detail a");
    productBrand.textContent = data.category.name;

    const productDescription = document.querySelector(".product-description");
    productDescription.textContent = data.description;

    const productPrice = document.querySelector(".product-info-price");
    productPrice.textContent = `$${data.price}`;

    const productImage = document.querySelector("#product-img img");
    productImage.src = data.image;
    ///////////////////////////////////////////

    // Thêm sự kiện click vào nút "add to cart"
    const addToCartButton = document.querySelector(".btn-flat");
    addToCartButton.addEventListener("click", () => {
      const quantity = document.querySelector(".product-quantity").textContent;
      alert(`Đã thêm ${quantity} sản phẩm "${data.name}" vào giỏ hàng.`);
    });
  })
  .catch((error) => console.error(error));
//===========
// Lấy các phần tử HTML cần thiết
const quantityBtnPlus = document.querySelector(".bx-plus");
const quantityBtnMinus = document.querySelector(".bx-minus");
const addToCartBtn = document.querySelector(".btn-flat.btn-hover");

// Lấy token của người dùng
const data = JSON.parse(localStorage.getItem("data"));
console.log(data.token);

// Thêm sự kiện click vào nút "add to cart"
addToCartBtn.addEventListener("click", () => {
  // Lấy thông tin sản phẩm
  const productId = localStorage.getItem("productId");
  const quantity = parseInt(
    document.querySelector(".product-quantity").textContent
  );

  // Gửi yêu cầu POST đến API để thêm sản phẩm vào giỏ hàng
  fetch(
    `http://localhost:8080/api/cart/add-item?product-id=${productId}&quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    }
  )
    .then((response) => {
      // Xử lý kết quả trả về từ API
      if (response.ok) {
        console.log("Sản phẩm đã được thêm vào giỏ hàng");
      } else {
        console.log("Đã có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng");
      }
    })
    .catch((error) => {
      // Xử lý lỗi (nếu có)
      console.log(error);
    });
});

// Thêm sự kiện click vào nút "plus" để tăng số lượng sản phẩm
quantityBtnPlus.addEventListener("click", () => {
  const quantityElement = document.querySelector(".product-quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;
});

quantityBtnMinus.addEventListener("click", () => {
  const quantityElement = document.querySelector(".product-quantity");
  let quantity = parseInt(quantityElement.textContent);
  if (quantity == 0) return;
  quantity--;

  quantityElement.textContent = quantity;
});
