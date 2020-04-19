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

    $request = $bdd->prepare('INSERT INTO Files SET nom_enregistrement=:nom_enregistrement,
        nom_sortie=:nom_sortie, extension=:extension, date=:date, id_concept=:id_concept');
    $is_valid_request = $request->bindValue(':nom_enregistrement', $nom_enregistrement, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':nom_sortie', $nom_fichier, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':extension', $extension_fichier, PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':date', date("Y-m-d"), PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id_concept', $id_concept, PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Fiche non enregistrée : erreur de base de données"); }

    return $bdd->lastInsertId();
}

function fiche_update_content($bdd, $id, $content, $path) {

    $is_updated = file_put_contents($path, $content);

    if (!$is_updated) {
        throw new Exception("Fiche non actualisée : erreur d'enregistrement"); }

    $request = $bdd->prepare('UPDATE Files SET last_edition=:last_edition
        WHERE id = :id');
    $is_valid_request = $request->bindValue(':last_edition', date("Y-m-d"), PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Fiche non actualisée : erreur de base de données"); }
}

function fiche_update_title($bdd, $id, $title) {

    if (strlen($title) > 150) {
        throw new Exception("Nom de fichier non actualisé : chaîne trop longue"); }

    $request = $bdd->prepare('UPDATE Files SET nom_sortie=:nom_sortie, last_edition=:last_edition
        WHERE id = :id');
    $is_valid_request = $request->bindValue(':nom_sortie', $_POST['data'], PDO::PARAM_STR);
    $is_valid_request = $request->bindValue(':last_edition', date("Y-m-d"), PDO::PARAM_STR);
    $is_valid_request &= $request->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
    $is_valid_request &= $request->execute();

    if (!$is_valid_request) {
        throw new Exception("Nom de fichier non actualisé : erreur de base de données"); }
}