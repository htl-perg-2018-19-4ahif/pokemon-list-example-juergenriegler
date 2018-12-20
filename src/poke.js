var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$(document).ready(function () {
    const pokemonList = document.getElementById('pokemons');
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            const poksPerRow = 5;
            const response = yield fetch('https://pokeapi.co/api/v2/pokemon/');
            const pokelist = yield response.json();
            let html = '';
            let count = 1;
            for (const pokemon of pokelist.results) {
                if (count % poksPerRow === 1)
                    html += '<tr>';
                /*
                const response = await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`);
                const img = response;
                html += `<td>${pokemon.name}</td>`
                */
                let fields = pokemon.url.split("/");
                let id = fields[fields.length - 2];
                let name = pokemon.name;
                html += `<td>
                    <center>
                        <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png'>
                        <br>
                        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onClick="fillModal(${id}, '${name}')">${name}</button>
                        <br><br><br><br><br>
                    </center>
                </td>`;
                count++;
                if (count % poksPerRow === 1)
                    html += '</tr>';
            }
            pokemonList.innerHTML = html;
        });
    })();
});
function fillModal(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        $(".modal-title").html(`${name}`);
        const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemon = yield response.json();
        const weight = pokemon.weight;
        // console.log(pokemon);
        $(".modal-body").html(`weight: ${weight}<br><br>abilities:<br>`);
        for (let ability of pokemon.abilities) {
            const a = ability;
            $(".modal-body").append(`${a.ability.name}<br>`);
        }
    });
}
