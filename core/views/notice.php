<article class="notice">

    <section class="cadre">
        <header class="cadre__entete">Type</header>
        <main class="cadre__content" id="concept-type"></main>
    </section>

    <section class="cadre">
        <header class="cadre__entete">Description</header>
        <main class="cadre__content" id="concept-description"></main>
    </section>
    
    <section class="cadre">
        <header class="cadre__entete">Références</header>
        <main class="cadre__content" id="concept-reference">

            <form id="form-upload" action="/Thesaurus/" method="post" enctype="multipart/form-data">
                <input type="file" name="fichier">
                <button type="submit">Enregistrer</button>
            </form>

        </main>
    </section>

</article>

<?php include './core/controllers/upload.php'; ?>