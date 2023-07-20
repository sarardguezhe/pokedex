const allPokemon = [];
const pokeContainer$$ = document.querySelector(".pokemon-container");

const drawPokemons = (pokemons) => {

  pokeContainer$$.innerHTML= ""
   
  for (const pokemon of pokemons) {
    
    let types= pokemon.types.map(type => type.type.name).join(', ');
    
    let pokemonFigure$$ = document.createElement("figure");
    pokemonFigure$$.className = "card";

    pokemonFigure$$.innerHTML=
    `  
    <div class="pokeimg">
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
    </div>  
      <div class="pokeinfo">
        <p class="pokeinfo-id">#${pokemon.id.toString().padStart(3, 0)}</p> 
        <h2 class="pokeinfo-name">${pokemon.name.toUpperCase()}</h2>
      </div>
      <p>${pokemon.height/10}m ${pokemon.weight/10}Kg</p>
      <p>${types}</p>
    `
    pokeContainer$$.appendChild(pokemonFigure$$)
    }

  }

  const drawInput = (pokemons) => {

    const input$$ = document.querySelector("input")
    input$$.addEventListener("input", ()=> searchPokemons(input$$.value, pokemons))

}
  const searchPokemons = (filtro, pokemons)=> {

   let filteredPokemons = pokemons.filter((pokemon)=> pokemon.name.toLowerCase().includes(filtro.toLowerCase()))
   drawPokemons(filteredPokemons);

} 
  
  const getPokemons = async () => {
  
  for (let i = 1; i <= 151; i++) {
    
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+i)
    const res = await response.json();
    allPokemon.push(res)

  };
  
}

const init = async () => {
  
  await getPokemons();
 
  drawPokemons(allPokemon);

  drawInput(allPokemon);

 }

init()


