<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

if (!isset($_GET) || empty($_GET['element'])) {
    exit;
}

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

require '../bdd.php';
$bdd = connexionBdd();
require '../models/concept.php';

switch ($_GET['element']) {

    case 'csv':
        $bdd_entete = Concept::get_structure_bdd($bdd);
        $entete = [];
        foreach ($bdd_entete as $field_nb => $field_spec) {
            array_push($entete, $field_spec['Field']);
        }

        require '../../functions/files.php';
        create_CSV_from_array(Concept::import_bdd($bdd),
            '../../cache/table_concept.csv', $entete);

        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));