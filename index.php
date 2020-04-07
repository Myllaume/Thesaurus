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

            <aside class="aside">
                <div class="onglet__entete">
                    <div class="onglet__epingle onglet__epingle--active" data-onglet-aside="1">Arborescence</div>
                    <div class="onglet__epingle" data-onglet-aside="2">Index</div>
                    <div class="onglet__epingle" data-onglet-aside="3">Historique</div>
                </div>

                <div id="onglet1" class="onglet onglet--active">
                    <?php include './core/views/arborescence.php'; ?>
                </div>

                <div id="onglet2" class="onglet">
                    <?php include './core/views/index.php'; ?>
                </div>

                <div id="onglet3" class="onglet">
                    <article id="historique" class="historique"></article>
                </div>
            </aside>
            
            <main class="main">
                <div class="onglet__entete">
                    <div class="onglet__epingle onglet__epingle--active" data-onglet-main="4">Matrice</div>
                    <div class="onglet__epingle" data-onglet-main="5">Notice</div>
                    <div class="onglet__epingle" data-onglet-main="6">Fiches</div>
                </div>

                <div id="onglet4" class="onglet onglet--active">
                    <?php include './core/views/matrice.php'; ?>
                </div>

                <div id="onglet5" class="onglet">
                    <?php include './core/views/notice.php'; ?>
                </div>

                <div id="onglet6" class="onglet">
                    <?php include './core/views/fiche.php'; ?>
                </div>
            </main>

            <aside id="terminal" class="terminal"></aside>

        </div>

    </div>

    <script src="/Thesaurus/libs/jquery.js"></script>
    <script src="/Thesaurus/assets/main.js"></script>
</body>

</html>