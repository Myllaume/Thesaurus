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
                    'type_id' => $class_concept->get_id_type(),
                    'description' => $class_concept->get_description()
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

            $is_ok = true;
            $consol_msg = 'Arborescence générée.';
        } catch (Exception $error) {
            $consol_msg = 'Erreur de génération arborescence : ' . $error;
        }

        break;
    
    case 'select_concept':
        require '../../functions/navigation.php';

        try {
            include '../models/concept.php';
            
            $html = '<option value="0"></option>';
            foreach (Concept::import_bdd($bdd) as $ligne_nb => $ligne) {
                $html .= '<option value="' . $ligne['id'] . '" >' . $ligne['nom'] . '</option>';
            }
            file_put_contents('../../cache/select_concept.html', $html);

            $is_ok = true;
            $consol_msg = 'Select des concepts généré.';
        } catch (Exception $error) {
            $consol_msg = 'Erreur de select de concepts : ' . $error;
        }

        break;

    case 'select_type':
        $request = $bdd->prepare('SELECT * FROM Types');
        $is_valid_request = $request->execute();

        if (!$is_valid_request) {
            $consol_msg = 'Erreur bdd : SELECT Types';
            json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
            exit;
        }

        $type_list = $request->fetchAll(PDO::FETCH_ASSOC);
        if (empty($type_list)) {
            $consol_msg = 'Aucun type trouvé dans la base de données';
            json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
            exit;
        }

        $html = '';
        foreach ($type_list as $ligne_nb => $ligne) {
            $html .= '<option value="' . $ligne['id'] . '">' . $ligne['nom'] . '</option>';
        }

        file_put_contents('../../cache/select_type.html', $html);

        $is_ok = true;
        $consol_msg = 'Génération réussie.';

        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));