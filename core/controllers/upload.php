<?php

session_start();

if (!isset($_SESSION['is_operateur']) || $_SESSION['is_operateur'] !== true) {
    exit;
}

if (!isset($_POST) || empty($_FILES['fichier'])
    || !is_uploaded_file($_FILES['fichier']['tmp_name'])
    || !isset($_GET) || empty($_GET['id'])) {
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

$extension_fichier = pathinfo($_FILES['fichier']['name'], PATHINFO_EXTENSION);
$extensions_valid = ['md', 'jpg'];

if (!in_array($extension_fichier, $extensions_valid)) {
    $consol_msg = 'Cette extension de fichier n\'est pas admise.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

if ($_FILES['fichier']['size'] > 1000000) { // 2 mégaoctets
    $consol_msg = 'Ce fichier est trop lourd : 2 mégaoctets maximum.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

// obtention nom ficher, sans extension : ex "file.txt' -> 'file'
$nom_sortie = str_replace('.' . $extension_fichier, '', $_FILES['fichier']['name']);

if (strlen($nom_sortie) > 150) {
    $consol_msg = 'Le nom de fichier est trop long.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

include '../models/fiche.php';

$nom_enregistrement = fiche_gen_nom_enregistrement();
$path_destination = '../../upload/';

$chemin_fichier = $path_destination . $nom_enregistrement . '.' .$extension_fichier;

try {
    move_uploaded_file($_FILES['fichier']['tmp_name'], $chemin_fichier);
} catch (Exception $error) {
    $consol_msg = 'Le fichier n\'a pu être déplacé.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

try {

    $id_file = fiche_insert_bdd($bdd, $_GET['id'], $extension_fichier,
        $nom_enregistrement, $nom_sortie);
} catch (Exception $error) {
    unlink($chemin_fichier);

    $consol_msg = 'Le fichier n\'a pu être enregistré sur la base de données.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

$is_ok = true;
$consol_msg = 'Fichier enregistré.';
$data = [
    'id' => $id_file,
    'nom_enregistrement' => $nom_enregistrement,
    'nom_sortie' => $nom_sortie,
    'extension' => $extension_fichier
];

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));