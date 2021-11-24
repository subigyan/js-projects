const container = document.getElementById("container");
const pokeCount = 150;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const pokeTypes = Object.keys(colors);

const fetchPoke = async () => {
    for (let i = 1; i < pokeCount; i++) {
        getPokemonData(i);
    }
};

const getPokemonData = async (id) => {
    pokeApi = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(pokeApi);
    let data = await res.json();
    createCard(data);
};

const createCard = (pokemon) => {
    const pokeElement = document.createElement("div");
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");
    const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
    const maintype = types[0];
    pokeElement.style.backgroundColor = colors[maintype];

    let pokeTypesInnerHtml = "";

    types.forEach((type) => {
        pokeTypesInnerHtml += `<span">${type} </span>`;
    });

    console.log(pokeTypesInnerHtml);

    const pokeInnerHtml = `
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/65a610e336f749665c6206f9b733363ca438e54c/sprites/pokemon/other/dream-world/${
                    pokemon.id
                }.svg"
                    alt="" srcset="">
            </div>
            <div class="poke-info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: ${types.join(", ")} </small>
                
            </div>
        `;
    pokeElement.classList.add("pokemon");

    pokeElement.innerHTML = pokeInnerHtml;
    container.appendChild(pokeElement);
};

fetchPoke();
