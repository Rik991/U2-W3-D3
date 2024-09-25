const apiUrl = "https://striveschool-api.herokuapp.com/books";

const getInfo = () => {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella response dal server!");
      }
    })
    .then((myObject) => {
      console.log(myObject);
      //manipolo il dom
      myObject.forEach((element) => {
        const card = document.createElement("div");
        const totalP = document.createElement("p");
        const cardConteiner = document.querySelector(".row");
        card.classList.add("col-6", "col-md-4", "col-lg-3");
        card.innerHTML = `<div class="card ">
            <img src="${element.img}" class="card-img-top" alt="img" id="apiImg" />
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">€ ${element.price}</p>
              <button class="btn btn-primary">Scarta</button>
              <button class="btn btn-success">Compra Ora</button>
            </div>
          </div>`;
        cardConteiner.appendChild(card);
        const scartBtn = card.querySelector(".btn-primary"); //seleziono il bottone della SINGOLA card
        scartBtn.addEventListener("click", () => {
          card.classList.add("d-none");
        });
        const buyBook = card.querySelector(".btn-success");
        buyBook.addEventListener("click", () => {
          const listItem = document.getElementById("bookList");
          const singleItem = document.createElement("li");
          singleItem.classList.add("list-group", "flex-row", "justify-content-between", "my-2");
          singleItem.innerHTML = `<p class="m-0 border border-info px-3">
          ${element.title} € <span class="price">${element.price}</span>
          </p> <button class="btn btn-danger">Canc</button>`;
          listItem.appendChild(singleItem);
          let totalPrice = 0;
          const total = document.querySelectorAll(".price");
          total.forEach((price) => {
            totalPrice += parseFloat(price.innerText);
          });

          const deleteBtn = singleItem.querySelector(".btn-danger");
          deleteBtn.addEventListener("click", () => {
            singleItem.classList.add("d-none");
          });
          totalP.innerText = `Il totale è: ${totalPrice}`;
          listItem.appendChild(totalP);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getInfo();
