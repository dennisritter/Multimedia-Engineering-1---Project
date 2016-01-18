<?php

function geocode( array $data ){
    $geocodingLink = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    $address = $data[ 'street' ] . "+" . $data[ 'city' ] . "+" . $data[ 'zipCode' ];
    $apiKey = AIzaSyCZCAxrYdcAGtZwSmuZEMzSH3dRqsu_NQs;

    $responseData = json_decode( curl_file_get_contents( $geocodingLink . $address . "&key=" . $apiKey ), true );

    $data[ 'latitude' ] = $responseData[ 'results' ][ 0 ][ 'geometry' ][ 'location' ][ 'lat' ];
    $data[ 'longitude' ] = $responseData[ 'results' ][ 0 ][ 'geometry' ][ 'location' ][ 'lng' ];

    return $data;
}