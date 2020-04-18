<?php

function association_insert_bdd($bdd, $id_concept, $id_associe) {

    if ($id_concept === $id_associe) {
        throw new Exception("Concept associé non enregistré : un concept ne peut être son associé"); }

    $request = $bdd->prepare('INSERT INTO Associations
    SET id_concept=:id_concept, id_associe=:id_associe');
    $is_valid_request = $request->bindValue(':id_concept', $id_concept, PDO::PARAM_INT);
    $is_valid_request &= $request->bindValue(':id_associe', $id_associe, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Concept associé non enregistré : erreur de base de données"); }
}