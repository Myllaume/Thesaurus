<?php

if (!isset($_GET) || empty($_GET['element']) || empty($_GET['critere'])) {
    exit;
}

$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

require '../bdd.php';
$bdd = connexionBdd();

switch ($_GET['element']) {
    case 'personne':
        
        switch ($_GET['critere']) {
            case 'nom':

                if (!isset($_GET['terme']) || empty($_GET['terme'])) {
                    $consol_msg = 'Erreur recherche ' . $_GET['element'] . ' par ' . $_GET['critere'] . ' : aucun terme précisé';
                    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
                    exit;
                }

                $request = $bdd->prepare('SELECT id, nom AS libelle, profession, genre, nationalite
                FROM Personnes WHERE nom LIKE "'. $_GET['terme'] . '%"');
                $is_valid_request &= $request->execute();

                $is_ok = true;
                $consol_msg = 'Succès recherche ' . $_GET['element'] . ' par ' . $_GET['critere'];
                $data = $request->fetchAll(PDO::FETCH_ASSOC);
                break;
        }

        break;
}

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));