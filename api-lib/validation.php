<?php

function validateExistence ( $property, $data ) {
	if ( !array_key_exists( $property, $data ) )
		sendErrorResponse( $property . 'Missing', 400 );
}

function validateStringLength ( $property, $value, $min, $max, $required = true ) {
	if ( !$required and empty( $value ) )
		return null;

	if ( !is_string( $value ) )
		sendErrorResponse( $property . 'NotAString' );

	if ( strlen( $value ) < $min )
		sendErrorResponse( $property . 'StringTooShort' );

	if ( strlen( $value ) > $max )
		sendErrorResponse( $property . 'StringTooLong' );

	return $value;
}

function validatePattern( $property, $value, $regex ){
	if ( preg_match( $regex, $value ) !== 1 )
		sendErrorResponse( $property . 'StringFormatInvalid' );

	return $value;
}

function validateIntRange( $property, $value, $min, $max, $required = true ) {
	if ( !$required and !is_int( $value ) )
		return null;

	if ( !is_int( $value ) )
		sendErrorResponse( $property . 'NotAnInt' );

	if ( $value < $min )
		sendErrorResponse( $property . 'IntTooSmall' );

	if ( $value > $max )
		sendErrorResponse( $property . 'IntTooBig' );

	return $value;
}

function validateDate ( $value, $property ) {
	$regex = '/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/';
	$matches = [];
	if ( preg_match( $regex, $value, $matches ) !== 1 )
		sendErrorResponse( $property . 'DateFormatInvalid' );

	$date = new DateTime( $value );
	if ( (int) $date->format('Y') !== (int) $matches[1]
		|| (int) $date->format('m') !== (int) $matches[2]
		|| (int) $date->format('d') !== (int) $matches[3] ) {
		sendErrorResponse( $property . 'DateInvalid' );
	}

	$now = new DateTime('now');
	if ( $date < $now )
		sendErrorResponse( $property . 'IsInPast' );

	return $date->format('Y-m-d');
}

function validateEmail ( $value ) {
	$value = validateStringLength( 'email', $value, 6, 64 );

	if ( !$value = filter_var( $value, FILTER_VALIDATE_EMAIL ) )
		sendErrorResponse( 'emailFormatInvalid' );

	return $value;
}

function validateData( $data, $new = false ) {
	if ( $data === null )
		sendErrorResponse('dataNotJson', 400);

	$reqProps = [ 'firstName', 'lastName', 'city', 'zipCode', 'street', 'dateStart', 'dateEnd', 'animalType', 'animalName', 'email', 'phone' ];

	foreach ( $reqProps as $property )
		validateExistence( $property, $data );

	$data['firstName'] = validateStringLength( 'firstName', $data['firstName'], 2, 64 );
	$data['lastName'] = validateStringLength( 'lastName', $data['lastName'], 2, 64 );
	$data['city'] = validateStringLength( 'city', $data['city'], 2, 64 );
	$data['zipCode'] = validateIntRange( 'zipCode', $data['zipCode'], 1001, 99998 );
	$data['street'] = validateStringLength( 'street', $data['street'], 5, 64 );
	$data['street'] = validatePattern( 'street', $data['street'], '/^.* [0-9]+[a-z]?/' );
	$data['dateStart'] = validateDate( $data['dateStart'], 'dateStart' );
	$data['dateEnd'] = validateDate( $data['dateEnd'], 'dateEnd' );
	$data['animalType'] = validateStringLength( 'animalType', $data['animalType'], 2, 64 );
	$data['animalBreed'] = validateStringLength( 'animalBreed', $data['animalBreed'], 2, 64, false );
	$data['animalName'] = validateStringLength( 'animalName', $data['animalName'], 2, 64 );
	$data['animalAge'] = validateIntRange( 'animalAge', $data['animalAge'], 0, 100, false );
	$data['description'] = validateStringLength( 'description', $data['description'], 0, 512, false );
	$data['email'] = validateEmail( $data['email'] );
	$data['phone'] = validateStringLength( 'phone', $data['phone'], 3, 16 );

	return $data;
}