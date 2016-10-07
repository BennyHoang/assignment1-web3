$(function(){
    var $btn_science;
    var $btn_culture;
    var $btn_sport;


    var url_science = "http://www.nrk.no/viten/toppsaker.rss";
    var url_culture = 'http://www.nrk.no/kultur/toppsaker.rss';
    var url_sport = 'http://www.nrk.no/sport/siste.rss';

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
                makeNRKCall(url_science);
            })

            $btn_culture.on("click", function(){
                console.log("CULTURE BIAAAAATCH");
            })
            $btn_sport.on("click", function(){
                console.log("SPORT besh");
            })
        }();//end setEvents

    }();//end init

    function makeNRKCall(RSS_url){
         $.ajax(
                    {
                        url:"../proxy.php?xml_feed_url=" + escape(RSS_url) ,
                        method:"GET",
                        dataType:"xml"
                    }
                )
                .done(function(result){
                    $("#testOutput").html("Det gikk bra");
                })
                .fail(function(a,b,c){
                    $("#testOutput").html("Det gikk ikke bra");
                });
    }
});
