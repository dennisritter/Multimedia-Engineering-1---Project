<?php

function geocode ( array $data ){
    $address = $data[ 'street' ] . "+" . $data[ 'city' ] . "+" . $data[ 'zipCode' ];
    $address = str_replace( ' ', '+', $address );
    $requestUrl = sprintf( "https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s", $address, GOOGLE_MAPS_KEY );
    $response = file_get_contents( $requestUrl );
    $responseData = json_decode( $response, true );

    $data[ 'latitude' ] = $responseData[ 'results' ][ 0 ][ 'geometry' ][ 'location' ][ 'lat' ];
    $data[ 'longitude' ] = $responseData[ 'results' ][ 0 ][ 'geometry' ][ 'location' ][ 'lng' ];

    return $data;
}