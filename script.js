const wrapper = document.querySelector("#wrapper");
const loadMoreBtn = document.querySelector("#loadMore");
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
    const type = document.createElement("h3");


    parent.classList.add("parent");
    name.classList.add("name");

    image.src = obj.sprites.other.dream_world.front_default;
    name.innerText = obj.name;
    // types.forEach((value) => {
    //   // console.log("hello");
    //   type.innerText = obj.type.name;
    // });

    parent.append(image, name,);
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