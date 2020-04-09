<article class="notice">

<div class="notice__wrapper">

    <section class="cadre">
        <div class="libelle">Type</div>
        <select id="concept-type" class="cadre__content">
            <option value=""></option>
            <?php include './cache/select_type.html'; ?>
        </select>
    </section>
    
    <section class="notice__description">
        <span class="libelle">Description</span>
        <textarea id="concept-description" class="wind-text" readonly></textarea>
    </section>

</div>


</article>