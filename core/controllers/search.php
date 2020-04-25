<?php

$is_ok = false;
$data = [];

if (!isset($_GET) || !isset($_GET['objet']) || empty($_GET['objet'])
    || !isset($_GET['critere']) || empty($_GET['critere'])
    || !isset($_GET['terme']) || !isset($_GET['sort'])) {
        
    $consol_msg = 'Recherche impossible : informations manquantes.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();

$request = $bdd->prepare('SELECT id, ' . $_GET['critere'] . ' FROM '.$_GET['objet'].' ORDER BY ' . $_GET['critere']);

try {
    
    $is_valid_request = $request->execute();
    $data = $request->fetchAll(PDO::FETCH_ASSOC);
    
} catch (Exception $error) {
    $consol_msg = $error; }

$is_ok = true;
$consol_msg = 'Recherche ' . $_GET['objet'] . ' par ' . $_GET['critere'];

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));