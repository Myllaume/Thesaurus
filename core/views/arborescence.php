<?php

include './core/bdd.php';
$bdd = connexionBdd();

include './functions/navigation.php';

echo '<div class="arborescence">';
gen_arborescence($bdd, search_ascendant($bdd, 0));
echo '</div>';