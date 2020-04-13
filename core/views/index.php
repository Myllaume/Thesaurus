<label for="search-sujet" class="libelle">Objet</label>
<select id="search-sujet">
    <option value="concept">concept</option>
    <option value="fiche">fiche</option>
    <option value="personne">personne</option>
</select>

<!-- concept -->
<label for="search-sujet" class="libelle">Métadonnées</label>
<select>
    <option value="0">nom</option>
    <option value="0">description</option>
    <option value="0">emplois</option>
</select>
<!-- fiche -->
<select class="--hidden">
    <option value="0">titre</option>
    <option value="0">date</option>
    <option value="0">type</option>
</select>
<!-- personne -->
<select class="--hidden">
    <option value="0">nom</option>
    <option value="0">profession</option>
</select>
<!-- document -->
<select class="--hidden">
    <option value="0">titre</option>
    <option value="0">auteur</option>
    <option value="0">editeur</option>
    <option value="0">date</option>
    <option value="0">type</option>
</select>
<input id="search-input" class="search-tool" type="search" role="search" placeholder="Rechercher">

<div>
    <button class="btn btn--active">Croissant</button>
    <button class="btn">Décroissant</button>
</div>

<?php include './cache/index.html'; ?>