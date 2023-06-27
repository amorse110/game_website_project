// GLOBALS
let currentURL;
let currentGame;
// DOM SELECTORS
// const select = document.createElement("select");
const select = document.querySelector("select");
const optionSelect = document.createElement("option");
const optionRPG = document.createElement("option");
const optionShooter = document.createElement("option");
const optionStrategy = document.createElement("option");
const optionFighting = document.createElement("option");
const optionMOBA = document.createElement("option");
const optionSports = document.createElement("option");
const optionRacing = document.createElement("option");
const optionCardGames = document.createElement("option");
const optionFantasy = document.createElement("option");
const gameList = document.querySelector("#game-list");
const dropDownDiv = document.querySelector("#drop-down");
const body = document.querySelector("body");
const form = document.querySelector("#search-form");

// optionSelect.textContent = "Select Genre";
// optionRPG.textContent = "RPG";
// optionShooter.textContent = "Shooter";
// optionStrategy.textContent = "Strategy";
// optionFighting.textContent = "Fighting";
// optionMOBA.textContent = "MOBA";
// optionSports.textContent = "Sports";
// optionRacing.textContent = "Racing";
// optionCardGames.textContent = "Card Games";
// optionFantasy.textContent = "Fantasy";

// select.append(
//   optionSelect,
//   optionRPG,
//   optionShooter,
//   optionStrategy,
//   optionFighting,
//   optionMOBA,
//   optionSports,
//   optionRacing,
//   optionCardGames,
//   optionFantasy
// );
// dropDownDiv.append(select);

//EVENT LISTENERS
// Adding Dropdown filter
select.addEventListener("change", () => {
  if (select.value === "Card Games") {
    currentURL = url + "?category=card";
    gameList.innerHTML = "";
    getGames(url + "?category=card").then((data) => {
      for (let i = 0; i < 18; i++) {
        handleGameList(data[i]);
      }
    });
  } else if (select.value === "RPG") {
    currentURL = url + "?category=mmorpg";
    gameList.innerHTML = "";
    getGames(url + "?category=mmorpg").then((data) => {
      for (let i = 0; i < 18; i++) {
        handleGameList(data[i]);
      }
    });
  } else if (select.value !== "Select Genre") {
    currentURL = url + `?category=${select.value}`;
    gameList.innerHTML = "";
    getGames(url + `?category=${select.value}`).then((data) => {
      for (let i = 0; i < 18; i++) {
        handleGameList(data[i]);
      }
    });
  } else {
    currentURL = url;
    gameList.innerHTML = "";
    getGames(url).then((data) => {
      for (let i = 0; i < 18; i++) {
        handleGameList(data[i]);
      }
    });
  }
});

// const dropdownButtonItems = document.querySelectorAll(".dropdown-button-item");
// dropdownButtonItems.forEach((item) => {
//   item.addEventListener("click", (e) => {
//     console.log(e.target);
//   });
// });

// Adding Search functionality
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#search").value.toLowerCase();
  if (search.trim() !== "") {
    gameList.innerHTML = "";
    getGames(currentURL).then((data) => {
      data.forEach((game) => {
        if (game.title.toLowerCase().includes(search)) {
          handleGameList(game);
        }
      });
    });
  } else if (search.trim() === "") {
    // console.log("hello");
    gameList.innerHTML = "";
    getGames(currentURL).then((data) => {
      data.forEach((game) => {
        handleGameList(game);
      });
    });
  }
});

// FETCHES
const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9109b3aef3msh0b345399a54acabp1648bcjsnf935d43cf3a0",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

function getGames(url) {
  return fetch(url, options).then((res) => res.json());
}

getGames(url).then((data) => {
  currentURL = url;
  for (let i = 0; i < 18; i++) {
    handleGameList(data[i]);
  }
  // addPopUp();
});

