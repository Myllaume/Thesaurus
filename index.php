<?php
ini_set('display_errors','on');
error_reporting(E_ALL);

session_start();

require './core/bdd.php';
$bdd = connexionBdd();

if (isset($_GET) && !empty($_GET['id'])) { $id_concept = $_GET['id']; }
else { $id_concept = 1; }

if (isset($_SESSION['is_operateur']) && $_SESSION['is_operateur'] === true )
{ $is_op = 'true'; }
else { $is_op = 'false'; }
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thesaurus</title>

    <link rel="stylesheet" href="/Thesaurus/assets/main.css">
</head>

<body data-concept="<?= $id_concept ?>" data-op="<?= $is_op ?>">

    <div class="wrapper-page">

        <?php include './core/views/toolbar.php'; ?>

        <div class="wrapper">

            <section class="section navigation">
                <header class="section__entete list">
                    <div id="navigation-btn" class="onglet-titre list__btn">
                        Navigation  ▼
                    </div>
                    <ul id="navigation-list" class="list__content">
                        <li class="onglet-titre onglet__epingle--active" data-onglet="arborescence">Arborescence</li>
                        <li class="onglet-titre" data-onglet="index">Index</li>
                        <li class="onglet-titre" data-onglet="historique">Historique</li>
                    </ul>
                </header>

                <main class="section__main">
                    <section id="onglet-arborescence" class="onglet onglet--active">
                        <div class="arborescence">
                            <?php require './cache/arboresence.html'; ?>
                            <button id="concept-racine" class="btn --hidden">Nouveau concept</button>
                        </div>
                    </section>

                    <section id="onglet-index" class="onglet">
                        <div class="index">
                            <?php require './core/views/index.php'; ?>
                        </div>
                    </section>

                    <section id="onglet-historique" class="onglet">
                        <div id="historique" class="historique"></div>
                    </section>
                </main>
            </section>

            <section class="section visualisation">
                <header class="section__entete">
                    <div class="onglet-titre onglet__epingle--active" data-onglet="matrice">
                        Matrice
                    </div>
                    <div class="onglet-titre" data-onglet="notice">
                        Notice
                    </div>
                    <div class="onglet-titre" data-onglet="fiches">
                        Fiches
                    </div>
                </header>

                <main class="section__main">
                    <section id="onglet-matrice" class="onglet onglet--active">
                        <?php include './core/views/matrice.php'; ?>
                    </section>

                    <section id="onglet-notice" class="onglet">
                        <?php include './core/views/notice.php'; ?>
                    </section>

                    <section id="onglet-fiches" class="onglet">
                        <?php include './core/views/fiche.php'; ?>
                    </section>
                </main>
            </section>

            <aside id="terminal" class="terminal"></aside>

        </div>
        
        <?php include './core/views/footer.php'; ?>

    </div>

    <script src="/Thesaurus/libs/jquery.js"></script>
    <script src="/Thesaurus/assets/main.js"></script>
</body>

</html>