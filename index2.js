// GLOBALS
let currentURL;
let currentGame;
// DOM SELECTORS
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

function favoriteGames() {
  fetch("http://localhost:3000/favorites").then((res) => res.json());
}

getGames(url).then((data) => {
  currentURL = url;
  for (let i = 0; i < 18; i++) {
    handleGameList(data[i]);
  }
});

function handleGameList(game) {
  currentGame = game;
  const div = document.createElement("div");
  const bottomDiv = document.createElement("div");
  const image = document.createElement("img");
  const p = document.createElement("p");
  const header = document.createElement("h3");
  const title = document.createElement("span");
  const star = document.createElement("span");
  const titleContainer = document.createElement("div"); // Parent container for title and span

  image.classList.add("img-fluid");
  p.classList.add("description-wrapper");
  div.classList.add("col-md-4", "col-sm-6", "card");
  star.textContent = "☆";
  // star.addEventListener("click", (e) => {
  //   console.log(e.target);
  // });
  star.style = "color: gold";
  star.classList.add("star");
  star.classList.add("star-empty");
  title.textContent = game.title;

  // Apply flexbox layout to the titleContainer
  titleContainer.classList.add(
    "d-flex",
    // "align-items-center",
    "justify-content-between"
  );
  titleContainer.append(title, star); // Append title and span to the titleContainer

  header.classList.add("row");
  header.append(titleContainer); // Append the titleContainer to the header

  image.src = game.thumbnail;
  p.textContent = game.short_description;
  bottomDiv.textContent = `Publisher: ${game.publisher}`;

  div.append(image, header, p, bottomDiv);
  div.addEventListener("mouseenter", (e) => {
    p.classList.remove("description-wrapper");
  });
  div.addEventListener("mouseleave", (e) => {
    p.classList.add("description-wrapper");
  });

  div.append(header, image, p, bottomDiv);
  gameList.append(div);

  div.addEventListener("click", (e) => {
    console.log(e.target.classList[0]);
    if (e.target.classList[0] === "star") {
      if (star.classList.contains("star-empty")) {
        star.classList.remove("star-empty");
        star.classList.add("star-full");
        star.textContent = "★";
      } else if (star.classList.contains("star-full")) {
        star.classList.remove("star-full");
        star.classList.add("star-empty");
        star.textContent = "☆";
      }
      // Maybe add event listener here.
      return;
    } else {
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
    }
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
