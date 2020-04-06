<article class="notice">

    <section class="cadre">
        <header class="cadre__entete">Type</header>
        <select id="concept-type" class="cadre__content" disabled>
            <option value=""></option>
            <?php include './cache/select_type.html'; ?>
        </select>
    </section>

    <section class="cadre">
        <header class="cadre__entete">Description</header>
        <textarea id="concept-description" class="cadre__content" readonly></textarea>
    </section>

</article>