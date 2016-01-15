<?php

function sendSuccessResponse( $data, $httpStatus = 200 ){
	http_response_code( $httpStatus );
	echo json_encode( $data );
	die();
}

function sendErrorResponse( $errorCode, $httpStatus = 400 ){
	$data = [ $success = false, $error = $errorCode ];
	http_response_code( $httpStatus );
	echo json_encode( $data );
	die();
}