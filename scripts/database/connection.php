<?php
/**
 * Created by PhpStorm.
 * User: dennisritter
 * Date: 12.01.16
 * Time: 15:47
 */
require_once ('config/config.php');
$db_link = mysqli_connect (
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB
);
?>