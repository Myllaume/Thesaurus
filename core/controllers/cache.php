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

switch ($_GET['element']) {
    
    case 'concept':
        require '../../functions/navigation.php';

        if (!isset($_GET['id']) || empty($_GET['id'])) {
            $consol_msg = 'Aucun identifiant de concept renseigné';
            json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
            exit;
        }

        try {
            require '../models/concept.php';
            $class_concept = new Concept;
            $class_concept->set_id($_GET['id']);
            $class_concept->select_bdd($bdd);
            $concept_id_ascendant = $class_concept->get_id_ascendant();
            
            $is_ok = true;
            $consol_msg = 'Données acquises.';
            $data = [
                'notice' => [
                    'description' => $class_concept->get_description(),
                    'document' => $class_concept->select_document_bdd($bdd)
                ],
                'matrice' => [
                    'nom' => $class_concept->get_nom(),
                    'concept_specifique' => search_descendant($bdd, $_GET['id']),
                    'concept_generique' => search_ascendant($bdd, $concept_id_ascendant),
                    'concept_associe' => $class_concept->select_associe_bdd($bdd),
                    'concept_employe' => $class_concept->select_employe_bdd($bdd)
                ],
                'fiche' => $class_concept->select_fiche_bdd($bdd)
            ];

            file_put_contents('../../cache/concept_' . $_GET['id'] . '.json', 
                json_encode($data, JSON_UNESCAPED_UNICODE));

        } catch (Exception $error) {
            $consol_msg = 'Erreur de génération : ' . $error;
        }

        break;
    
    case 'arborescence':
        require '../../functions/navigation.php';

        try {
            file_put_contents('../../cache/arboresence.html', ''); // vider /cache/arboresence.html
            gen_arborescence($bdd, search_descendant($bdd, 0));

            clearstatcache();
            if(filesize('../../cache/arboresence.html')) {
                $is_ok = true;
                $consol_msg = 'Arborescence générée.';
            } else {
                $is_ok = false;
                $consol_msg = 'arborescence vide';
            }

        } catch (Exception $error) {
            $consol_msg = 'Erreur de génération arborescence : ' . $error;
        }

        break;

    case 'fiche':
        try {
            if (!isset($_GET['id']) || empty($_GET['id'])) {
                $consol_msg = 'Aucun identifiant de fiche renseigné';
                json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
                exit;
            }

            $request = $bdd->prepare('SELECT nom_enregistrement, extension FROM Files WHERE id=:id');
            $is_valid_request = $request->bindValue(':id', $_GET['id'], PDO::PARAM_INT);
            $is_valid_request &= $request->execute();
            
            if (!$is_valid_request) { throw new Exception("Erreur bdd : SELECT Files"); }
            $fiche_metas = $request->fetch(PDO::FETCH_ASSOC);

            $path = '../../upload/' . $fiche_metas['nom_enregistrement'] . '.' . $fiche_metas['extension'];
            $data['path'] = $path;

            if (isset($_GET['markdown']) && $_GET['markdown'] == 'true') {
                $data['content'] = file_get_contents($path);
            } else {
                include_once '../../libs/Parsedown.php';
                include_once '../../functions/files.php';
                $data['content'] = markdown_to_html($path);
            }

            // file_put_contents('../../cache/' . $fiche_metas['nom_enregistrement'] . '.html', $data);

            $is_ok = true;
            $consol_msg = 'Fiche générée.';
        } catch (Exception $error) {
            $consol_msg = 'Erreur de génération index : ' . $error;
        }

        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));