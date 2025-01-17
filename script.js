const wrapper = document.querySelector("#wrapper");
const loadMoreBtn = document.querySelector("#loadMore");
const storePokemonName = document.querySelector("#storePokemonName");
const baseURL = "https://pokeapi.co/api/v2/pokemon";

let limit = 20;
let count = 0;

const image = [];
const saveUrl = [];


window.addEventListener("load", async () => {
   const finalData = await getData(
    `${baseURL}?limit=${limit}&offset=${limit * count}`
  );
  console.log(finalData);
  displayData(finalData);
});

loadMoreBtn.addEventListener("click", async () => {
  count++;
  const finalData = await getData(
    `${baseURL}?limit=${limit}&offset=${limit * count}`
  );
  // console.log(finalData);
  displayData(finalData);
});

async function pokimon(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
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

storePokemonName.addEventListener("keyup", searchEmoji);

function searchEmoji(e) {
  if (e.target.value.length > 1) {
      searchresults = finalData.filter((obj) =>
          obj.name.includes(e.target.value)
      );
  } 
}