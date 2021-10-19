function function_YoN_ordinateur() {
    // Récupère l'id si le input est coché
    var checkBox = document.getElementById("verifOrdinateur");
    // Récupère l'id à affiché
    var text = document.getElementById("equipement_ordinateur");

    // Si la case est coché, affiche le formulaire de l'ordinateur
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function function_YoN_telephone() {
    // Récupère l'id si le input est coché
    var checkBox = document.getElementById("verifTelephone");
    // Récupère l'id à affiché
    var text = document.getElementById("equipement_telephone");

    // Si la case est coché, affiche le formulaire du portable
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function function_YoN_covoiturage() {
    // Récupère l'id si le input est coché
    var checkBox = document.getElementById("verifCovoiturage");
    // Récupère l'id à affiché
    var text = document.getElementById("trajet_covoiturage");

    // Si la case est coché, affiche le formulaire du portable
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}