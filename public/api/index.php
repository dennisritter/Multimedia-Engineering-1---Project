<?php

define( 'LIB_DIR', __DIR__ . '/../../api-lib' );

require_once( LIB_DIR . '/connection.php' );
require_once( LIB_DIR . '/functions.php' );
require_once( LIB_DIR . '/validation.php' );
require_once( LIB_DIR . '/controllers.php' );

parse_str(file_get_contents("php://input"), $data);
$id = array_key_exists( 'id', $_GET ) && is_numeric( $_GET['id'] )
	? (int) $_GET['id']
	: -1;

switch ($_SERVER[ 'REQUEST_METHOD' ]) {
    case 'GET':
        getController( $id );
        break;
    case 'POST':
        postController( $data );
        break;
    case 'PUT':
        putController( $id, $data );
        break;
    case 'DELETE':
        deleteController( $id, $data );
        break;
    default:
        sendErrorResponse("methodNotAllowed", 405);
}

function getResource($id){
    //TODO: fordere Daten von [$id] aus [Datenbank.Tabelle] an
    $httpStatus = http_response_code();
    if( $httpStatus >= 200 && $httpStatus <= 299 ){
        sendSuccessResponse($data, $httpStatus);
    }elseif( $httpStatus >= 400 ){
        sendErrorResponse("getResourceFailed", $httpStatus);
    }
}

function getCollection(){
    //TODO: fordere (alle) Daten  aus [Datenbank.Tabelle] an
}

function addResource(){
    //TODO: schreibe Daten in [Datenbank.Tabelle]
}

function updateResource( $id ){
    //TODO: schreibe(ändere) Daten in [Datenbank.Tabelle] von [ID]
}

function deleteResource( $id ){
    //TODO: lösche [ID] aus [Datenbank.Tabelle]
}