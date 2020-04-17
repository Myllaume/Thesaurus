<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

session_start();

if (!isset($_GET) || empty($_GET['action'])) {
    exit;
}

$is_ok = false;
$consol_msg = 'Aucun traitement.';

switch ($_GET['action']) {
    case 'connexion':
        if (!isset($_POST) && empty($_POST['cle'])) {
            $consol_msg = 'Aucune clé entrée';
        }

        $list_cle = file_get_contents('../keys.txt');
        // 1 ligne = 1 clé
        $list_cle = explode(PHP_EOL, $list_cle);

        if (!in_array($_POST['cle'], $list_cle)) {
            $consol_msg = 'Clé non reconnue';
        }

        $_SESSION['is_operateur'] = true;

        $is_ok = true;
        $consol_msg = 'Mode opérateur activé';
        break;

    case 'deconnexion':
        $_SESSION = array();
        session_destroy();

        $is_ok = true;
        $consol_msg = 'Mode opérateur désactivé';
        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg));