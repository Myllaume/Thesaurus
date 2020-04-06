<?php

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
$extensions_valid = ['md', 'pdf', 'jpg', 'png', 'txt'];

if (!in_array($extension_fichier, $extensions_valid)) {
    $consol_msg = 'Cette extension de fichier n\'est pas admise.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

if ($_FILES['fichier']['size'] > 2000000) { // 2 mégaoctets
    $consol_msg = 'Ce fichier est trop lourd : 2 mégaoctets maximum.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

if ($_FILES['fichier']['size'] > 2000000) { // 2 mégaoctets
    $consol_msg = 'Ce fichier est trop lourd : 2 mégaoctets maximum.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

$nom_sortie = str_replace('.' . $extension_fichier, '', $_FILES['fichier']['name']);

if (strlen($nom_sortie) > 150) {
    $consol_msg = 'Le nom de fichier est trop long.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

$path_destination = '../../upload/';

$rand_string = str_shuffle('abcdefghijklmnopqrstuvwxyz');
$nom_enregistrement = substr($rand_string, 4, -6);

$chemin_fichier = $path_destination . $nom_enregistrement . '.' .$extension_fichier;

try {
    move_uploaded_file($_FILES['fichier']['tmp_name'], $chemin_fichier);
} catch (Exception $error) {
    $consol_msg = 'Le fichier n\'a pu être déplacé.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

try {
    $request = $bdd->prepare('INSERT INTO Files SET nom_enregistrement=:nom_enregistrement,
        nom_sortie=:nom_sortie, extension=:extension, id_concept=:id_concept');
    $is_valid_request = $request->bindValue(':nom_enregistrement', $nom_enregistrement, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':nom_sortie', $nom_sortie, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':extension', $extension_fichier, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id_concept', $_GET['id'], PDO::PARAM_INT);
    $is_valid_request &= $request->execute();
} catch (Exception $error) {
    unlink($chemin_fichier);

    $consol_msg = 'Le fichier n\'a pu être enregistré sur la base de données.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

$is_ok = true;
$consol_msg = 'Fichier enregistré.';
$data = [
    'chemin' => '/upload/' . $nom_enregistrement . '.' .$extension_fichier,
    'type' => $extension_fichier
];

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));