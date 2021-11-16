function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}


function guardChecked(guardId, hiddenId, originalValue) {
    var guardState = document.getElementById(guardId);
    var hiddenGuard = document.getElementById(hiddenId);
    if (guardState.checked) {
        hiddenGuard.value = "";
        return
    }
    else {
        hiddenGuard.value = originalValue
    }
}

function greaseChecked(greaseId, gHidden, oValue) {
    var greaseState = document.getElementById(greaseId);
    var gHiddenGuard = document.getElementById(gHidden);
    if (greaseState.checked) {
        gHiddenGuard.value = "Greased";
        return;
    }
    else {
        gHiddenGuard.value = oValue;
    }
}