<?php

function document_insert_bdd($bdd, $titre, $auteur, $editeur, $annee, $type, $identifiant) {

    if (strlen($titre) > 255) {
        throw new Exception("Document non enregistré : titre trop long"); }
    if (strlen($auteur) > 150) {
        throw new Exception("Document non enregistré : nom auteur trop long"); }
    if (strlen($editeur) > 150) {
        throw new Exception("Document non enregistré : nom éditeur trop long"); }
    // if ($annee <= 0 || $annee > date("Y")) {
    //     throw new Exception("Document non enregistré : date impossible"); }
    // if ($type != 'page web' || $type != 'livre') {
    //     throw new Exception("Document non enregistré : type invalide"); }
    if (strlen($identifiant) > 255) {
        throw new Exception("Document non enregistré : identifiant auteur trop long"); }

    $request = $bdd->prepare('INSERT INTO Documents SET titre=:titre, auteur=:auteur,
        editeur=:editeur, annee=:annee, type=:type, identifiant=:identifiant');
    $is_valid_request = $request->bindValue(':titre', $titre, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':auteur', $auteur, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':editeur', $editeur, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':annee', $annee, PDO::PARAM_INT);
    $is_valid_request &= $request->bindValue(':type', $type, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Document non enregistrée : erreur de base de données"); }

    return $bdd->lastInsertId();
}

function document_update_bdd($bdd, $id, $titre, $auteur, $editeur, $annee, $type, $identifiant) {

    if (strlen($titre) > 255) {
        throw new Exception("Document non enregistré : titre trop long"); }
    if (strlen($auteur) > 150) {
        throw new Exception("Document non enregistré : nom auteur trop long"); }
    if (strlen($editeur) > 150) {
        throw new Exception("Document non enregistré : nom éditeur trop long"); }
    // if ($annee <= 0 || $annee > date("Y")) {
    //     throw new Exception("Document non enregistré : date impossible"); }
    // if ($type != 'page web' || $type != 'livre') {
    //     throw new Exception("Document non enregistré : type invalide"); }
    if (strlen($identifiant) > 255) {
        throw new Exception("Document non enregistré : identifiant auteur trop long"); }

    $request = $bdd->prepare('UPDATE Documents SET titre=:titre, auteur=:auteur,
        editeur=:editeur, annee=:annee, type=:type, identifiant=:identifiant WHERE id=:id');
    $is_valid_request = $request->bindValue(':titre', $titre, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':auteur', $auteur, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':editeur', $editeur, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':annee', $annee, PDO::PARAM_INT);
    $is_valid_request &= $request->bindValue(':type', $type, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':identifiant', $identifiant, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Document non enregistrée : erreur de base de données"); }

    return $bdd->lastInsertId();
}

function document_select_by_ids_bdd($bdd, $array_ids) {

    if (empty($array_ids)) {
        throw new Exception("Selection de documents : aucun id reçu"); }

    $sql = 'SELECT * FROM Documents WHERE ';

    foreach ($array_ids as $id) {
        if (!is_int($id)) {
            throw new Exception("Selection de documents : les id doivent être des entiers"); }

        $sql .= 'id = ' . $id . ' OR ';
    }

    $request = $bdd->prepare(substr($sql, 0, -4));
    $is_valid_request = $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Aucun document trouvé : erreur de base de données"); }

    $result = $request->fetchAll(PDO::FETCH_ASSOC);

    if (empty($result)) {
        return false; }
    else {
        return $result; }
}

function document_unlink_concept($bdd, $id) {

    $request = $bdd->prepare('DELETE FROM Concepts_Documents WHERE id_document = :id');
    $is_valid_request = $request->bindValue(':id', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Aucun lien de document vers concept supprimé : erreur de base de données"); }
}

function document_link_concept($bdd, $id, $id_concept) {

    $request = $bdd->prepare('INSERT INTO Concepts_Documents SET id_document=:id_document,
    id_concept=:id_concept');
    $is_valid_request = $request->bindValue(':id_document', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->bindValue(':id_concept', $id_concept, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Aucun document reliré à un concept : erreur de base de données"); }
}