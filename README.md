# Thesaurus
 
Développement d'un outil de gestion et de parcours d'un thesaurus.

Lié à une base de données, cet outil permet de hiérarchiser des concepts et d'expliciter leur définition et usages dans un système documentaire déterminé. Il permet à une communauté d'utilisateurs de s'entendre sur un lexique limité et contrôlé afin d'échanger une documentation technique avec rigueur et efficacité en limitant les conflits personnels et techniques d'ordre informationnel.

## Fonctionnalités

### Parcours, *browsing*

Un thesaurus prend la forme d'une arborescence : des listes de concepts sont imbriquées les unes dans les autres déterminant une hiérarchie. Verticialement, les concepts sont tantôt des termes génériques (TG), tantôt des termes spécifiques (TS). Ce sont les termes verticaux. Horizontalement, les concepts sont liés à des termes associés (TA) et expressions employées (EP) et plus généralement à une description, à des identifiants et documents. ce sont des termes horizontaux.
Le tout forme deux axes et un **concept**.

L'axe vertical sera représenté dans une arborescence et les deux axes seront représentéq dans une matrice.

### Taxonomie

L'administrateur pourra décider en plus d'un identifiant, d'une description, d'ajouter des champs normés (texte, nombre, date) qui seront affichés sur la matrice du concept et pourront être l'objet de recherches.

### Recherche (*search*)

Les différents termes peuvent être trouvés rapidement en émettant une requête via un formulaire de recherche. Étant donné que l'on travaille sur un lexique contrôlé, il faut limiter les approximations et fournir à l'utilisateur à mesure qu'il formule sa recherche des suggestions de termes existants : il ne pourra envoyer sa requête que si il saisi très exactement un terme faisant partie du thesaurus.

Un mode de recherche alternatif permettra à l'utilisateur de spécifier s'il souhaite rechercher un concept correspondant à une série de mots-clés de par ses notes, tags ou autres termes horizontaux, s'il souhaite rechercher selon un terme horizontal précis.

Toutes les recherches seront enregistrées temporairement dans la base de données et un cookie sur la session de l'utilisateur lui permettra de dresser une liste à exporter ou simplement de revenir sur ses recherches précédentes.

### Export

Les différentes matrices et plus généralement le thesaurus pourront être exportés aux formats JSON et CSV.

### Administration

Une interface d'administration permet à une personne d'ajouter, supprimer et modifier des concepts.

## Références

Cet outil est inspiré des modèles suivants : 
- [PACTOLS](https://pactols.frantiq.fr/opentheso/index.xhtml)
- [Interface de consultation en ligne de MOTBIS](http://www.cndp.fr/thesaurus-motbis/site/)
- [UK Archival Thesaurus](https://ukat.aim25.com/thesaurus/)