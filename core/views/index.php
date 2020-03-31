<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

function gen_index($bdd) {
    $request = $bdd->prepare('SELECT Concepts.id AS id, Concepts.nom AS nom, Types.nom AS type 
    FROM Concepts INNER JOIN Types ON Concepts.id_type = Types.id');
    $is_valid_request = $request->execute();
    
    if (!$is_valid_request) {
        // Erreur bdd : SELECT Concepts
        return false;
    }
    
    $concepts_list = $request->fetchAll(PDO::FETCH_ASSOC);
    if (empty($concepts_list)) {
        // Aucun concept trouvé dans la base de données
        return false;
    }

    return $concepts_list;
}

// echo '<pre>';
// print_r(gen_index($bdd));
// echo '</pre>';

echo '
<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Type</th>
        <tr>
    <thead>
    <tbody>';
foreach (gen_index($bdd) as $nb => $line) {
echo '
        <tr>
            <td>' . $line['nom'] . '</td>
            <td>' . $line['type'] . '</td>
        </tr>';
}
echo '
    </tbody>
</table>';

// foreach (gen_index($bdd) as $key => $value) {
//     echo $key;
//     echo '</br>';
//     echo $value;
// }