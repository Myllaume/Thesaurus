<?php

function concept_update_description($bdd, $id, $description) {

    $request = $bdd->prepare('UPDATE Concepts SET description = :description
        WHERE id = :id');
    $is_valid_request = $request->bindValue(':description', $description, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Description de concept non actualisé : erreur de base de données"); }
}

function concept_update_nom($bdd, $id, $nom) {

    if (strlen($nom) > 150) {
        throw new Exception("Nom de concept non actualisé : chaîne trop longue"); }

    $request = $bdd->prepare('UPDATE Concepts SET nom = :nom WHERE id = :id');
    $is_valid_request = $request->bindValue(':nom', $nom, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Nom de concept non actualisé : erreur de base de données"); }
}

function concept_update_ascendant($bdd, $id, $id_ascendant) {

    if ($id === $id_ascendant) {
        throw new Exception("Concept générique non actualisé : un concept ne peut être son générique"); }

    $request = $bdd->prepare('UPDATE Concepts SET id_ascendant = :id_ascendant
        WHERE id = :id');
    $is_valid_request = $request->bindValue(':id_ascendant', $id_ascendant, PDO::PARAM_INT);
    $is_valid_request &= $request->bindValue(':id', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Concept générique non actualisé : erreur de base de données"); }
}

function concept_delete_bdd($bdd, $id) {

    $request = $bdd->prepare('DELETE FROM Concepts WHERE id = :id');
    $is_valid_request = $request->bindValue(':id', $id, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Concept non supprimé : erreur de base de données"); }
}

function concept_delete_cache($id) {
    
    $file_path = '../../upload/concept_' . $id . '.json';

    if (file_exists($file_path)) {
        unlink($file_path); }
}