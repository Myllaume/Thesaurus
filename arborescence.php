<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

/**
 * -------
 * Connexion à la base de données
 * -------
 */

include './core/bdd.php';
$bdd = connexionBdd();

function search_ascendant($bdd, $id) {
    $request = $bdd->prepare('SELECT * FROM Concepts WHERE id_ascendant =' . $id);
    $is_valid_request = $request->execute();

    if (!$is_valid_request) {
        // Erreur bdd : SELECT Concepts
        return false;
    }

    $concepts_list = $request->fetchAll(PDO::FETCH_ASSOC);
    if (empty($concepts_list)) {
        // Aucun concept trouvé dans la base de données
        return false;
    }

    return $concepts_list;
}

function create_JSON_from_array($array, $path) {
    $JSON_content = json_encode($array, JSON_UNESCAPED_UNICODE);
    file_put_contents($path, $JSON_content);
}

function create_CSV_from_array($array, $path, $entete) {
    $CSV_file = fopen($path, 'w');

    fputcsv($CSV_file, $entete);

    foreach ($array as $line) {
        fputcsv($CSV_file, $line);
    }

    fclose($CSV_file);
}

/**
 * -------
 * Génration de l'arborescence
 * -------
 */

function gen_arborescence($bdd, $concepts_list) {
    if (!$concepts_list) { return; }
    echo '<ul>';

    foreach ($concepts_list as $nb => $value) {
        echo '<li>' . $value['nom'] . '</li>';

        gen_arborescence($bdd, search_ascendant($bdd, $value['id']));
    }

    echo '</ul>';
}

gen_arborescence($bdd, search_ascendant($bdd, 0));

gen_cache($bdd);

function gen_cache($bdd) {
    $array = [];

    $request = $bdd->prepare('SELECT * FROM Concepts');
    $is_valid_request = $request->execute();

    if (!$is_valid_request) {
        // Erreur bdd : SELECT Concepts
        return false;
    }

    $concepts_list = $request->fetchAll(PDO::FETCH_ASSOC);
    if (empty($concepts_list)) {
        // Aucun concept trouvé dans la base de données
        return false;
    }

    foreach ($concepts_list as $nb => $value) {
        array_push($array, [
            'id' => $value['id'],
            'nom' => $value['nom'],
            'id_ascendant' => $value['id_ascendant']
        ]);
    }

    create_CSV_from_array($array, './cache.csv', ['id', 'nom', 'id_ascendant']);
    // create_JSON_from_array($array, './cache.json');
}

