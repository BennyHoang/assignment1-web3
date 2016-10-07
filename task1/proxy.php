<?php

    /*
    $nasaUrl = $_GET['nasaUrl'];
    echo $nasaUrl;
    */  
    $xml_feed_url = 'https://www.nasa.gov/rss/dyn/mission_pages/kepler/news/kepler-newsandfeatures-RSS.rss';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $xml_feed_url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $xml = curl_exec($ch);
    curl_close($ch);
    echo $xml;
?>