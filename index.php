<?php
ini_set('display_errors','on');
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thesaurus</title>

    <link rel="stylesheet" href="/Thesaurus/assets/main.css">
</head>

<body>

    <div class="wrapper-page">

        <?php include './core/views/toolbar.php'; ?>

        <div class="wrapper">

            <aside class="lateral">
                <?php include './core/views/arborescence.php'; ?>
            </aside>
            
            <main>
                <?php include './core/views/matrice.php'; ?>
            </main>

        </div>

    </div>

    <script src="/Thesaurus/libs/jquery.js"></script>
    <script src="/Thesaurus/assets/main.js"></script>
</body>

</html>