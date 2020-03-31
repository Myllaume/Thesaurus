<?php

/**
 * -------
 * Requêtes à la base de données
 * -------
 */

/**
 * Function search_ascendant
 * Rechercher les lignes liées à un concept
 * en tant que concept générique
 * ---
 * @param object $bdd PDO
 * @param int $id > 0
 * @return array $concepts_list Lignes de la bdd
 */

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
 * GÉNÉRATIONS
 * -------
 */

/**
 * Function gen_arborescence
 * Foncton récursive de génération de listes HTML
 * imbriquées correspondant à la hierarchie du thesaurus
 * ---
 * @param object $bdd PDO
 * @param array $concepts_list Liste de lignes de la base de données
 */

function gen_arborescence($bdd, $concepts_list) {
    if (!$concepts_list) { return; }
    echo '<ul class="arborescence__section">';

    foreach ($concepts_list as $nb => $value) {
        echo '<li class="arborescence__elt" data-id="' . $value['id'] . '">' . $value['nom'] . '</li>';

        gen_arborescence($bdd, search_ascendant($bdd, $value['id']));
    }

    echo '</ul>';
}

/**
 * Function gen_cache
 * Génération dans un tableau d'une copie des
 * données de la table Concepts
 * ---
 * @param object $bdd PDO
 * @return array $ligne_list Tableau contenant un tableau
 * pour chaque ligne de la base de données
 */

function gen_cache($bdd) {
    $ligne_list = [];

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
        array_push($ligne_list, [
            'id' => $value['id'],
            'nom' => $value['nom'],
            'id_ascendant' => $value['id_ascendant']
        ]);
    }

    return $ligne_list;
}