<?php

define('FILE_UPLOAD_PATH', '../../upload/');

function fiche_gen_nom_enregistrement() {
    $rand_string = str_shuffle('abcdefghijklmnopqrstuvwxyz');
    return substr($rand_string, 4, -6);
}

/**
 * @param object $bdd PDO database
 * @param int $id_concept 0 -> infini
 * @param string $extension_fichier ex : 'txt'
 * @param string $nom_enregistrement Nom temporaire du fichier
 * @param string $nom_fichier Nom original du fichier - default : 'Sans titre'
 * @return int identifiant inséré
 */

function fiche_insert_bdd($bdd, $id_concept, $extension_fichier,
    $nom_enregistrement, $nom_fichier = 'Sans titre') {

    $date_enregistrement = date("Y-m-d"); // = aujourd'hui

    $request = $bdd->prepare('INSERT INTO Files SET nom_enregistrement=:nom_enregistrement,
        nom_sortie=:nom_sortie, extension=:extension, date=:date, id_concept=:id_concept');
    $is_valid_request = $request->bindValue(':nom_enregistrement', $nom_enregistrement, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':nom_sortie', $nom_fichier, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':extension', $extension_fichier, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':date', $date_enregistrement, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id_concept', $id_concept, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    return $bdd->lastInsertId();
}