$(function(){
    var $btn_science;
    var $btn_culture;
    var $btn_sport;
    //init
    var init = function(){
        var setHTMLObjects = function(){
            $btn_science = $("#btn_science");
            $btn_culture = $("#btn_culture");
            $btn_sport = $("#btn_sport");
        }();//end setHTMLObjects
        var setEvents = function(){
            $btn_science.on("click", function(){
                console.log("SCIENCE BITCH");
            })

            $btn_culture.on("click", function(){
                console.log("CULTURE BIAAAAATCH");
            })
            $btn_sport.on("click", function(){
                console.log("SPORT besh");
            })
        }();//end setEvents
    }();//end init
})