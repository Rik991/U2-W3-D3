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

        const cardConteiner = document.querySelector(".row");
        card.classList.add("col-6", "col-md-4", "col-lg-3");
        card.innerHTML = `<div class="card">
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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getInfo();
