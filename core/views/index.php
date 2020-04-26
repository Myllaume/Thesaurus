<label for="search-sujet" class="libelle">Objet</label>
<select id="search-sujet">
    <option value="empty" selected></option>
    <option value="Concepts">concept</option>
    <option value="Files">fiche</option>
</select>

<div>
    <button id="order-croissant" class="btn btn--active index__btn --hidden" data-sort="croissant">Croissant</button>
    <button id="order-descroissant" class="btn index__btn --hidden" data-sort="decroissant">Décroissant</button>
</div>

<input id="search-input" class="search-tool --hidden" type="search" role="search" placeholder="Rechercher">

<section id="search-board" class="index__board">

    <ul id="index-list"></ul>

</section>