<?php

function geocode( array $data ){
    $address = $data[ 'street' ] . "+" . $data[ 'city' ] . "+" . $data[ 'zipCode' ];
    

    return $data;
}