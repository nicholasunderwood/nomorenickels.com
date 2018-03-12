$(document).ready(function() {
    $('#div').hide();
    $('#but').on('click', function () {
        $(this).prev().slideToggle(500).delay(100).slideToggle(500)
    })
});
