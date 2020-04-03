const formUpload = document.querySelector('#form-upload');

formUpload.addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(formUpload);

    $.ajax({
        url: '/Thesaurus/core/controllers/upload.php',
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        success: function (data) {
            console.log(data);
        }
    });
});