const id = new URLSearchParams(window.location.search).get("photoId");
console.log(id);
const apiK = "LUcqh2I7a9khZ240C17ghyu1g2NRNTFejGHX2z5kWxZDFK6nuR2tQUYr";

fetch("https://api.pexels.com/v1/photos/" + id, {
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
  .then((detail) => {
    document.body.style.backgroundColor = detail.avg_color;
    const body = document.querySelector("body");
    const container = document.getElementById("details-content");

    const title = document.createElement("h1");
    title.className = "card-title";
    title.innerText = detail.photographer;

    const img = document.createElement("img");
    img.src = detail.src.original;
    img.style.width = "500px";
    img.style.maxWidth = "100%";

    const anchor = document.createElement("a");
    anchor.className = "text-white";
    anchor.href = detail.photographer_url;
    anchor.innerText = "Author's page";

    backBtn = document.createElement("a");
    backBtn.className = "sticky-top my-3 btn btn-danger";
    backBtn.href = "./";
    backBtn.innerText = "Go back to Homepage";

    body.appendChild(backBtn);

    container.appendChild(title);
    container.appendChild(img);
    container.appendChild(anchor);
  });
