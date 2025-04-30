const blueButton = document.getElementById("blueButton");
console.log(blueButton);
const greyButton = document.getElementById("greyButton");
console.log(greyButton);
const row = document.getElementById("row");
console.log(row);
const apiK = "LUcqh2I7a9khZ240C17ghyu1g2NRNTFejGHX2z5kWxZDFK6nuR2tQUYr";

const fetchImages = (query) => {
  fetch("https://api.pexels.com/v1/search?query=" + query, {
    headers: {
      Authorization: apiK,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta");
      }
      return response.json();
    })
    .then((data) => {
      row.innerHTML = "";

      data.photos.forEach((photo) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        const img = document.createElement("img");
        img.className = "bd-placeholder-img card-img-top";
        img.src = photo.src.medium;
        img, (alt = photo.alt);

        card.appendChild(img);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = photo.photographer;

        const text = document.createElement("p");
        text.className = "card-text";
        text.textContent = photo.alt;

        const flex = document.createElement("div");
        flex.className = "d-flex justify-content-between align-items-center";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const viewBtn = document.createElement("button");
        viewBtn.className = "btn btn-sm btn-outline-secondary";
        viewBtn.textContent = "View";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-outline-secondary";
        editBtn.textContent = "Edit";

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

        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

blueButton.addEventListener("click", () => fetchImages("seasides"));

greyButton.addEventListener("click", () => fetchImages("flowers"));
