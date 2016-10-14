$(function () {
    var $searchTermTxt;
    var $searchPokemonBtn;
    var $mainContent;
    /* DOCUMENTATION: https://pokeapi.co/docsv2/#pokemon */
    var pokeDexUrl = "http://pokeapi.co/api/v2/pokemon/";


    var init = function () {
        var setHTMLObjects = function () {
            $searchTermTxt = $("#searchTermTxt");
            $searchPokemonBtn = $("#searchPokemonBtn");
            $mainContent = $("#mainContent");
        } ();

        var setEvents = function () {
            $searchPokemonBtn.on("click", function () {
                var searchTerm = $searchTermTxt.val();

                getPokemon(pokeDexUrl, searchTerm);
                $searchTermTxt.val("");
            })
        } ();
    } ();

    function getPokemon(url, searchTerm) {
        url += searchTerm;
        $.getJSON(url)
            .done(function (result) {
                displayPokemon(result);
            })
            .fail(function () {
                alert("ERROR")
            })
    }

    function displayPokemon(result) {

        
       
        $(result)
            .each(function(){
                var name = this.name;
                var height = this.height;
                var weight = this.weight;
                var type = result.types[0].type.name;
                var sprites = this.sprites.front_shiny_female;
                $mainContent.append(name, height, weight,type, sprites);
        });
        
    }
})