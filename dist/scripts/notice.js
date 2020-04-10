var notice = {
    inputType: document.querySelector('#concept-type'),
    inputDescription: document.querySelector('#concept-description'),

    lastTypeElt: undefined,

    setType: function (id) {
        if (this.lastTypeElt !== undefined)
        { this.lastTypeElt.removeAttribute('selected'); }

        var selectedElt = this.inputType.querySelector('[value="' + id + '"]')
        selectedElt.setAttribute('selected', '');

        this.lastTypeElt = selectedElt;
    },
    setDescription: function (text) {
        this.inputDescription.textContent = text;
    },
    traitement: function (obj) {
        this.setType(obj.type_id);
        this.setDescription(obj.description);
    },
    canEdit: function(bool) {
        bool = !bool; // inversion
        this.inputType.disabled = bool;
        this.inputDescription.readOnly = bool;
    }
}

notice.inputType.addEventListener('focus', () => { sauvegardeAuto(notice.inputType, 'type', true) });
notice.inputDescription.addEventListener('focus', () => { sauvegardeAuto(notice.inputDescription, 'description') });