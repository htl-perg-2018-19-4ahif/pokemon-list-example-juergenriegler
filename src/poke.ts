$(document).ready(function(){
    
    const pokemonList = document.getElementById('pokemons');
    (async function() {
        const poksPerRow = 5;
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const pokelist = await response.json();
        let html = '';
        let count = 1;
        for(const pokemon of pokelist.results) {
            if(count%poksPerRow===1) html+='<tr>';
            /*
            const response = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`);
            const img = response;
            html += `<td>${pokemon.name}</td>`
            */
            let fields: string[] = pokemon.url.split("/");
            let id: string = fields[fields.length-2];
            let name: string = pokemon.name;
            html += `<td>
                    <center>
                        <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png'>
                        <br>
                        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onClick="fillModal(${id}, '${name}')">${name}</button>
                        <br><br><br><br><br>
                    </center>
                </td>`
            count++;
            if(count%poksPerRow===1) html+='</tr>';
        }

        pokemonList.innerHTML = html;
        
    })();

    
    
    
});
async function fillModal(id: Number, name: string) {
    $(".modal-title").html(`${name}`);  
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon: any = await response.json();
    const weight = pokemon.weight;
    // console.log(pokemon);
    $(".modal-body").html(`weight: ${weight}<br><br>abilities:<br>`);
    for (let ability of pokemon.abilities) {
        const a: any = ability;
        $(".modal-body").append(`${a.ability.name}<br>`);
    }
}