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
                //JSON is case-sensetive. Need to convert the value to lowercase 
                var searchTerm = $searchTermTxt.val().toLowerCase();

                getPokemon(pokeDexUrl, searchTerm);
                $searchTermTxt.val("");
            })
            $searchTermTxt.keypress(function (e) {
                if (e.which == 13) {//Enter key pressed
                        $searchPokemonBtn.click();
                    }
                });
            } ();
        } ();

        function getPokemon(url, searchTerm) {
            url += searchTerm;
            $.getJSON(url)
                .done(function (result) {
                    displayPokemon(result);
                })
                .fail(function () {
                    $("#myModal").modal('show');
                })
        }
        function buildArticle(name, height, weight, type, sprites) {
            var $article = $("<article>");
            var $thumbnail = $("<div>")
                .addClass("thumbnail");
            var $caption = $("<div>")
                .addClass("caption");
            var $image = $("<img>")
                .attr({ src: sprites, alt: name })
                .addClass("img-responsive");
            var $title = $("<h3>").html("Name: " + name);
            var $height = $("<p>").html("Height:" + height);
            var $weight = $("<p>").html("Weight: " + weight);
            var $type = $("<p>").html("Type: " + type);

            $article
                .append(
                $thumbnail
                    .append(
                    $image,
                    $caption
                        .append(
                        $title,
                        $height,
                        $weight,
                        $type
                        )
                    )
                );
            $mainContent.append($article);
            $article.addClass("col-sm-4");
        }

        function displayPokemon(result) {

            var name = result.name;
            var height = result.height;
            var weight = result.weight;
            var type = result.types[0].type.name;

            var sprites;

            if (result.sprites.front_shiny_female === null) {
                sprites = "img/MissingNo.png"

            } else {
                sprites = result.sprites.front_shiny_female;
            }

            buildArticle(name, height, weight, type, sprites);


            /*
            $(result).each(function(){
                    var name = this.name;
                    var height = this.height;
                    var weight = this.weight;
                    var type = result.types[0].type.name;
                    var sprites = this.sprites.front_shiny_female;
    
                    var $article = $("<article>");
                    var $thumbnail = $("<div>")
                        .addClass("thumbnail");
                    var $caption = $("<div>")
                        .addClass("caption");
                    var $image = $("<img>")
                        .attr({src: sprites, alt: name})
                        .addClass("img-responsive");
                    var $title = $("<h3>").html(name);           
    
                    $article
                        .append(
                            $thumbnail
                                .append(
                                    $image,
                                    $caption
                                        .append($title)
                                )
                        );         
                    $mainContent.append($article);
            });
            */
        }
    })