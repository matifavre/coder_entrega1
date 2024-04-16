const socket = io();
socket.on("products", (data) => {
  //console.log(data) const
  template = data
    .map(
      (each) => ` <img style="width: 30%; height: 30%"
  src="${each.photo}" class="object-fit-cover" alt="${each.id}"> `
    )
    .reverse()
    .splice(0, 4)
    .join("");
  document.querySelector("#products").innerHTML = template;
});

document.querySelector("#create").addEventListener("click", (event) => {
  const title = document.querySelector("#prod-title").value;
  const category = document.querySelector("#category").value;
  const image = document.querySelector("#prod-image").value;
  const price = document.querySelector("#prod-price").value;
  const stock = document.querySelector("#prod-stock").value;
  socket.emit("create", { title, category, image, price, stock });
});
