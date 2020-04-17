<?php

class Concept {
    private $id;
    private $nom;
    private $description;
    private $id_ascendant;
    private $id_type;

    function __construct() {
        $this->id = intval($this->id);
        $this->nom = strval($this->nom);
        $this->description = strval($this->description);
        $this->id_ascendant = intval($this->id_ascendant);
    }

    /**
     * =====================
     * ASCENSEURS
     * =====================
     */

    public function set_id($var) {
        if (!is_numeric($var) || $var <= 0) {
            throw new Exception("L'id d'un concept doit être un nombre entier non nul");
        }
        
        $this->id = $var;
    }

    public function get_id() {
        return $this->id;
    }

    public function set_nom($var) {
        if (!is_string($var)) {
            throw new Exception("Le nom d'un concept doit être une chaine de caractère");
        }

        if (strlen($var) <= 0 || strlen($var) > 150) {
            throw new Exception("Le nom d'un concept ne doit pas excéder 150 caractères");
        }
        
        $this->nom = $var;
    }

    public function get_nom() {
        return $this->nom;
    }

    public function set_description($var) {
        if (!is_string($var)) {
            throw new Exception("La description d'un concept doit être une chaine de caractère");
        }

        if (strlen($var) <= 0) {
            throw new Exception("La description d'un concept ne peut être nulle");
        }
        
        $this->description = $var;
    }

    public function get_description() {
        return $this->description;
    }

    public function set_id_ascendant($var) {
        if (!is_numeric($var)) {
            throw new Exception("L'id d'un concept doit être un nombre entier");
        }
        
        $this->id_ascendant = $var;
    }

    public function get_id_ascendant() {
        return $this->id_ascendant;
    }

    /**
     * =====================
     * REQUÊTES BDD
     * =====================
     */

    public function select_bdd($bdd) {
        $request = $bdd->prepare('SELECT * FROM Concepts WHERE id=:id');
        $is_valid_request = $request->bindValue(':id', $this->id, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Concepts');
        }

        $concept = $request->fetch(PDO::FETCH_ASSOC);
        if (empty($concept)) {
            throw new Exception('Aucun concept trouvé dans la base de données');
        }

        $this->nom = $concept['nom'];
        $this->description = $concept['description'];
        $this->id_ascendant = $concept['id_ascendant'];
    }

    public function select_associe_bdd($bdd) {
        $request = $bdd->prepare('SELECT id, nom FROM Concepts INNER JOIN Associations ON Concepts.id = Associations.id_associe WHERE id_concept = :id');
        $is_valid_request = $request->bindValue(':id', $this->id, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Associations');
        }

        return $request->fetchAll(PDO::FETCH_ASSOC);
    }

    public function select_employe_bdd($bdd) {
        $request = $bdd->prepare('SELECT nom FROM Emplois WHERE id_concept = :id');
        $is_valid_request = $request->bindValue(':id', $this->id, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Emplois');
        }

        return $request->fetchAll(PDO::FETCH_ASSOC);
    }

    public function select_fiche_bdd($bdd) {
        $request = $bdd->prepare('SELECT id, nom_enregistrement, nom_sortie, extension, date
            FROM Files WHERE id_concept = :id');
        $is_valid_request = $request->bindValue(':id', $this->id, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Files');
        }

        return $request->fetchAll(PDO::FETCH_ASSOC);
    }

    public function select_document_bdd($bdd) {
        $request = $bdd->prepare('SELECT id, titre, auteur, editeur, annee, type, identifiant
            FROM Documents WHERE id_concept = :id');
        $is_valid_request = $request->bindValue(':id', $this->id, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Documents');
        }

        return $request->fetchAll(PDO::FETCH_ASSOC);
    }

    public function select_personne_bdd($bdd) {
        $request = $bdd->prepare('SELECT id, nom, profession, genre, nationalite
        FROM Personnes INNER JOIN Concepts_Personnes ON Personnes.id = Concepts_Personnes.id_personne
        WHERE id_concept = :id');
        $is_valid_request = $request->bindValue(':id', $this->id, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Personnes');
        }

        return $request->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function import_bdd($bdd) {
        $request = $bdd->prepare('SELECT * FROM Concepts ORDER BY nom');
        $is_valid_request = $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : SELECT Concepts');
        }

        $concept_list = $request->fetchAll(PDO::FETCH_ASSOC);
        if (empty($concept_list)) {
            throw new Exception('Aucun concept trouvé dans la base de données');
        }
        
        return $concept_list;
    }

    public static function get_structure_bdd($bdd) {
        $request = $bdd->prepare('DESCRIBE Concepts');
        $is_valid_request = $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : DESCRIBE Concepts');
        }

        $table_structure = $request->fetchAll(PDO::FETCH_ASSOC);
        
        return $table_structure;
    }

    public function insert_bdd($bdd) {
        $request = $bdd->prepare('INSERT INTO Concepts SET nom=:nom, id_ascendant=:id_ascendant');
        $is_valid_request = $request->bindValue(':nom', $this->nom, PDO::PARAM_STR);
        $is_valid_request &= $request->bindValue(':id_ascendant', $this->id_ascendant, PDO::PARAM_INT);
        $is_valid_request &= $request->execute();

        if (!$is_valid_request) {
            throw new Exception('Erreur bdd : INSERT Concepts');
        }

        $this->id = intval($bdd->lastInsertId());
    }
}