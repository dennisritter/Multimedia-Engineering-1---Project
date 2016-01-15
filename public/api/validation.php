<?php

function validateExistence ( $property, $data ) {
	if ( !array_key_exists( $property, $data ) )
		sendErrorResponse( $property . 'Missing', 400 );
}

function validateData( $data, $new = false ) {
	// TODO: sync with required fields
	$props = [ 'firstName', 'lastName', 'city', 'zipCode', 'street', 'dateStart', 'dateEnd', 'animalType', 'animalBreed', 'animalName', 'animalAge', 'description', 'email', 'phone' ];

	foreach ( $props as $property )
		validateExistence( $property, $data );

	$data['firstName'] = validateName( 'firstName', $data['firstName'] );
	$data['lastName'] = validateName( 'lastName', $data['lastName'] );
	$data['city'] = validateName( 'city', $data['city'] );
	$data['street'] = validateStreet( $data['street'] );

	$data['dateStart'] = validateDate( $data['dateStart'], 'dateStart' );
	$data['dateEnd'] = validateDate( $data['dateEnd'], 'dateEnd' );

	$zipCode        =      $data[ 'zipCode' ];
	$street         =      $data[ 'street' ];
	$dateStart      =      $data[ 'dateStart' ];
	$dateEnd        =      $data[ 'dateEnd' ];
	$animalType     =      $data[ 'animalType' ];
	$animalBreed    =      $data[ 'animalBreed' ];
	$animalName     =      $data[ 'animalName' ];
	$animalAge      =      $data[ 'animalAge' ];
	$description    =      $data[ 'description' ];
	$email          =      $data[ 'email' ];
	$phone          =      $data[ 'phone' ];
}

function validateName ( $property, $value ) {
	if ( !is_string( $value ) )
		sendErrorResponse( $property . 'NotAString' );

	if ( strlen( $value ) < 3 )
		sendErrorResponse( $property . 'TooShort' );

	if ( strlen( $value ) > 64 )
		sendErrorResponse( $property . 'TooLong' );

	return $value;
}

function validateZipCode( $zipCode ) {

}

function validateStreet( $street ){
	$regex = '/^.* [0-9]+[a-z]?/';
	if ( preg_match( $regex, $street ) !== 1 )
		sendErrorResponse( 'streetFormatInvalid' );

	return $street;
}

function validateDate ( $value, $property ) {
	$regex = '/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/';
	$matches = [];
	if ( preg_match( $regex, $value, $matches ) !== 1 )
		sendErrorResponse( $property . 'InvalidFormat' );

	$date = new DateTime( $value );
	if ( (int) $date->format('Y') !== (int) $matches[1]
		|| (int) $date->format('m') !== (int) $matches[2]
		|| (int) $date->format('d') !== (int) $matches[3] ) {
		sendErrorResponse( $property . 'DateInvalid' );
	}

	return $date->format('Y-m-d');
}

function validateAnimalType( $animalType ){

}

function validateAnimalBreed( $animalBreed ){

}

function validateAnimalName( $animalName ){

}

function validateAnimalAge( $animalAge ){

}

function validateDescription( $description ){

}

function validateEmail( $email ){

}

function validatePhone( $phone ){

}