<?php

function emplois_delete_bdd($bdd, $id_concept) {

    $request = $bdd->prepare('DELETE FROM Emplois WHERE id_concept=:id_concept');
    $is_valid_request = $request->bindValue(':id_concept', $_POST['id'], PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Termes employés non supprimés : erreur de base de données"); }
}

function emplois_insert_mass_bdd($bdd, $id_concept, $elts_tab) {

    $request = $bdd->prepare('INSERT INTO Emplois SET id_concept=:id_concept, nom=:nom');

    foreach ($elts_tab as $valeur_nb => $valeur) {
        $is_valid_request = $request->bindValue(':id_concept', $id_concept, PDO::PARAM_INT);
        $is_valid_request &= $request->bindValue(':nom', $valeur, PDO::PARAM_STR);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception("Termes employés non enregistrés : erreur de base de données"); }
    }
}