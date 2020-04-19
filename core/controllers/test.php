<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

if (!isset($_POST['id']) || empty($_POST['id'])
    || !isset($_POST['data']) || empty($_POST['data'])) {

    $consol_msg = 'Changement liste document impossible :
        des données sont manquantes/vides : id, data';
    
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

$data['none'] = [];
$data['insert'] = [];
$data['update'] = [];
$data['delete'] = [];
$data['docs_ids'] = [];
$data['sql'] = [];

try {
    require '../bdd.php';
    $bdd = connexionBdd();

    $form_documents = $_POST['data'];
    foreach ($form_documents as $nb_doc => $doc) {
        if (!isset($doc['id'])) {
            array_push($data['insert'], $doc['titre']);
            continue;
        }
        array_push($data['docs_ids'], intval($doc['id']));
    }

    include '../models/document.php';
    $data['sql'] = document_select_by_ids_bdd($bdd, $data['docs_ids']);
    

} catch (Exception $error) {
    $consol_msg = $error->getMessage(); }

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));