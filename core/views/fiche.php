<article class="fiche">

    <div class="fiche__volet-selection fiche__volet-selection--active">

        <div class="fiche__btns-box fiche__btns-box--hidden">
            <button class="btn">Créer une fiche</button>

            <form id="form-upload" class="form-upload" action="/Thesaurus/" method="post" enctype="multipart/form-data">
                <label class="btn" for="input-upload">Téléverser un fichier</label>
                <input type="file" name="fichier" id="input-upload">
            </form>
        </div>
    
        <section id="fiche" class="fiche__conteneur"></section>
    </div>

    <div class="fiche__volet-lecture">
        <button id="reader-extend" class="btn-push zone-lecture__btn-extand">▲</button>
        <textarea id="fiche-title" class="titre-fiche" placeholder="titre" readonly></textarea>
        <section id="reader" class="zone-lecture"></section>
        <textarea id="writer" class="zone-lecture" placeholder="texte" readonly></textarea>
    </div>

</article>