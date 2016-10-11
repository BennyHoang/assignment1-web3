$(function () {
    var $btn_science;
    var $btn_culture;
    var $btn_sport;
    var $btn_menu;
    var $dropdown_xml;
    var $testOutput;

    var XML_feed_object = null;

    var $main_content;

    //init
    var init = function () {

        var setHTMLObjects = function () {
            $btn_science = $("#btn_science");
            $btn_culture = $("#btn_culture");
            $btn_sport = $("#btn_sport");
            $btn_menu = $("#btn_menu");
            $dropdown_xml = $("#dropdown_xml");
            $testOutput = $("#testOutput");
            $main_content = $("#main_content");

        } ();//end setHTMLObjects

        var setEvents = function () {
            $btn_menu.on("click", generateHTMLFromXML);

            $dropdown_xml.on("click", "a.getNewsTerm", function (event) {
                var RSS_url = $(this).attr("src");
                makeNRKCall(RSS_url);
            })


        } ();//end setEvents
        getFeedXML();
    } ();//end init

    function generateHTMLFromXML() {
        $dropdown_xml.html("");
        $(XML_feed_object)
            .find("article")
            .each(function () {
                var title = $("title", this).text();
                var url = $("url", this).text();

                var newAnchor = $("<a>")
                    .attr(
                    {
                        class: "getNewsTerm",
                        id: title,
                        src: url
                    }
                    )
                    .html(title);
                var $newList = $("<li>")
                    .append(newAnchor);
                $dropdown_xml.append($newList);

            });
    }

    function getFeedXML() {
        $.ajax({
            method: "GET",
            url: "xml/nrk-rss.xml",
            dataType: "xml",
            async: true,

            beforeSend: function () {
                console.log("LOADING");
            },
            success: function (result) {
                console.log("SUCCESS");
                XML_feed_object = result;
            },
            error: function (xhr, statusText, errorMsg) {
                //Error handling
                console.log(xhr + " " + statusText + " " + errorMsg);
            },
            complete: function () {
                console.log("FUNITO");
            }
        }); // END OF AJAX
    }

    function makeNRKCall(RSS_url) {
        $.ajax(
            {
                url: "../proxy.php?xml_feed_url=" + RSS_url,
                method: "GET",
                dataType: "xml"
            }
        )
            .done(function (result) {
                showArticle(result);
            //clearfix hax
            $("#main_content > article:nth-child(3n)").after("<div class='clearfix'></div>");
                
            })
            .fail(function (a, b, c) {
                $("#testOutput").html("Det gikk ikke bra");
            });
    }

    function showArticle(xml) {
        $main_content.html("");

        $(xml)
            .find("item")
            .each(function () {
                var title = $("title", this).text();
                var description = $("description", this).text();
                var thumbnail = $("enclosure", this).attr("url");
                var date = $("pubDate", this).text();

                var $newArticle = $("<article>")
                    .addClass("col-md-4")
                    .append(
                    $("<h3>").html(title),
                    $("<p>").html(date),
                    $("<img>", {
                        src: thumbnail,
                        class: "img-responsive"
                    }),
                    $("<p>").html(description)

                    );
                $main_content.append($newArticle);
            });
    }
});
