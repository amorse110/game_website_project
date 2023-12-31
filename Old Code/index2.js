// GLOBALS
let currentURL;
let currentGame;
let favoritesOn = false;
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
const dropDownDiv = document.querySelector("#drop-down-genres");
// const dropDownDiv = document.querySelector("#drop-down");
const dropDownFav = document.querySelector("#drop-down-favorite");
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

dropDownFav.addEventListener("click", (e) => {
  if (e.target.classList.contains("up")) {
    dropDownFav.textContent = "Unselect: Favorites";
    dropDownFav.style.background = "#5c636a";

    favoritesOn = true;
    e.target.classList.remove("up");
    e.target.classList.add("down");
    favoriteGameList().then((data) => {
      gameList.innerHTML = "";
      data.forEach((game) => {
        handleGameList(game);
      });
    });
  } else if (e.target.classList.contains("down")) {
    dropDownFav.textContent = "Select: Favorites";
    dropDownFav.style.background = "#6c757d";
    favoritesOn = false;
    e.target.classList.add("up");
    e.target.classList.remove("down");
    getGames(url).then((data) => {
      gameList.innerHTML = "";
      currentURL = url;
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

function favoriteGames(id) {
  return fetch(`http://localhost:3000/favorites/${id}`).then((res) =>
    res.json()
  );
}

function favoriteGameList() {
  return fetch("http://localhost:3000/favorites").then((res) => res.json());
}

function favoriteGame(id) {
  return fetch(`http://localhost:3000/favorites/${id}`).then((res) =>
    res.json()
  );
}
function addFavoriteGame(game) {
  newGame = game;
  newGame.favorite = true;
  return fetch(`http://localhost:3000/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  }).then((res) => res.json());
}
function deleteFavoriteGame(id) {
  return fetch(`http://localhost:3000/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
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
  star.classList.add("star-empty");
  star.style = "color: gold";
  star.classList.add("star");
  header.classList.add("row");

  image.src = game.thumbnail;
  p.textContent = game.short_description;

  star.textContent = "☆";
  title.textContent = game.title;
  bottomDiv.textContent = `Publisher: ${game.publisher}`;

  titleContainer.classList.add("d-flex", "justify-content-between");
  titleContainer.append(title, star);
  header.append(titleContainer);
  div.append(image, header, p, bottomDiv);
  // div.append(image, header, p, bottomDiv); // changing order of image/header could be cool
  gameList.append(div);

  favoriteGameList().then((data) => {
    data.forEach((favoriteGame) => {
      if (favoriteGame.id === game.id) {
        if (favoriteGame.favorite) {
          star.textContent = "★";
          star.classList.remove("star-empty");
          star.classList.add("star-full");
        } else {
          star.textContent = "☆";
          star.classList.remove("star-full");
          star.classList.add("star-empty");
        }
      }
    });
  });

  div.addEventListener("mouseenter", (e) => {
    p.classList.remove("description-wrapper");
  });
  div.addEventListener("mouseleave", (e) => {
    p.classList.add("description-wrapper");
  });

  div.addEventListener("click", (e) => {
    if (
      e.target.classList[0] === "star" ||
      e.target.classList[0] === "star-full" ||
      e.target.classList[0] === "star-empty"
    ) {
      if (star.classList.contains("star-empty")) {
        star.classList.remove("star-empty");
        star.classList.add("star-full");
        addFavoriteGame(game).then((data) => {
          data;
        });

        // Update our star
        star.textContent = "★";
      } else if (star.classList.contains("star-full")) {
        star.classList.remove("star-full");
        star.classList.add("star-empty");
        star.textContent = "☆";
        deleteFavoriteGame(game.id);
        if (favoritesOn) {
          e.target.parentNode.parentNode.parentNode.remove();
        }
      }
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
      let expandedTitle = document.createElement("span");
      let expandedStar = document.createElement("span");
      const expandedTitleContainer = document.createElement("div");

      expandedImage.src = game.thumbnail;
      expandedP.textContent = game.short_description;
      expandedBottomDiv.textContent = `Publisher: ${game.publisher}`;
      expandedLinkToGame.href = game.game_url;
      expandedLinkToGame.target = "_blank";
      expandedLinkToGame.textContent = "Click here to play!";

      let copyStar = star.cloneNode(true);
      expandedStar = copyStar;

      expandedH3.classList.add("row");
      expandedTitle = game.title;
      expandedTitleContainer.classList.add("d-flex", "justify-content-between");
      expandedTitleContainer.append(expandedTitle, expandedStar);
      expandedH3.append(expandedTitleContainer);

      expandedDiv.append(
        expandedH3,
        expandedImage,
        expandedP,
        expandedLinkToGame,
        expandedBottomDiv
      );
      expandedDiv.classList.add("col-md-4", "col-sm-6", "card");
      expandedCard.append(expandedDiv);
      document.body.appendChild(expandedCard);

      expandedCard.addEventListener("click", function (e) {
        if (e.target.classList.contains("expanded-card")) {
          setTimeout(function () {
            e.target.parentNode.removeChild(e.target);
          }, 300);
        }
      });

      expandedStar.addEventListener("click", function (e) {
        {
          if (expandedStar.classList.contains("star-empty")) {
            star.classList.remove("star-empty");
            star.classList.add("star-full");
            expandedStar.classList.remove("star-empty");
            expandedStar.classList.add("star-full");
            addFavoriteGame(game).then((data) => data);

            // Update our star
            star.textContent = "★";
            expandedStar.textContent = "★";
          } else if (star.classList.contains("star-full")) {
            star.classList.remove("star-full");
            star.classList.add("star-empty");
            expandedStar.classList.remove("star-full");
            expandedStar.classList.add("star-empty");
            star.textContent = "☆";
            expandedStar.textContent = "☆";
            deleteFavoriteGame(game.id);
          }
          console.log(e.target);
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
