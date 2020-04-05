<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

if (!isset($_GET) || empty($_GET['id'])) {
    exit;
}

require '../bdd.php';
require '../models/concept.php';
require '../../functions/navigation.php';

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

try {
    $bdd = connexionBdd();
    $class_concept = new Concept;
    $class_concept->set_id($_GET['id']);
    $class_concept->select_bdd($bdd);
    $concept_id = $class_concept->get_id();
    $concept_id_ascendant = $class_concept->get_id_ascendant();
    $concept_nom = $class_concept->get_nom();
    
    $is_ok = true;
    $consol_msg = 'Données acquises.';
    $data = [
        'notice' => [
            'type' => 'Personne',
            'description' => 'lorem ipsum dolor est'
        ],
        'matrice' => [
            'nom' => $concept_nom,
            'concept_specifique' => search_descendant($bdd, $_GET['id']),
            'concept_generique' => search_ascendant($bdd, $concept_id_ascendant),
            'concept_associe' => $class_concept->select_associe_bdd($bdd),
            'concept_employe' => $class_concept->select_employe_bdd($bdd)
        ]
    ];
} catch (Exception $error) {
    $consol_msg = 'Erreur de génération : ' . $error;
}

$json = json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data), JSON_UNESCAPED_UNICODE);

// file_put_contents('../../cache/concept_' . $concept_id . '.json', $json);
echo $json;