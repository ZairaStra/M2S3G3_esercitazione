const blueButton = document.getElementById("blueButton");
console.log(blueButton);
const greyButton = document.getElementById("greyButton");
console.log(greyButton);
const row = document.getElementById("row");
console.log(row);
const inputArea = document.getElementById("inputArea");
console.log(inputArea);
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

        //il titolo deve essere contenuto in un'ancora che lo trasforma in link per essere cliccabile
        // e rimandare alla pagina dettaglio che cambia al cambiare del link cliccato
        // tramite l'id della foto estratto col metodo params
        //const id= new URLSearchParams (window.location.search).get("photoId")
        //RICORDATI che cambia il link da usare nel nuovo fetch
        // in documentazione va preso il link per "Get a photo"
        //"https://api.pexels.com/v1/photos/" + id"
        //aggiungendogli l'id cercato
        //nel nuovo fetch va SEMPRE specificata l'autorizzazione
        const title = document.createElement("h5");
        title.className = "card-title";
        title.innerHTML = `<a href="./details.html?photoId=${photo.id}">${photo.photographer}</a>`;

        const text = document.createElement("p");
        text.className = "card-text";
        text.textContent = photo.alt;

        const flex = document.createElement("div");
        flex.className = "d-flex justify-content-between align-items-center";

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        const modalFade = document.createElement("div");
        modalFade.className = "modal fade";

        const modalDialog = document.createElement("div");

        const modalContent = document.createElement("div");

        const modalBody = document.createElement("div");

        const modalImg = document.createElement("img");
        modalImg.className = "bd-placeholder-img card-img-top";
        modalImg.src = photo.src.original;
        modalImg, (alt = photo.alt);

        modalBody.appendChild(modalImg);

        const modalFooter = document.createElement("div");

        const modalBtn = document.createElement("button");
        modalBtn.innerText = "Close";
        modalBtn.className = "btn-close";

        modalFooter.appendChild(modalBtn);

        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);

        modalFade.appendChild(modalDialog);

        const viewBtn = document.createElement("button");
        viewBtn.className = "btn btn-sm btn-outline-secondary";
        viewBtn.setAttribute("data-bs-toggle", "modal");
        viewBtn.setAttribute("data-bs-target", "modalFade");

        viewBtn.textContent = "View";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-outline-secondary";
        editBtn.textContent = "Hide";

        btnGroup.appendChild(viewBtn);
        btnGroup.appendChild(editBtn);

        const num = document.createElement("small");
        num.className = "text-muted";
        num.innerText = photo.id;

        flex.appendChild(btnGroup);
        flex.appendChild(num);

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(flex);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);
        editBtn.addEventListener("click", () => col.remove());
        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

blueButton.addEventListener("click", () => fetchImages("seasides"));

greyButton.addEventListener("click", () => fetchImages("flowers"));

/* inputArea.onchange((e) => fetchImages(e.target.value)); */
inputArea.onchange = function (e) {
  fetchImages(e.target.value);
};
