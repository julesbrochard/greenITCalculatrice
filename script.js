function function_YoN_computer() {
    // Récupère l'id si le input est coché
    var checkBox = document.getElementById("checkComputer");
    // Récupère l'id à affiché
    var text = document.getElementById("equipment_computer");

    // Si la case est coché, affiche le formulaire de l'ordinateur
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function function_YoN_phone() {
    // Récupère l'id si le input est coché
    var checkBox = document.getElementById("checkPhone");
    // Récupère l'id à affiché
    var text = document.getElementById("equipment_phone");

    // Si la case est coché, affiche le formulaire du portable
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}