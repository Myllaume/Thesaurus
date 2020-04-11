<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

session_start();

if (!isset($_SESSION['is_operateur']) || $_SESSION['is_operateur'] !== true
    || !isset($_GET) || empty($_GET['action'])) {
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

switch ($_GET['action']) {
    case 'add_concept':

        if (!isset($_GET['data']) || empty($_GET['data'])) { break; }

        require '../models/concept.php';
        $class_concept = new Concept;

        try {
            $class_concept->set_nom($_GET['data']['nom']);
            $class_concept->set_id_ascendant($_GET['data']['id_ascendant']);
            $class_concept->insert_bdd($bdd);

            $is_ok = true;
            $consol_msg = 'Concept créé';
            $data = $class_concept->get_id();
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;

    case 'change_description':

        if (!isset($_POST['data']) || empty($_POST['data'])
            || empty($_POST['id'])) { break; }

        try {
            $request = $bdd->prepare('UPDATE Concepts SET description = :description
            WHERE id = :id');
            $is_valid_request = $request->bindValue(':description', $_POST['data'], PDO::PARAM_STR);
            $is_valid_request &= $request->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();

            if (!$is_valid_request) { throw new Exception("UPDATE Concepts description échoué"); }

            $is_ok = true;
            $consol_msg = 'Description actualisée';
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;

    case 'change_nom':

        if (!isset($_POST['data']) || empty($_POST['data'])
            || empty($_POST['id'])) { break; }

        try {
            $request = $bdd->prepare('UPDATE Concepts SET nom = :nom
            WHERE id = :id');
            $is_valid_request = $request->bindValue(':nom', $_POST['data'], PDO::PARAM_STR);
            $is_valid_request &= $request->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();

            if (!$is_valid_request) { throw new Exception("UPDATE Concepts nom échoué"); }

            $is_ok = true;
            $consol_msg = 'Nom actualisé';
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;

    case 'change_ascendant':

        if (!isset($_GET['id']) || empty($_GET['id'])
            || !isset($_GET['id_ascendant']) || empty($_GET['id_ascendant']))
        { break; }

        if ($_GET['id'] === $_GET['id_ascendant']) { break; }

        try {
            $request = $bdd->prepare('UPDATE Concepts SET id_ascendant = :id_ascendant
            WHERE id = :id');
            $is_valid_request = $request->bindValue(':id_ascendant', $_GET['id_ascendant'], PDO::PARAM_INT);
            $is_valid_request &= $request->bindValue(':id', $_GET['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();

            if (!$is_valid_request) { throw new Exception("UPDATE Concepts id_ascendant échoué"); }

            $is_ok = true;
            $consol_msg = 'Concept générique modifié';
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));