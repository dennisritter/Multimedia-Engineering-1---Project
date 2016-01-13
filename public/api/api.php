<?php
/**
 * Created by PhpStorm.
 * User: dennisritter
 * Date: 13.01.16
 * Time: 15:16
 */

require_once('connection.php');
parse_str(file_get_contents("php://input"), $data);

switch ($_SERVER[ 'REQUEST_METHOD' ]) {
    case 'GET':
        if( array_key_exists("id", $_GET) ) {
            getRessource($_GET);
        }else{
            getCollection();
        }
        break;
    case 'POST':
        validateData($data, true);
        break;
    case 'PUT':
        validateData($data, false);
        break;
    case 'DELETE':
        if( array_key_exists("id", $_GET) ) {
            deleteResource($_GET);
        }else{
            sendErrorResponse("missingID", 400);
        }
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

function sendSuccessResponse( $data, $httpStatus = 200 ){
    status_header( $httpStatus );
    echo json_encode( $data );
    die();
}

function sendErrorResponse( $errorCode, $httpStatus ){
    $data = [ $success = false, $error = $errorCode ];
    status_header( $httpStatus );
    echo json_encode( $data );
    die();
}

function validateData( $data, $new = false ){
    $firstName      =      $data[ 'firstName' ];
    $lastName       =      $data[ 'lastName' ];
    $city           =      $data[ 'city' ];
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
//    $latitude       =      $data[ 'latitude' ];
//    $longitude      =      $data[ 'longitude' ];

    validateFirstName( $firstName );
    validateLastName( $lastName );
    validateCity( $city );
    validateZipCode( $zipCode );
    validateStreet( $street );
    validateDates( $dateStart, $dateEnd );
    validateAnimalType( $animalType );
    validateAnimalBreed( $animalBreed );
    validateAnimalName( $animalName );
    validateAnimalAge( $animalAge );
    validateDescription( $description );
    validateEmail( $email );
    validatePhone( $phone );


}

function validateFirstName( $firstName ){

}

function validateLastName( $lastName ){

}

function validateCity( $city ){

}

function validateZipCode( $zipCode ){

}

function validateStreet( $street ){

}

function validateDates( $dateStart, $dateEnd ){

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