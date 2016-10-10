$(function(){
    var $btn_science;
    var $btn_culture;
    var $btn_sport;
    var $btn_menu;
    var $testOutput;

    var XML_feed_object = null;

    //init
    var init = function(){
      
        var setHTMLObjects = function(){
            $btn_science = $("#btn_science");
            $btn_culture = $("#btn_culture");
            $btn_sport = $("#btn_sport");
            $btn_menu = $("#btn_menu");
            $testOutput = $("#testOutput");
        }();//end setHTMLObjects

        var setEvents = function(){
            $btn_menu.on("click", generateHTMLFromXML);

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
       getFeedXML();
    }();//end init

    function generateHTMLFromXML(){
        alert("HELLO");
        $(XML_feed_object)
            .find("article")
            .each(function(){
                var title = $("title", this).text();
                var url = $("url", this).text();

            $testOutput.append(title);
                /*
                var newAnchor = $("<a>")
                    .attr(
                        {
                            id: title,
                            src: url
                        }
                    )
                    .html(title);
                var $newList = $("<li>")
                    .append(newAnchor);
                $testOutput($newList);
                */
            });
    }

    function getFeedXML(){
        $.ajax({
            method: "GET",
            url: "xml/nrk-rss.xml",
            dataType: "xml",
            async: true,

            beforeSend: function(){
                console.log("LOADING");
            },
            success: function(result){
                console.log("SUCCESS");
                XML_feed_object = result;
            },
            error: function(xhr, statusText, errorMsg){
                //Error handling
                console.log(xhr + " " + statusText + " " + errorMsg);
            },
            complete: function(){
                console.log("FUNITO");
            }
        }); // END OF AJAX
    }

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
