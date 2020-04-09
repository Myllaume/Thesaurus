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
                <header class="section__entete">
                    <div id="navigation-btn" class="onglet-titre navigation-btn">
                        Navigation
                    </div>
                </header>
                <ul id="navigation-list" class="navigation-list">
                    <li class="onglet-titre" data-onglet-aside="1">Arborescence</li>
                    <li class="onglet-titre" data-onglet-aside="2">Index</li>
                    <li class="onglet-titre" data-onglet-aside="3">Historique</li>
                </ul>

                <main class="section__main">
                    <section id="onglet1" class="onglet onglet--active">
                        <?php include './core/views/arborescence.php'; ?>
                    </section>

                    <section id="onglet2" class="onglet">
                        <?php include './core/views/index.php'; ?>
                    </section>

                    <section id="onglet3" class="onglet">
                        <div id="historique" class="historique"></div>
                    </section>
                </main>
            </section>

            <section class="section visualisation">
                <header class="section__entete">
                    <div class="onglet-titre" data-onglet-main="4">
                        Matrice
                    </div>
                    <div class="onglet-titre" data-onglet-main="5">
                        Notice
                    </div>
                    <div class="onglet-titre" data-onglet-main="6">
                        Fiches
                    </div>
                </header>

                <main class="section__main">
                    <section id="onglet4" class="onglet onglet--active">
                        <?php include './core/views/matrice.php'; ?>
                    </section>

                    <section id="onglet5" class="onglet">
                        <?php include './core/views/notice.php'; ?>
                    </section>

                    <section id="onglet6" class="onglet">
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