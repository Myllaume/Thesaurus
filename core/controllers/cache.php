<?php

ini_set('display_errors','on');
error_reporting(E_ALL);

if (!isset($_GET) || empty($_GET['element'])) {
    exit;
}

require '../bdd.php';
$bdd = connexionBdd();
require '../models/concept.php';

switch ($_GET['element']) {
    case 'generer_arborescence':
        require '../../functions/navigation.php';
        /**
         * Function gen_arborescence
         * Foncton récursive de génération de listes HTML
         * imbriquées correspondant à la hierarchie du thesaurus
         * le tout stocké dans un fichier /cache/arboresence.html
         * ---
         * @param object $bdd PDO
         * @param array $concepts_list Liste de lignes de la base de données
         */

        function gen_arborescence($bdd, $concepts_list) {
            if (!$concepts_list) { return; }
            $open_list = '<ul class="arborescence__section">';
            file_put_contents('../../cache/arboresence.html', $open_list, FILE_APPEND);

            foreach ($concepts_list as $nb => $value) {
                $elt = '<li class="arborescence__elt" data-id="' . $value['id'] . '">' . $value['nom'] . '</li>';
                file_put_contents('../../cache/arboresence.html', $elt, FILE_APPEND);

                gen_arborescence($bdd, search_descendant($bdd, $value['id']));
            }

            $close_list = '</ul>';
            file_put_contents('../../cache/arboresence.html', $close_list, FILE_APPEND);
        }

        file_put_contents('../../cache/arboresence.html', ''); // vider /cache/arboresence.html
        gen_arborescence($bdd, search_descendant($bdd, 0));

        break;

    case 'telecharger_csv':
        $bdd_entete = Concept::get_structure_bdd($bdd);
        $entete = [];
        foreach ($bdd_entete as $field_nb => $field_spec) {
            array_push($entete, $field_spec['Field']);
        }

        require '../../functions/files.php';
        create_CSV_from_array(Concept::import_bdd($bdd),
            '../../cache/table_concept.csv', $entete);

        break;
}