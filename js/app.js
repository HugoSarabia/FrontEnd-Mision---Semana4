const pokedex = document.getElementById("pokedex");
console.log(pokedex);


const fetchPokemon = (name)	=> {

	const promises = [];
	promises.push()
//	for(let i = 1; i <200; i++){
		const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
		
		function UrlExists(url) {
			var http = new XMLHttpRequest();
			http.open('HEAD', url, false);
			http.send();
			if (http.status != 404){
				promises.push(fetch(url).then((res) => res.json()));}
			else{
				const pokeHTMLString = `
				<div class="error">
					<p class="error-text">No se encontró el pokemon que escribiste :(</p>
					<img class="error-img" src="imagenes/sad.png" alt="">
				</div>
			`;
			pokedex.innerHTML = pokeHTMLString;
			}}
			UrlExists(url)

	//}
	
	Promise.all(promises).then(results => {
		console.log(results)
		const pokemon = results.map((data) => ({
			id: data.id,
			name: data.name,
			image: data.sprites['front_default'],
			type: data.types.map((types) => types.type.name),
			stats: data.stats.map((stats) => stats.stat.name).join(", "),
			height: data.height,
			weight: data.weight,
			abilities:  data.abilities.map((abilities) => abilities.ability.name).join(", "),
			hp: data.stats[0].base_stat,
			attack: data.stats[1].base_stat,
			defense: data.stats[2].base_stat,
			special_attack: data.stats[3].base_stat,
			special_defense: data.stats[4].base_stat,
			speed: data.stats[5].base_stat
		}));
		displayPokemon(name,pokemon)
		
	})
	
	
}

const displayPokemon = (names,pokemon) => {
	let pokeman;
	if(isNaN(names)){
		 pokeman = pokemon.find(element => element.name.includes(names));
	}else{
		console.log("asdas")
		 pokeman = pokemon.find(element => element.id == parseInt(names));
	}
	localStorage.setItem('Pokemon: '+ pokeman.id, pokeman.name + " - Type: " + pokeman.type + "- Stats: " + pokeman.stats + " - Height: " + pokeman.height+ " - Weight: " + pokeman.weight + " - Abilities: " + pokeman.abilities + "- hp: " + pokeman.hp);

	let ablts = pokeman.abilities;
	let arr = ablts.split(" ");
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);}
	let abilities =  arr.join(" ");

	const pokemonHTMLString = `
	<ul class= "card" style="padding: 0;">
		<div id="top" class="top">
		<img style="z-index: 1;" class = "card-image" src = "${pokeman.image}"</img>
		</div>
		<h1> <span class = "card-title"> ${pokeman.name} </span> </h1>
		<h3 class = "card-subtitle"> <strong>Type</strong> <br> ${pokeman.type} </h3>
		<h3 class = "card-subtitle"> <strong> Stats </strong> </h3>
		<div class="stats">
			<li class = "card-information"><strong> Hp </strong><br>${pokeman.hp}%</li>
			<li class = "card-information"><strong> Attack </strong><br>${pokeman.attack}%</li>
			<li class = "card-information"><strong> Defense </strong><br>${pokeman.defense}%</li>
			<li class = "card-information"><strong> Special attack </strong><br>${pokeman.special_attack}%</li>
			<li class = "card-information"><strong> Special defense </strong><br>${pokeman.special_defense}%</li>
			<li class = "card-information"><strong> Speed </strong><br>${pokeman.speed}%</li>
			<li class = "card-information"><strong> Height </strong><br>${pokeman.height}</li>
			<li class = "card-information"><strong> Weight </strong><br>${pokeman.weight}</li>
		</div>
		<p style="font-size: 1rem;" class = "card-information"><strong> Abilities </strong><br>${abilities}</p>
		<div id="bot" class="bot"></div>
	</ul>

	`;
	pokedex.innerHTML = pokemonHTMLString;

	if (pokeman.type.includes("steel")) {
		document.getElementById("top").style.backgroundColor="#CCCCCC";}else{
	if (pokeman.type.includes("water")) {
		document.getElementById("top").style.backgroundColor="#0099ff";}else{
	if (pokeman.type.includes("bug")) {
		document.getElementById("top").style.backgroundColor="#99CC33";}else{
	if (pokeman.type.includes("dragon")) {
		document.getElementById("top").style.backgroundColor="#AB82FF";}else{
	if (pokeman.type.includes("electric")) {
		document.getElementById("top").style.backgroundColor="#FFD700";
		}else{
	if (pokeman.type.includes("ghost")) {
		document.getElementById("top").style.backgroundColor="#778899";}else{
	if (pokeman.type.includes("fire")) {
		document.getElementById("top").style.backgroundColor="#FF7F00";}else{
	if (pokeman.type.includes("fairy")) {
		document.getElementById("top").style.backgroundColor="#FFB0FF";}else{
	if (pokeman.type.includes("ice")) {
		document.getElementById("top").style.backgroundColor="#ADD8E6";}else{
	if (pokeman.type.includes("fighting")) {
		document.getElementById("top").style.backgroundColor="#FF6A6A";}else{
	if (pokeman.type.includes("normal")) {
		document.getElementById("top").style.backgroundColor="#DDCCAA";}else{
	if (pokeman.type.includes("grass")) {
		document.getElementById("top").style.backgroundColor="#99FF66";}else{
	if (pokeman.type.includes("psychic")) {
		document.getElementById("top").style.backgroundColor="#FFB5C5";}else{
	if (pokeman.type.includes("rock")) {
		document.getElementById("top").style.backgroundColor="#CD853F";}else{
	if (pokeman.type.includes("dark")) {
		document.getElementById("top").style.backgroundColor="#A9A9A9";}else{
	if (pokeman.type.includes("ground")) {
		document.getElementById("top").style.backgroundColor="#DEB887";}else{
	if (pokeman.type.includes("poison")) {
		document.getElementById("top").style.backgroundColor="#CC88BB";}else{
	if (pokeman.type.includes("flying")) {
		document.getElementById("top").style.backgroundColor="#BAAAFF";}
}}}}}}}}}}}}}}}}}}

const init = function () {
	const formSearch = document.querySelector("#formSearch");
	formSearch.addEventListener('submit', (e) => {
		e.preventDefault();
		let name = document.querySelector("#searchBox").value;

		name = name.toLowerCase();
		fetchPokemon(name);
	})
}

init();
