<header class="header">
    <h1 class="titre-site">Thesaurus</h1>

    <?php if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === true): ?>
    <button id="btn-deconnexion" class="btn">Déconnexion</button>
    <?php else: ?>
    <form id="form-connexion" class="form-connexion">
        <input class="btn" type="password" name="cle" id="input-connexion" placeholder="Connexion">
    </form>
    <?php endif; ?>

</header>