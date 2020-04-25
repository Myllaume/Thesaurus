<label for="search-sujet" class="libelle">Objet</label>
<select id="search-sujet">
    <option value="empty" selected></option>
    <option value="Concepts">concept</option>
    <option value="Files">fiche</option>
</select>

<select id="search-Concepts" class="--hidden">
    <option value="nom" selected>nom</option>
</select>

<select id="search-Files" class="--hidden">
    <option value="nom_sortie" selected>titre</option>
</select>

<select id="search-Documents" class="--hidden">
    <option value="titre" selected>titre</option>
    <option value="auteur">auteur</option>
    <option value="editeur">editeur</option>
    <option value="date">date</option>
    <option value="type">type</option>
</select>

<div>
    <button id="order-croissant" class="btn btn--active index__btn --hidden" data-sort="croissant">Croissant</button>
    <button id="order-descroissant" class="btn index__btn --hidden" data-sort="decroissant">Décroissant</button>
</div>

<input id="search-input" class="search-tool --hidden" type="search" role="search" placeholder="Rechercher">

<section id="search-board" class="index__board">

    <ul id="index-list"></ul>

</section>