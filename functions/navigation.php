<?php

/**
 * -------
 * Requêtes à la base de données
 * -------
 */

/**
 * Function search_descendant
 * Rechercher les lignes dépendantes
 * d'un concept
 * ---
 * @param object $bdd PDO
 * @param int $id > 0
 * @return array $concepts_list Lignes de la bdd
 */

function search_descendant($bdd, $id) {
    $request = $bdd->prepare('SELECT id, nom, id_ascendant FROM Concepts WHERE id_ascendant =' . $id);
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
 * Function search_descendant
 * Rechercher les lignes liées
 * à un concept
 * ---
 * @param object $bdd PDO
 * @param int $id > 0
 * @return array $concepts_list Lignes de la bdd
 */

function search_ascendant($bdd, $id_ascendant) {
    $request = $bdd->prepare('SELECT id, nom, id_ascendant FROM Concepts WHERE id =' . $id_ascendant);
    $is_valid_request = $request->execute();

    if (!$is_valid_request) {
        // Erreur bdd : SELECT Concepts
        return false;
    }

    return $request->fetch(PDO::FETCH_ASSOC);
}

/**
 * Function gen_arborescence
 * Foncton récursive de génération de listes HTML
 * imbriquées correspondant à la hierarchie du thesaurus
 * le tout stocké dans un fichier /cache/arboresence.html
 * ---
 * @param object $bdd PDO
 * @param array $concepts_list Liste de lignes de la base de données
 */

function gen_arborescence($bdd, $concepts_list) {
    if (!$concepts_list) { return; }
    $open_list = '<ul class="arborescence__section">';
    file_put_contents('../../cache/arboresence.html', $open_list, FILE_APPEND);

    foreach ($concepts_list as $nb => $value) {
        $elt = '<li class="arborescence__elt" data-id="' . $value['id'] . '"><span>' . $value['nom'] . '<span></li>';
        file_put_contents('../../cache/arboresence.html', $elt, FILE_APPEND);

        gen_arborescence($bdd, search_descendant($bdd, $value['id']));
    }

    $close_list = '</ul>';
    file_put_contents('../../cache/arboresence.html', $close_list, FILE_APPEND);
}

function gen_select($bdd, $concepts_list) {
    if (!$concepts_list) { return; }
    $open_list = '<optgroup>';
    file_put_contents('../../cache/select-concepts.html', $open_list, FILE_APPEND);

    foreach ($concepts_list as $nb => $value) {
        $elt = '<option value="' . $value['id'] . '">' . $value['nom'] . '</option>';
        file_put_contents('../../cache/select-concepts.html', $elt, FILE_APPEND);

        gen_select($bdd, search_descendant($bdd, $value['id']));
    }

    $close_list = '</optgroup>';
    file_put_contents('../../cache/select-concepts.html', $close_list, FILE_APPEND);
}