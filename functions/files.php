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