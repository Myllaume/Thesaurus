<?php

function create_JSON_from_array($array, $path) {
    $JSON_content = json_encode($array, JSON_UNESCAPED_UNICODE);
    file_put_contents($path, $JSON_content);
}

function create_CSV_from_array($array, $path, $entete) {
    $CSV_file = fopen($path, 'w');

    fputcsv($CSV_file, $entete);

    foreach ($array as $line) {
        fputcsv($CSV_file, $line);
    }

    fclose($CSV_file);
}

/**
 * Function gen_arborescence
 * Obtenir un tableau à partir d'un fichier CSV
 * ---
 * @param string $path Chemin vers le fichier CSV à transformer
 * @return array Tableau contenant pour chaque ligne du fichier CSV un tableau
 */

function CSV_file_to_array($path) {
    $return_tab = [];

    $csv_file = file_get_contents($path);
    $CSV_rows = str_getcsv($csv_file, "\n");

    foreach($CSV_rows as &$row) {
        // le séparateur défini ci-dessous comme virgule
        $row = str_getcsv($row, ",");
        array_push($return_tab, $row);
    }
    
    return $return_tab;
}