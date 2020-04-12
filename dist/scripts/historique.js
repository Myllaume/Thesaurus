var historique = {
    content: document.querySelector('#historique'),

    /**
     * @return { Array } - Historique de session découpé
     */
    sessionHistoriqueToJSON: function() {
        return JSON.parse(sessionStorage.getItem('historique'));
    },
    actualiser: function() {
        var oldHistory = sessionStorage.getItem('historique');
        var oldHistory = oldHistory.substr(0, oldHistory.length-1);
        
        // l'id du concept en session est ajouté à l'historique...
        var idConcept = sessionStorage.getItem('idConcept');
        var nomConcept = sessionStorage.getItem('nomConcept');
        oldHistory += ',{"nom" : "' + nomConcept + '", "id": ' + idConcept + '}]';
        sessionStorage.setItem('historique', oldHistory);;

        this.addLine(JSON.parse('{"nom" : "' + nomConcept + '", "id": ' + idConcept + '}'));
    },
    /**
     * @return { Number } - Dernier id entré dans l'historique de session
     * ---
     * Trouver l'id de concept relatif à la position dans l'historique
     */
    backConcept: function() {
        var oldHistory = this.sessionHistoriqueToJSON();
        // extrème de l'historique
        var minHistory = -Math.abs(oldHistory.length);
        
        if (sessionStorage.getItem('historiquePos') <= minHistory) {
            return oldHistory[0].id; }

        // descendre de 1 dans l'historique et stockage de la nouvelle position
        var historyPos = Number(sessionStorage.getItem('historiquePos')) - 1;
        sessionStorage.setItem('historiquePos', historyPos);
    
        return oldHistory[oldHistory.length - Math.abs(historyPos)].id;
    },
    set: function() {
        this.sessionHistoriqueToJSON()
            .forEach(this.addLine);
    },
    /**
     * @param { Object } obj Dernier objet enregistré en Historique de session
     */
    addLine: function(obj) {
        var histLigne = document.createElement('a');
        histLigne.classList.add('historique__ligne');
        histLigne.setAttribute('href', '/Thesaurus/' + obj.id);
        histLigne.textContent = obj.nom;
        historique.content.prepend(histLigne);
        
    }
};

window.addEventListener("DOMContentLoaded", () => {
    historique.set();});