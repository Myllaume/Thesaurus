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

    $concepts_list = $request->fetchAll(PDO::FETCH_ASSOC);
    if (empty($concepts_list)) {
        // Aucun concept trouvé dans la base de données
        return false;
    }

    return $concepts_list;
}