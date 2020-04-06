var notice = {
    setType: function (text) {
        document.querySelector('#concept-type')
        .textContent = text;
    },
    setDescription: function (text) {
        document.querySelector('#concept-description')
        .textContent = text;
    },
    traitement: function (obj) {
        this.setType(obj.type);
        this.setDescription(obj.description);
    }
}