document.getElementById("formConfirm").onclick = function () { showConfirmation() };
var overlayme = document.getElementById("lock-modal");
var popup = document.getElementById("popup");

function showConfirmation() {
    overlayme.style.display = "flex";
    popup.style.display = "Block";
}

document.getElementById("okButton").onclick = function () { confirm() };

function confirm() {
    overlayme.style.display = "none";
    popup.style.display = "none";
}

document.getElementById("cancelButton").onclick = function () { cancel() };

function cancel() {
    overlayme.style.display = "none";
    popup.style.display = "none";
}