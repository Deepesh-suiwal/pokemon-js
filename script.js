const wrapper = document.querySelector("#wrapper");
const loadMoreBtn = document.querySelector("#loadMore");
const storePokemonName = document.querySelector("#storePokemonName");
const mydropdown = document.querySelector("#dropdown");
let selectedItem;

mydropdown.addEventListener("change", async () => {
  selectedItem = mydropdown.value;

  if (selectedItem === "All types") {
    count = 0;
    finalData = await getData(
      `${baseURL}?limit=${limit}&offset=${limit * count}`
    );
    displayData(finalData);
    filterByType(finalData);
  } else {
    let searchresults = finalData.filter((obj) =>
      obj.types[0].type.name.includes(selectedItem)
    );
    
    displayData(searchresults);
  }
});

const baseURL = "https://pokeapi.co/api/v2/pokemon";

let limit = 20;
let count = 0;

const image = [];
const saveUrl = [];
let finalData;

window.addEventListener("load", async () => {
  finalData = await getData(
    `${baseURL}?limit=${limit}&offset=${limit * count}`
  );

 
  displayData(finalData);
  filterByType(finalData);
});

loadMoreBtn.addEventListener("click", async () => {
  count++;
  finalData = await getData(
    `${baseURL}?limit=${limit}&offset=${limit * count}`
  );
  
  displayData(finalData);
  filterByType(finalData);
});

async function pokimon(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
function filterByType(data) {
  

  let defaultOption = document.createElement("option");
  defaultOption.value = "All types";
  defaultOption.innerText = "All types";

  mydropdown.innerHTML = "";
  mydropdown.append(defaultOption);

  const types = new Set();

  data.forEach((pokemon) => {
    pokemon.types.forEach((typeObj) => {
      types.add(typeObj.type.name);
    });
  });

  types.forEach((type) => {
    let option = document.createElement("option");
    option.value = type;
    option.innerText = type;
    mydropdown.append(option);
  });
}

function displayData(data) {
  wrapper.innerHTML = "";
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemonDiv");

  data.forEach((obj) => {
    const parent = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const type = document.createElement("p");

    parent.classList.add("parent");
    name.classList.add("name");

    image.src = obj.sprites.other.dream_world.front_default;
    name.innerText = obj.name;

    type.innerText = obj.types[0].type.name;

    parent.append(image, name, type);
    pokemonDiv.append(parent);
  });

  wrapper.append(pokemonDiv);
}

async function getData(url) {
  const saveData = await pokimon(url);

  saveData.results.forEach((data) => {
    const final = pokimon(data.url);
    saveUrl.push(final);
  });
  const data = await Promise.all(saveUrl);
  return data;
}

storePokemonName.addEventListener("keyup", searchPokimon);

function searchPokimon(e) {
  if (e.target.value.length > 1) {
    let searchresults = finalData.filter((obj) =>
      obj.name.includes(e.target.value)
    );
    displayData(searchresults);
  } else {
    displayData(finalData);
  }
}
