<?php

include './core/bdd.php';
$bdd = connexionBdd();

include './functions/navigation.php';
?>

<div class="search-tool">
    <input role="search" type="text" class="text" placeholder="Rechercher">
    <button>search</button>

    <!-- <ul class="search-tool__result-list">
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
        <li>Lorem, ipsum.</li>
    </ul> -->
</div>

<?php

echo '<div class="arborescence">';
gen_arborescence($bdd, search_ascendant($bdd, 0));
echo '</div>';
?>