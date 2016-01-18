<?php

$credsFile = __DIR__ . '/config/mysql-credentials.php';

define( 'TABLE_NAME', 'petsitting' );
define( 'GOOGLE_MAPS_KEY', 'AIzaSyCZCAxrYdcAGtZwSmuZEMzSH3dRqsu_NQs' );

if ( !file_exists( $credsFile ) )
	throw new Exception( "Credentials file is not available!" );

$creds = include $credsFile;

global $connection;

try {
	$connection = new PDO( sprintf( 'mysql:dbname=%s;host=%', $creds['dbname'], $creds['host'] ), $creds['username'], $creds['password'] );
	$connection->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$connection->exec('SET NAMES "utf8"');
} catch ( PDOException $e ) {
	die("Could not connect to database." . $e->getMessage());
}

function getConnection () {
	global $connection;
	return $connection;
}