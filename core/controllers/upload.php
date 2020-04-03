<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

if (isset($_POST) && !empty($_FILES['fichier'])) {
    echo '<pre>';
    print_r($_FILES['fichier']);
    echo '</pre>';

    $extension_fichier = pathinfo($_FILES['fichier']['name'], PATHINFO_EXTENSION);
    $extensions_valid = ['md', 'pdf', 'jpg', 'png', 'txt'];

    $path_destination = './upload/';
    $rand_string = str_shuffle('abcdefghijklmnopqrstuvwxyz');
    $nom_enregistrement = substr($rand_string, 4, -6);
    $nom_sortie = str_replace('.' . $extension_fichier, '', $_FILES['fichier']['name']);

    if ($_FILES['fichier']['size'] < 2000000
        && in_array($extension_fichier, $extensions_valid)
        && strlen($nom_sortie) <= 150
        && is_uploaded_file($_FILES['fichier']['tmp_name'])) {
        
        move_uploaded_file($_FILES['fichier']['tmp_name'],
            $path_destination . $nom_enregistrement . '.' .$extension_fichier);

        $request = $bdd->prepare('INSERT INTO Files SET nom_enregistrement=:nom_enregistrement,
            nom_sortie=:nom_sortie, extension=:extension');
        $is_valid_request = $request->bindValue(':nom_enregistrement', $nom_enregistrement, PDO::PARAM_STR);
        $is_valid_request &= $request->bindValue(':nom_sortie', $nom_sortie, PDO::PARAM_STR);
        $is_valid_request &= $request->bindValue(':extension', $extension_fichier, PDO::PARAM_STR);
        $is_valid_request &= $request->execute();
        
        echo 'Fichier accepté';
    } else {
        echo 'Fichier refusé';
    }

}
