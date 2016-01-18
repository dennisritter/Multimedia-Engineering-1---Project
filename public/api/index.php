<?php

define( 'LIB_DIR', __DIR__ . '/../../api-lib' );

require_once( LIB_DIR . '/connection.php' );
require_once( LIB_DIR . '/functions.php' );
require_once( LIB_DIR . '/validation.php' );
require_once( LIB_DIR . '/controllers.php' );

$content = file_get_contents( "php://input" );

$data = json_decode( $content, true );
if ( $data === null )
	sendErrorResponse( 'dataNotJson', 400 );

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