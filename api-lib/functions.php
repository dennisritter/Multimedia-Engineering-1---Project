<?php

function sendSuccessResponse( $data, $httpStatus = 200 ){
	header('Content-Type: application/json', true);
	http_response_code( $httpStatus );
	$responseBody = [
		'success' => true
	];

	if ( $data !== null )
		$responseBody['data'] = $data;

	echo json_encode( $responseBody );
	die();
}

function sendErrorResponse( $errorCode, $httpStatus = 400 ){
	$data = [
		'success' => false,
		'error' => $errorCode
	];

	header('Content-Type: application/json', true);
	http_response_code( $httpStatus );
	echo json_encode( $data );
	die();
}

function pdoGenerateWritingStatement ( PDO $pdo, $before, $after, array $data ) {
	$properties = [ 'firstName', 'lastName', 'city', 'zipCode', 'street', 'dateStart', 'dateEnd', 'animalType', 'animalBreed', 'animalName', 'animalAge', 'description', 'email', 'phone', 'latitude', 'longitude' ];
	$sql = $before . ' ';

	foreach ( $properties as $prop ) {
		$sql .= sprintf( '%s = :%s, ', $prop, $prop );
	}

	$sql = substr( $sql, 0, -2 ) . ' ';
	$sql .= $after;
	$stmt = $pdo->prepare( trim( $sql ) );

	foreach ( $properties as $prop ) {
		$val = $data[ $prop ];
		switch ( true ) {
			case ( is_int( $val ) ) : $dt = PDO::PARAM_INT; break;
			case ( is_bool( $val ) ) : $dt = PDO::PARAM_BOOL; break;
			default: $dt = PDO::PARAM_STR;
		}

		$stmt->bindValue( ':'.$prop, $val, $dt );
	}

	return $stmt;
}