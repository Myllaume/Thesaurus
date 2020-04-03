const formUpload = document.querySelector('#form-upload');
const inputUpload = document.querySelector('#input-upload');

inputUpload.addEventListener('input', (e) => {
    e.preventDefault();
    var formData = new FormData(formUpload);

    $.ajax({
        url: '/Thesaurus/core/controllers/upload.php',
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (json) {
            if (json.isOk) {
                notice.setDocument(json.data);
            }
        }
    });
});