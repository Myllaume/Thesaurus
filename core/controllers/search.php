<?php

$is_ok = false;
$data = [];

if (!isset($_GET) || !isset($_GET['objet']) || empty($_GET['objet'])
    || !isset($_GET['critere']) || empty($_GET['critere'])
    || !isset($_GET['terme']) || !isset($_GET['sort']) || !isset($_GET['render'])) {
        
    $consol_msg = 'Recherche impossible : informations manquantes.';
    echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();

if ($_GET['sort'] == 'decroissant') { $order = 'DESC'; }
else { $order = 'ASC'; }

$request = $bdd->prepare('SELECT * FROM '.$_GET['objet'].' ORDER BY :critere ' . $order);
$is_valid_request &= $request->bindValue(':critere', $_GET['critere'], PDO::PARAM_STR);

if (!empty($_GET['terme'])) {
    $request = $bdd->prepare('SELECT * FROM '.$_GET['objet'].' WHERE :critere LIKE ":terme" ORDER BY :critere ' . $order);
    $is_valid_request &= $request->bindValue(':critere', $_GET['critere'], PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':terme', $_GET['terme'].'%', PDO::PARAM_STR);
}

try {
    
    $is_valid_request &= $request->execute();
    $data = $request->fetchAll(PDO::FETCH_ASSOC);
    
} catch (Exception $error) {
    $consol_msg = $error;
}

switch ($_GET['render']) {
    case 'table':
        $table = '<table><thead><tr><th>Nom</th><tr></thead><tbody>';
        foreach ($data as $ligne) {
            $table .= '<tr><td>' . $ligne[$_GET['critere']] . '</td></tr>';
        }
        $table .= '</tbody></table>';

        $data = $table;
        break;
}

$is_ok = true;
$consol_msg = 'Fonctionne.';

echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));