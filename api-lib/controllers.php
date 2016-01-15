<?php

function getController ( $id, array $data ) {

}

function postController ( array $data ) {

}

function putController ( $id, array $data ) {
	if ( $id < 0 )
		sendErrorResponse( "noIdSpecified", 400 );
}

function deleteController ( $id, array $data ) {
	if ( $id < 0 )
		sendErrorResponse( "noIdSpecified", 400 );
}