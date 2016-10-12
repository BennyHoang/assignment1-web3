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
        alert("userinput: " + url);

        $.getJSON(url)
            .done(function (result) {
                alert("FOUND POKEMON!");
            })
            .fail(function () {
                alert("ERROR")
            })
    }
})