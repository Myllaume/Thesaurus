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
    
    case 'arborescence':
        require '../../functions/navigation.php';


        try {
            file_put_contents('../../cache/arboresence.html', ''); // vider /cache/arboresence.html
            gen_arborescence($bdd, search_descendant($bdd, 0));
        } catch (Exception $error) {
            // message d'erreur à $error
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