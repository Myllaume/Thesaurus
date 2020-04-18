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
            $consol_msg = $error;
        }
        break;

    case 'change_fiche_content':

        if (!isset($_POST['data']) || empty($_POST['data'])
            || empty($_POST['id']) || !isset($_POST['path']) || empty($_POST['path'])) { break; }

        try {
            file_put_contents($_POST['path'], $_POST['data']);

            $request = $bdd->prepare('UPDATE Files SET last_edition=:last_edition
            WHERE id = :id');
            $is_valid_request = $request->bindValue(':last_edition', date("Y-m-d"), PDO::PARAM_STR);
            $is_valid_request &= $request->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();

            if (!$is_valid_request) { throw new Exception("UPDATE Files last_edition échoué"); }

            $is_ok = true;
            $consol_msg = 'Fiche actualisée';
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;

    case 'change_fiche_title':

        if (!isset($_POST['data']) || empty($_POST['data'])
            || !isset($_POST['id']) || empty($_POST['id'])) {

            $consol_msg = 'Changement de titre de fiche impossible :
                des données sont manquantes/vide : data, id';
            break;
        }

        try {
            $request = $bdd->prepare('UPDATE Files SET nom_sortie=:nom_sortie, last_edition=:last_edition
            WHERE id = :id');
            $is_valid_request = $request->bindValue(':nom_sortie', $_POST['data'], PDO::PARAM_STR);
            $is_valid_request = $request->bindValue(':last_edition', date("Y-m-d"), PDO::PARAM_STR);
            $is_valid_request &= $request->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();

            if (!$is_valid_request) { throw new Exception("UPDATE Files nom_sortie échoué"); }

            $is_ok = true;
            $consol_msg = 'Nom de fichier actualisé';
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

        case 'change_employe':

            if (!isset($_POST['data']) || empty($_POST['data'])
            || empty($_POST['id'])) { break; }
    
            $_POST['data'] = explode("\n", $_POST['data']);

            try {
                $request_del = $bdd->prepare('DELETE FROM Emplois WHERE id_concept=:id_concept');
                $is_valid_request_del = $request_del->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);
                $is_valid_request_del &= $request_del->execute();

                if (!$is_valid_request_del) { break; }

                $request_add = $bdd->prepare('INSERT INTO Emplois SET id_concept=:id_concept, nom=:nom');
                foreach ($_POST['data'] as $nb_valeur => $libelle) {
                    $is_valid_request_add = $request_add->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);
                    $is_valid_request_add &= $request_add->bindValue(':nom', $libelle, PDO::PARAM_STR);
                    $is_valid_request_add &= $request_add->execute();
                    
                    if (!$is_valid_request_add) {break 2;}
                }
    
                $is_ok = true;
                $consol_msg = 'Termes employés modifiés';
            } catch (Exception $error) {
                $consol_msg = $error;
            }
            break;

        case 'change_document':

            if (!isset($_POST['data']) || empty($_POST['data'])
            || empty($_POST['id'])) { break; }
    
            $_POST['data'] = explode("\n", $_POST['data']);

            try {

                $request_del = $bdd->prepare('DELETE FROM Documents WHERE id_concept=:id_concept');
                $is_valid_request_del = $request_del->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);
                $is_valid_request_del &= $request_del->execute();

                if (!$is_valid_request_del) { break; }

                $request_add = $bdd->prepare('INSERT INTO Documents SET
                titre=:titre, auteur=:auteur, editeur=:editeur, annee=:annee, type=:type,
                identifiant=:identifiant, id_concept=:id_concept');

                foreach ($_POST['data'] as $ligne) {
                    $ligne = explode(", ", $ligne);
                    $ligne_tab = [];

                    $ligne_tab['titre'] = $ligne[0];
                    $is_valid_request_add = $request_add->bindValue(':titre', $ligne[0], PDO::PARAM_STR);

                    $ligne_tab['auteur'] = $ligne[1];
                    $is_valid_request_add &= $request_add->bindValue(':auteur', $ligne[1], PDO::PARAM_STR);

                    $ligne_tab['editeur'] = $ligne[2];
                    $is_valid_request_add &= $request_add->bindValue(':editeur', $ligne[2], PDO::PARAM_STR);

                    $ligne_tab['annee'] = $ligne[3];
                    $is_valid_request_add &= $request_add->bindValue(':annee', $ligne[3], PDO::PARAM_INT);

                    $ligne_tab['type'] = $ligne[4];
                    $is_valid_request_add &= $request_add->bindValue(':type', $ligne[4], PDO::PARAM_STR);

                    $ligne_tab['identifiant'] = $ligne[5];
                    $is_valid_request_add &= $request_add->bindValue(':identifiant', $ligne[5], PDO::PARAM_STR);

                    array_push($data, $ligne_tab);

                    $is_valid_request_add &= $request_add->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);

                    $is_valid_request_add &= $request_add->execute();

                    if (!$is_valid_request_add) {break 2;}
                }
    
                $is_ok = true;
                $consol_msg = 'Termes employés modifiés';
            } catch (Exception $error) {
                $consol_msg = $error;
            }
            break;

        case 'change_personne':

            if (!isset($_POST['data']) || empty($_POST['data'])
            || empty($_POST['id'])) { break; }

            try {
                $request_count = $bdd->prepare('SELECT COUNT(id) FROM Personnes WHERE id=:id');

                $request_update = $bdd->prepare('UPDATE Personnes SET nom=:nom, profession=:profession,
                    genre=:genre, nationalite=:nationalite WHERE id=:id');

                $request_add = $bdd->prepare('INSERT INTO Personnes SET
                    nom=:nom, profession=:profession, genre=:genre, nationalite=:nationalite');
                
                $request_link = $bdd->prepare('INSERT INTO Concepts_Personnes SET
                    id_concept=:id_concept, id_personne=:id_personne');

                foreach ($_POST['data'] as $ligne) {

                    if (isset($ligne[4]) && !empty($ligne[4])) {
                        $is_valid_request_count = $request_count->bindValue(':id', $ligne[4], PDO::PARAM_INT);
                        $is_valid_request_count &= $request_count->execute();

                        if ($request_count->fetchColumn() != 0) {
                            $is_valid_request_update = $request_update->bindValue(':nom', $ligne[0], PDO::PARAM_STR);
                            $is_valid_request_update &= $request_update->bindValue(':profession', $ligne[1], PDO::PARAM_STR);
                            $is_valid_request_update &= $request_update->bindValue(':genre', $ligne[2], PDO::PARAM_STR);
                            $is_valid_request_update &= $request_update->bindValue(':nationalite', $ligne[3], PDO::PARAM_STR);
                            
                            // $is_valid_request_link = $request_link->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);
                            // $is_valid_request_link &= $request_link->bindValue(':id_personne', $ligne[4], PDO::PARAM_INT);
                            // $is_valid_request_link &= $request_link->execute();
                        }

                    } else { 
                        $is_valid_request_add = $request_add->bindValue(':nom', $ligne[0], PDO::PARAM_STR);
                        $is_valid_request_add &= $request_add->bindValue(':profession', $ligne[1], PDO::PARAM_STR);
                        $is_valid_request_add &= $request_add->bindValue(':genre', $ligne[2], PDO::PARAM_STR);
                        $is_valid_request_add &= $request_add->bindValue(':nationalite', $ligne[3], PDO::PARAM_STR);
                        $is_valid_request_add &= $request_add->execute();

                        $id_personne = $bdd->lastInsertId();
                        
                        $is_valid_request_link = $request_link->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);
                        $is_valid_request_link &= $request_link->bindValue(':id_personne', $id_personne, PDO::PARAM_INT);
                        $is_valid_request_link &= $request_link->execute();
                    }
                }
    
                $data = $_POST;
                $is_ok = true;
                $consol_msg = 'Personnes';
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

    case 'add_associe':

        if (!isset($_GET['id']) || empty($_GET['id'])
            || !isset($_GET['id_associe']) || empty($_GET['id_associe']))
        { break; }

        if ($_GET['id'] === $_GET['id_associe']) { break; }

        try {
            $request = $bdd->prepare('INSERT INTO Associations SET id_concept=:id_concept, id_associe=:id_associe');
            $is_valid_request = $request->bindValue(':id_concept', $_GET['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->bindValue(':id_associe', $_GET['id_associe'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();

            if (!$is_valid_request) { throw new Exception("INSERT INTO Associations échoué"); }

            $is_ok = true;
            $consol_msg = 'Association créée';
        } catch (Exception $error) {
            $consol_msg = $error;
        }
        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));