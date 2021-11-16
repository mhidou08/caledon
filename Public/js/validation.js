document.addEventListener("DOMContentLoaded", function () {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function (e) {
            e.target.validity.valid("");
            if (!e.target.validity.vaild) {
                e.target.setCustomValidity("this field cannot be left blank")
            }
        };
        elements[i].oninput = function (e) {
            e.target.setCustomValidity("");
        };
    }
})