<?php

$credsFile = __DIR__ . '/config/mysql-credentials.php';

if ( !file_exists( $credsFile ) )
	throw new Exception( "Credentials file is not available!" );

$creds = include $credsFile;

global $connection;
$connection = new PDO( sprintf( 'mysql:dbname=%s;host=%', $creds['dbname'], $creds['host'] ), $creds['username'], $creds['password'] );

function getConnection () {
	global $connection;
	return $connection;
}