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

        if (!isset($_GET['nom']) || empty($_GET['nom'])
            || !isset($_GET['id_ascendant']))
        { break; }

        require '../models/concept.php';
        $class_concept = new Concept;

        try {
            $class_concept->set_nom($_GET['nom']);
            $class_concept->set_id_ascendant($_GET['id_ascendant']);
            $class_concept->insert_bdd($bdd);

            $is_ok = true;
            $consol_msg = 'Concept créé';
            $data = $class_concept->get_id();
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'delete_concept':

        if (!isset($_GET['id']) || empty($_GET['id'])) {

            $consol_msg = 'Suppression concept impossible :
                des données sont manquantes/vides : id';
            break;
        }

        try {
            include '../models/concept_new.php';
            concept_delete_bdd($bdd, $_GET['id']);
            concept_delete_cache($_GET['id']);

            $is_ok = true;
            $consol_msg = 'Concept supprimé';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'add_fiche':

        if (!isset($_GET['id']) || empty($_GET['id'])) {

            $consol_msg = 'Création de fiche impossible :
                des données sont manquantes/vides : id';
            break;
        }

        try {
            include '../models/fiche.php';
            $nom_enregistrement = fiche_gen_nom_enregistrement();

            file_put_contents('../../upload/' . $nom_enregistrement . '.md', '');

            $id_file = fiche_insert_bdd($bdd, $_GET['id'], 'md',
                $nom_enregistrement);

            $data = [
                'id' => $id_file,
                'nom_enregistrement' => $nom_enregistrement,
                'nom_sortie' => 'Sans titre',
                'extension' => 'md'
            ];

            $is_ok = true;
            $consol_msg = 'Fiche créée';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'delete_fiche':

        if (!isset($_GET['id']) || empty($_GET['id'])) {

            $consol_msg = 'Suppression fiche impossible :
                des données sont manquantes/vides : id';
            break;
        }

        try {
            include '../models/fiche.php';
            fiche_delete_bdd($bdd, $_GET['id']);

            $is_ok = true;
            $consol_msg = 'Fiche supprimé';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'change_fiche_content':

        if (!isset($_POST['id']) || empty($_POST['id'])
        || !isset($_POST['data']) || empty($_POST['data'])
        || !isset($_POST['path']) || empty($_POST['path'])) {

            $consol_msg = 'Changement contenu fiche impossible :
                des données sont manquantes/vides : id, data, path';
            break;
        }

        try {
            include '../models/fiche.php';
            fiche_update_content($bdd, $_POST['id'], $_POST['data'], $_POST['path']);

            $is_ok = true;
            $consol_msg = 'Fiche actualisée';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'change_fiche_title':

        if (!isset($_POST['id']) || empty($_POST['id'])
            || !isset($_POST['data']) || empty($_POST['data'])) {

            $consol_msg = 'Changement de titre de fichier impossible :
                des données sont manquantes/vides : id, data';
            break;
        }

        try {
            include '../models/fiche.php';
            fiche_update_title($bdd, $_POST['id'], $_POST['data']);

            $is_ok = true;
            $consol_msg = 'Nom de fichier actualisé';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;
    
    case 'change_description':

        if (!isset($_POST['id']) || empty($_POST['id'])
            || !isset($_POST['data']) || empty($_POST['data'])) {

            $consol_msg = 'Changement de description de concept impossible :
                des données sont manquantes/vides : id, data';
            break;
        }

        try {
            include '../models/concept_new.php';
            concept_update_description($bdd, $_POST['id'], $_POST['data']);

            $is_ok = true;
            $consol_msg = 'Description actualisée';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'change_nom':

        if (!isset($_POST['id']) || empty($_POST['id'])
            || !isset($_POST['data']) || empty($_POST['data'])) {

            $consol_msg = 'Changement de nom de concept impossible :
                des données sont manquantes/vides : id, data';
            break;
        }

        try {
            include '../models/concept_new.php';
            concept_update_nom($bdd, $_POST['id'], $_POST['data']);

            $is_ok = true;
            $consol_msg = 'Nom actualisé';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

        case 'change_employe':

            if (!isset($_POST['id']) || empty($_POST['id'])
                || !isset($_POST['data']) || empty($_POST['data'])) {

                $consol_msg = 'Changement de termes employés impossible :
                    des données sont manquantes/vides : id, data';
                break;
            }

            try {
                include '../models/emplois.php';
                emplois_delete_bdd($bdd, $_POST['id']);

                $_POST['data'] = explode("\n", $_POST['data']);

                emplois_insert_mass_bdd($bdd, $_POST['id'], $_POST['data']);
    
                $is_ok = true;
                $consol_msg = 'Termes employés modifiés';
            } catch (Exception $error) {
                $consol_msg = $error->getMessage(); }

            break;

    case 'change_ascendant':

        if (!isset($_GET['id']) || empty($_GET['id'])
            || !isset($_GET['id_ascendant']) || empty($_GET['id_ascendant'])) {

            $consol_msg = 'Changement de concept ascendant impossible :
                des données sont manquantes/vides : id, id_ascendant';
            break;
        }

        try {
            include '../models/concept_new.php';
            concept_update_ascendant($bdd, $_GET['id'], $_GET['id_ascendant']);

            $is_ok = true;
            $consol_msg = 'Concept générique modifié';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'add_associe':

        if (!isset($_GET['id']) || empty($_GET['id'])
            || !isset($_GET['id_associe']) || empty($_GET['id_associe'])) {

            $consol_msg = 'Changement de concept associé impossible :
                des données sont manquantes/vides : id, id_associe';
            break;
        }

        try {
            include '../models/association.php';
            association_insert_bdd($bdd, $_GET['id'], $_GET['id_associe']);

            $is_ok = true;
            $consol_msg = 'Association créée';
        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;

    case 'documents':

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
        $data['reste'] = [];
        $data['docs_ids'] = [];

        try {

            include '../models/document.php';

            $form_documents = $_POST['data'];

            $form_documents_length = count($form_documents);

            for ($i = 0 ; $i < $form_documents_length ; $i++) {
                if (empty($form_documents[$i]['titre'])) {
                    array_push($data['delete'], $form_documents[$i]['id']);
                    continue;
                }

                if (!isset($form_documents[$i]['id'])) {
                    array_push($data['insert'], $form_documents[$i]);
                    continue;
                }

                array_push($data['docs_ids'], intval($form_documents[$i]['id']));
                array_push($data['reste'], $form_documents[$i]);
            }

            unset($form_documents);

            $bdd_documents = document_select_by_ids_bdd($bdd, $data['docs_ids']);

            $form_documents_length = count($data['reste']);

            for ($i = 0 ; $i < $form_documents_length ; $i++) {
                $differences_tab = array_diff($data['reste'][$i], $bdd_documents[$i]);
                
                if (empty($differences_tab)) {
                    array_push($data['none'], $data['reste'][$i]); }
                else {
                    array_push($data['update'], $data['reste'][$i]); }
            }

            foreach ($data['delete'] as $document_id) {
                document_unlink_concept($bdd, $document_id);
            }
            foreach ($data['insert'] as $document) {
                $id = document_insert_bdd($bdd, 'insert', $document['titre'], $document['auteur'],
                    $document['editeur'], $document['annee'], $document['type'], $document['identifiant']);
                document_link_concept($bdd, $id, $_POST['id']);
            }
            foreach ($data['update'] as $document) {
                document_update_bdd($bdd, 'update', $document['id'], $document['titre'], $document['auteur'],
                    $document['editeur'], $document['annee'], $document['type'], $document['identifiant']);
            }

            $data = [];
            $is_ok = true;
            $consol_msg = 'Document enregistré.';

        } catch (Exception $error) {
            $consol_msg = $error->getMessage(); }

        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));