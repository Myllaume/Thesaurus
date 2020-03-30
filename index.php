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
                <div class="matrice">
    
                    <div class="matrice__cadre matrice__cadre--top">
                        <div class="matrice__entete">Concept générique</div>
                        <ul>
                            <li>Humanités numériques</li>
                        </ul>
                    </div>
    
                    <div class="matrice__cadre matrice__cadre--center">
                        <div class="matrice__entete">Concept</div>
                        <ul>
                            <li>Hypertexte</li>
                        </ul>
                    </div>
    
                    <div class="matrice__cadre matrice__cadre--bottom">
                        <div class="matrice__entete">Concept(s) spécifique</div>
                        <ul>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                        </ul>
                    </div>
    
                    <div class="matrice__cadre matrice__cadre--left">
                        <div class="matrice__entete">Terme(s) usé(s)</div>
                        <ul>
                            <li>Lorem, ipsum. lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                        </ul>
                    </div>
    
                    <div class="matrice__cadre matrice__cadre--right">
                        <div class="matrice__entete">Concept(s) associé</div>
                        <ul>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                            <li>Lorem, ipsum.</li>
                        </ul>
                    </div>
                </div>
            </main>

        </div>

    </div>

    <script src="./assets/main.js"></script>
</body>

</html>