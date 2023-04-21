const data = JSON.parse(localStorage.getItem("data"));
const tableBody = document.querySelector("tbody");

console.log(data.token);
fetch(`http://localhost:8080/api/cart`, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + data.token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const totalPrice = data.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const formattedPrice = "$" + totalPrice.toFixed(2);

    const totalElement = document.querySelector(".total p");
    totalElement.textContent = "Total: " + formattedPrice;
    data.forEach((item, index) => {
      console.log(item);
      const row = document.createElement("tr");
      row.dataset.productId = item.product.id;

      const numCol = document.createElement("td");
      numCol.textContent = index + 1;
      row.appendChild(numCol);
      const nameCol = document.createElement("td");
      nameCol.textContent = item.product.name;
      row.appendChild(nameCol);

      const imageCol = document.createElement("td");
      const image = document.createElement("img");
      image.src = item.product.image;
      image.alt = item.product.name;
      imageCol.appendChild(image);
      row.appendChild(imageCol);

      const quantityCol = document.createElement("td");
      const quantityInput = document.createElement("input");
      quantityInput.classList.add("inputQuanti");
      quantityInput.type = "number";
      quantityInput.dataset.productId = item.product.id;
      quantityInput.value = item.quantity;
      quantityCol.appendChild(quantityInput);
      row.appendChild(quantityCol);

      const priceCol = document.createElement("td");
      priceCol.textContent = `$${item.product.price.toFixed(2)}`;
      row.appendChild(priceCol);

      const totalCol = document.createElement("td");
      totalCol.classList.add("total-col");
      totalCol.textContent = `$${(item.product.price * item.quantity).toFixed(
        2
      )}`;
      row.appendChild(totalCol);

      const actionsCol = document.createElement("td");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");

      deleteBtn.textContent = "Delete";
      actionsCol.appendChild(deleteBtn);
      row.appendChild(actionsCol);
      deleteBtn.addEventListener("click", (event) => {
        const productId = row.dataset.productId; // Lấy ID sản phẩm từ thuộc tính data
        deleteItem(productId); // Gọi hàm xóa sản phẩm
      });
      tableBody.appendChild(row);
    });

    const quantityInputs = document.querySelectorAll(".inputQuanti");
    quantityInputs.forEach((input) => {
      // Xử lý sự kiện khi số lượng sản phẩm thay đổi
      input.addEventListener("change", (event) => {
        const productId = input.dataset.productId; // Lấy ID sản phẩm từ thuộc tính data
        const newQuantity = event.target.value; // Lấy số lượng mới từ giá trị của ô input
        updateQuantity(productId, newQuantity); // Gọi hàm cập nhật số lượng sản phẩm
      });
    });
  })
  .catch((error) => {
    // Xử lý lỗi (nếu có)
    console.log(error);
  });

// Hàm cập nhật số lượng sản phẩm thông qua API

function updateQuantity(productId, newQuantity) {
  const data = JSON.parse(localStorage.getItem("data"));
  const url = `http://localhost:8080/api/cart/update-item?product-id=${productId}&quantity=${newQuantity}`;

  fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      getAll();
    })
    .catch((error) => {
      console.log(error);
    });
}
function getAll() {
  var tbody = document.querySelector("#myTable tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  fetch(`http://localhost:8080/api/cart`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + data.token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const totalPrice = data.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const formattedPrice = "$" + totalPrice.toFixed(2);

      // Hiển thị tổng giá trị lên giao diện
      const totalElement = document.querySelector(".total p");
      totalElement.textContent = "Total: " + formattedPrice;
      data.forEach((item, index) => {
        console.log(item);
        const row = document.createElement("tr");
        row.dataset.productId = item.product.id; // Thêm thuộc tính data để lưu trữ ID sản phẩm
        const numCol = document.createElement("td");
        numCol.textContent = index + 1;
        row.appendChild(numCol);
        const nameCol = document.createElement("td");
        nameCol.textContent = item.product.name;
        row.appendChild(nameCol);
        const imageCol = document.createElement("td");
        const image = document.createElement("img");
        image.src = item.product.image; // Giả sử imageUrl là một thuộc tính của đối tượng sản phẩm
        image.alt = item.product.name;
        imageCol.appendChild(image);
        row.appendChild(imageCol);
        const quantityCol = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.classList.add("inputQuanti");
        quantityInput.type = "number";
        quantityInput.dataset.productId = item.product.id; // Thêm thuộc tính data để lưu trữ ID sản phẩm
        quantityInput.value = item.quantity;
        quantityCol.appendChild(quantityInput);
        row.appendChild(quantityCol);

        const priceCol = document.createElement("td");
        priceCol.textContent = `$${item.product.price.toFixed(2)}`;
        row.appendChild(priceCol);

        const totalCol = document.createElement("td");
        totalCol.classList.add("total-col");
        totalCol.textContent = `$${(item.product.price * item.quantity).toFixed(
          2
        )}`;
        row.appendChild(totalCol);
        const actionsCol = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        actionsCol.appendChild(deleteBtn);
        row.appendChild(actionsCol);
        tableBody.appendChild(row);
      });
      const quantityInputs = document.querySelectorAll(".inputQuanti");
      quantityInputs.forEach((input) => {
        // Xử lý sự kiện khi số lượng sản phẩm thay đổi
        input.addEventListener("change", (event) => {
          const productId = input.dataset.productId; // Lấy ID sản phẩm từ thuộc tính data
          const newQuantity = event.target.value; // Lấy số lượng mới từ giá trị của ô input
          updateQuantity(productId, newQuantity); // Gọi hàm cập nhật số lượng sản phẩm
        });
      });
    })
    .catch((error) => {
      // Xử lý lỗi (nếu có)
      console.log(error);
    });
}

function deleteItem(productId) {
  fetch(`http://localhost:8080/api/cart/delete-item?product-id=${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + data.token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Xóa sản phẩm ra khỏi bảng
      const rowToDelete = document.querySelector(
        `tr[data-product-id="${productId}"]`
      );
      if (rowToDelete) {
        rowToDelete.remove();
      }

      // Cập nhật lại tổng giá trị đơn hàng
      const totalPrice = data.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const formattedPrice = "$" + totalPrice.toFixed(2);
      const totalElement = document.querySelector(".total p");
      totalElement.textContent = "Total: " + formattedPrice;
    })
    .catch((error) => {
      // Xử lý lỗi (nếu có)
      console.log(error);
    });
}
