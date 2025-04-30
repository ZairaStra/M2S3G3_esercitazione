const seasidesBtn = document.getElementById("seasidesBtn");
const flowersBtn = document.getElementById("flowersBtn");
const row = document.getElementById("row");

const fetchImgs = (query) => {
  fetch(`https://api.pexels.com/v1/search?query=${query}`, { headers: { Authorization: "LUcqh2I7a9khZ240C17ghyu1g2NRNTFejGHX2z5kWxZDFK6nuR2tQUYr" } })
    .then((resp) => {
      /* if (!resp.ok) {
          throw new Error("Link non valido");
        } else if (resp.status >= 500) {
          throw new Error("Errore di gestione serve");
        }
        throw new Error("Errore nella fetch");
        } */
      return resp.json();
    })

    .then((data) => {
      data.photos.forEach((photo) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const img = document.createElement("img");
        img.src = photo.src.medium;
        img.className = "bd-placeholder-img card-img-top";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.innerText = photo.photographer;
        title.className = "card-title";

        const text = document.createElement("p");
        text.innerText = "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer";
        text.className = "card-text";

        const flex = document.createElement("div");
        flex.className = "d-flex justify-content-between align-items-center";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const viewBtn = document.createElement("button");
        viewBtn.className = "btn btn-sm btn-outline-secondary";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-outline-secondary";

        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(editBtn);

        const time = document.createElement("small");
        time.className = "text-muted";
        time.innerText = "9mins";

        flex.appendChild(btnGroup);
        flex.appendChild(time);

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(flex);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        col.appendChild(row);
      });
    })

    .catch((error) => {
      console.log("Errore di caricamento", error);
    });
};

seasidesBtn.addEventListener("click", () => fetchImgs("seasides"));

seasidesBtn.addEventListener("click", () => fetchImgs("flowers"));
