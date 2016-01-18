<?php

function getResourceController ( $id ) {
	$sql = 'SELECT * FROM userdata WHERE id = :id';
	$pdo = getConnection();

	try {
		$stmt = $pdo->prepare( $sql );
		$stmt->bindValue( ':id', $id );
		$stmt->execute();
		$entry = $stmt->fetch( PDO::FETCH_ASSOC );

		if ( $entry === false || !is_array( $entry ) )
			sendErrorResponse( 'entryNotFound', 404 );

		sendSuccessResponse( $entry );
	} catch ( PDOException $e ) {
		sendErrorResponse( 'serverError', 500 );
	}
}

function getCollectionController () {
	$sql = 'SELECT * FROM userdata ORDER BY id DESC';
	$pdo = getConnection();
	try {
		$stmt = $pdo->prepare( $sql );
		$stmt->execute();

		$results = [];
		while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ) {
			$results[] = $row;
		}

		sendSuccessResponse( $results );
	} catch ( PDOException $e ) {
		sendErrorResponse( $e->getMessage(), 500 );
	}
}

function getController ( $id ) {
	if ( $id < 1 ) {
		getCollectionController();
	} else {
		getResourceController( $id );
	}
}

function postController ( array $data ) {
	$data = validateData( $data, true );
	//geokoordinaten berechnen -> longitude, latitude in geocoding.php auslagern
	//$data = geocode( $data );
	$pdo = getConnection();
	try {
		$stmt = pdoGenerateWritingStatement( $pdo, 'INSET INTO userdata SET', ';', $data );
		$stmt->execute();
		$id = (int) $pdo->lastInsertId();
		getResourceController( $id );
	} catch ( PDOException $e ) {
		error_log( $e->getMessage() );
		sendErrorResponse( 'serverError:' . $e->getMessage(), 500 );
	}
}

function putController ( $id, array $data ) {
	if ( $id < 0 )
		sendErrorResponse( "noIdSpecified", 400 );
}

function deleteController ( $id, array $data ) {
	if ( $id < 0 )
		sendErrorResponse( "noIdSpecified", 400 );
}