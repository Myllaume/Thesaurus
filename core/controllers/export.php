<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

if (!isset($_GET) || !isset($_GET['element']) || empty($_GET['element'])
    || !isset($_GET['id']) || empty($_GET['id'])) {
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();

function throw_download($file_path) {
    if (file_exists($file_path)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path));
        readfile($file_path);
        exit;
    } else {
        echo 'Erreur de téléchargement';
    }
}

switch ($_GET['element']) {

    case 'concept':

        throw_download('../../cache/concept_' . $_GET['id'] . '.json');

        break;

    case 'fiche':
        
        include '../models/fiche.php';
        $file_metas = fiche_get_path($bdd, $_GET['id']);
        throw_download('../../upload/'. $file_metas['nom_enregistrement'] . '.' . $file_metas['extension']);

        break;
}