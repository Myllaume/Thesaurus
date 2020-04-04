<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

if (!isset($_GET) || empty($_GET['key'])) {
    exit;
}

$is_ok = false;
$consol_msg = 'Echec de connexion.';

$list_cle = file_get_contents('../keys.txt');
$list_cle = explode(PHP_EOL, $list_cle);

if (in_array($_GET['key'], $list_cle)) {
    $is_ok = true;
    $consol_msg = 'Connexion réussie.';
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg));