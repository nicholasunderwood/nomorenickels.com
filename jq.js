function main() {
    $('#div').hide();
}
$(document).ready(function() {
    $('#div').hide();
    $('#but').on('click', function () {
        console.log('click')
        $(this).prev().slideToggle(500).delay(100).slideToggle(500)
    })
});