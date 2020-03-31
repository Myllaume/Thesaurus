<?php

class Concept {
    private $id;
    private $nom;
    private $id_ascendant;

    function __construct() {
        $this->id = intval($this->id);
        $this->nom = strval($this->nom);
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
        $this->id_ascendant = $concept['id_ascendant'];
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