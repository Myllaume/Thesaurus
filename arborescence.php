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

function gen_cache($bdd, $concepts_list) {
    if (!$concepts_list) { return; }
    echo '<ul>';

    foreach ($concepts_list as $nb => $value) {
        echo '<li>' . $value['nom'] . '</li>';

        gen_arborescence($bdd, search_ascendant($bdd, $value['id']));
    }

    echo '</ul>';
}

gen_arborescence($bdd, search_ascendant($bdd, 0));