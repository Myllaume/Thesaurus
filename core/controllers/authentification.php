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
        if (isset($_POST) && !empty($_POST['cle'])) {
            $list_cle = file_get_contents('../keys.txt');
            $list_cle = explode(PHP_EOL, $list_cle);

            if (in_array($_POST['cle'], $list_cle)) {
                $_SESSION['is_admin'] = true;
                
                $is_ok = true;
                $consol_msg = 'Connexion réussie.';
            } else {
                $consol_msg = 'Clé invalide.';
            }
        } else {
            $consol_msg = 'Erreur envoie.';
        }
        break;

    case 'deconnexion':
        $_SESSION = array();
        session_destroy();

        $is_ok = true;
        $consol_msg = 'Deconnexion réussie.';
        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg));