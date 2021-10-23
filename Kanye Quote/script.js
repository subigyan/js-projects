const quote = document.getElementById("quote");
const qtBtn = document.getElementById("btn");

getQuote();

function getQuote() {
  fetch("https://api.kanye.rest/")
    .then((res) => res.json())
    .then((data) => {
      quote.innerText = data.quote;
      // quote.classList.add("pre-animation");
      // setTimeout(function () {
      //   quote.classList.remove("pre-animation");
      // }, 100);
    });
}

qtBtn.addEventListener("click", getQuote);
