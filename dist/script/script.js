"use strict";

const config = {
  headers: {
    Authorization:
      "Bearer O7j2mOq7vFMzYHoSqNx22PbgH0d-BGtQX1vvBqNKpTHUooXNjDMRnBiagm72saNCXCtJvAHk9Ec12XYtpldsJHX3L32uJHmnXOV34Bn4nudot0u_nLnSGR8pTPJcZHYx",
    Accept: "application/json",
  },
};

const resultsContainer = document.querySelector(".main__results");

const displayResult = function (result) {
  const resultHTML = ` <a target="_blank" class=main__link href=${result.url}><div class="main__result">
  <div class="main__text">
    <h3 class="main__restaurant-name">${result.name}</h3>
    <p class="main__restaurant-rating">${result.rating}</p>
  </div>
  <div class="main__overlay"></div>
  <img
    src=${result.image_url}
    class="main__result-img"
    alt="test image"
  />
</div>
</a>`;
  resultsContainer.innerHTML += resultHTML;
};

const formEl = document.querySelector(".main__form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = document.getElementById("location").value;
  const cuisine = document.getElementById("cuisine").value;

  resultsContainer.innerHTML = "";
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}`,
      config
    )
    .then((response) => {
      for (let i = 0; i < response.data.businesses.length; i++) {
        if (
          response.data.businesses[i].rating >= 4.5 &&
          response.data.businesses[i].categories[0].title === cuisine
        ) {
          displayResult(response.data.businesses[i]);
          console.log(response.data.businesses[i]);
        }
      }
    });
});