// RENDER FUNCTIONS
function handleGameList(game) {
  currentGame = game;
  // console.log(game);
  const div = document.createElement("div");
  const bottomDiv = document.createElement("div");
  const image = document.createElement("img");
  const p = document.createElement("p");
  const h3 = document.createElement("h3");

  image.classList.add("img-fluid");
  p.classList.add("description-wrapper");
  div.classList.add("col-md-4", "col-sm-6", "card");

  h3.textContent = game.title;
  image.src = game.thumbnail;
  p.textContent = game.short_description;
  bottomDiv.textContent = `Publisher: ${game.publisher}`;

  div.addEventListener("mouseenter", (e) => {
    p.classList.remove("description-wrapper");
  });
  div.addEventListener("mouseleave", (e) => {
    p.classList.add("description-wrapper");
  });

  div.append(h3, image, p, bottomDiv);
  gameList.append(div);

  div.addEventListener("click", (e) => {
    let expandedCard = document.createElement("div");
    expandedCard.className = "expanded-card";
    const expandedDiv = document.createElement("div");
    const expandedImage = document.createElement("img");
    const expandedP = document.createElement("p");
    const expandedLinkToGame = document.createElement("a");
    const expandedBottomDiv = document.createElement("div");
    const expandedH3 = document.createElement("h3");

    expandedImage.src = game.thumbnail;
    expandedH3.textContent = game.title;
    expandedP.textContent = game.short_description;
    expandedBottomDiv.textContent = `Publisher: ${game.publisher}`;
    expandedLinkToGame.href = game.game_url;
    expandedLinkToGame.target = "_blank";
    expandedLinkToGame.textContent = "Click here to play!";
    expandedDiv.append(
      expandedH3,
      expandedImage,
      expandedP,
      expandedLinkToGame,
      expandedBottomDiv
    );
    expandedDiv.classList.add("col-md-4", "col-sm-6", "card");
    expandedCard.append(expandedDiv);

    // Append the expanded card to the body
    document.body.appendChild(expandedCard);

    // Close the expanded card when clicking outside of it
    expandedCard.addEventListener("click", function (e) {
      if (e.target.classList.contains("expanded-card")) {
        console.log(e.target);
        setTimeout(function () {
          e.target.parentNode.removeChild(e.target);
        }, 300);
      }
    });
  });
}

////////////////////////////////////////////

// }

// EVENT HANDLERS

//MANTRA
// FETCH the data
// SELECT DOM elements
// CREATE new elements (if needed)
// ASSIGN data to elements
// APPEND elements into DOM

// Stretch goals:
// 1. create favorites button
// 2. pagination

// console.log("#myModal".modal(options));
// document.addEventListener("DOMContentLoaded", function () {
// const dropdownButton = document.getElementById("dropdownMenuButton");
// const dropdownMenu = document.getElementById("dropdownMenu");

// dropdownButton.addEventListener("click", function (e) {
//   dropdownMenu.classList.toggle("show");
//   console.log(e.target);
// });
// });

// document.addEventListener("DOMContentLoaded", function () {
function addPopUp() {
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      let card = cards[i];
      console.log(card);

      // Create the expanded card section
      let expandedCard = document.createElement("div");
      expandedCard.className = "expanded-card";
      // Maybe start creating here ---------------------------------- Create more elements here
      expandedCard.appendChild(card.cloneNode(true)); // Be sure to add more
      console.log(expandedCard.childNodes);

      // Append the expanded card to the body
      document.body.appendChild(expandedCard);

      // Close the expanded card when clicking outside of it
      expandedCard.addEventListener("click", function (e) {
        if (e.target.classList.contains("expanded-card")) {
          console.log(e.target);
          setTimeout(function () {
            e.target.parentNode.removeChild(e.target);
          }, 300);
        }
      });
    });
  }
}
// }
// });

// function addPopUp() {
//   var cards = document.getElementsByClassName("card");
//   // console.log(cards);

//   for (var i = 0; i < cards.length; i++) {
//     cards[i].addEventListener("click", function () {
//       var card = this;

//       // Check if the card is already expanded
//       // if (card.classList.contains("expanded")) {
//       //   card.classList.remove("expanded");
//       //   var expandedCard = document.getElementsByClassName("expanded-card")[0];
//       //   expandedCard.classList.add("fade-out");
//       //   setTimeout(function () {
//       //     expandedCard.parentNode.removeChild(expandedCard);
//       //   }, 300);
//       // } else {
//       //   // Remove expanded class from other cards and close any existing expanded card
//       //   var expandedCards = document.getElementsByClassName("expanded-card");
//       //   console.log(expandedCards);
//       //   for (var j = 0; j < expandedCards.length; j++) {
//       //     expandedCards[j].parentNode.removeChild(expandedCards[j]);
//       //   }
//       //   for (var k = 0; k < cards.length; k++) {
//       //     cards[k].classList.remove("expanded");
//       //   }

//       // card.classList.add("expanded"); ----

//       // Create the expanded card section
//       var expandedCard = document.createElement("div");
//       expandedCard.className = "expanded-card";
//       // Maybe start creating here ---------------------------------- Create more elements here
//       expandedCard.appendChild(card.cloneNode(true)); // Be sure to add more

//       // Append the expanded card to the body
//       document.body.appendChild(expandedCard);

//       // Close the expanded card when clicking outside of it
//       expandedCard.addEventListener("click", function (e) {
//         if (e.target.classList.contains("expanded-card")) {
//           console.log(e.target);
//           // card.classList.remove("expanded"); ---
//           // e.target.classList.add("fade-out");
//           setTimeout(function () {
//             e.target.parentNode.removeChild(e.target);
//           }, 300);
//         }
//       });

//       // Show the expanded card with a fade-in effect
//       // expandedCard.style.display = "none";
//       setTimeout(function () {
//         expandedCard.style.display = "flex";
//         // expandedCard.classList.remove("fade-in");
//       }, 0);
//       // }
//     });
//   }
// }
