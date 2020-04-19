<?php

// function document_select_by_ids_bdd($bdd, $array_ids) {

//     $request = $bdd->prepare('SELECT * FROM Documents
//         INNER JOIN Concepts_Documents ON Documents.id = Concepts_Documents.id_document
//         WHERE id_concept = :id');
//     $is_valid_request = $request->bindValue(':id', $id, PDO::PARAM_INT);
//     $is_valid_request &= $request->execute();

//     if (!$is_valid_request) {
//         throw new Exception("Aucun document trouvé : erreur de base de données"); }

//     $result = $request->fetchAll(PDO::FETCH_ASSOC);

//     if (empty($result)) {
//         return false; }
//     else {
//         return $result; }
// }

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