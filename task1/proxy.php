<?php

    /*
    $nasaUrl = $_GET['nasaUrl'];
    echo $nasaUrl;
 */
    $xml_feed_url = $_GET['xml_feed_url'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $xml_feed_url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $xml = curl_exec($ch);
    curl_close($ch);
    echo $xml;
?>