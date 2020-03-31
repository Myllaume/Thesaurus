<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

if (!isset($_GET) || empty($_GET['action'])) {
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();
require '../models/concept.php';
$class_concept = new Concept;

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

switch ($_GET['action']) {
    case 'add_concept':

        if (!isset($_GET['data']) || empty($_GET['data'])) { break; }

        try {
            $class_concept->set_nom($_GET['data']['nom']);
            $class_concept->set_id_ascendant($_GET['data']['id_ascendant']);
            $class_concept->insert_bdd($bdd);

            $is_ok = true;
            $consol_msg = 'Requête reçue !';
            $data = $class_concept->get_id();
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));