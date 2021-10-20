//remplir les dropdown avec le JSon
function populateDropdown(){
    populateOrdiDropdown();
    populateTelephoneDropdown();
}

function populateOrdiDropdown(){
    let dropdownOrdi = document.getElementById("ordinateurDropdown");


    var ordinateurs = [
        {"Type":"Pc Portable Economique", "PA":"25 W","PL":"11 W","VO":"7 W"},
        {"Type":"PC Portable Grand Format", "PA":"35 W","PL":"15 W","VO":"7 W"},
        {"Type":"Pc Portable", "PA":"25 W","PL":"13W","VO":"7 W"},
        {"Type":"MacBook pro", "PA":"26 W","PL":"13 W","VO":"6 W"},
        {"Type":"LenovoYoga 7i", "PA":"24 W","PL":"12 W","VO":"7 W"},
        {"Type":"Asus E203MA", "PA":"20 W","PL":"10 W","VO":"6 W"},
        {"Type":"DELL XPS 15", "PA":"27 W","PL":"14W","VO":"7 W"}
    ];

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choisir un ordinateur';
    dropdownOrdi.add(defaultOption);
    dropdownOrdi.selectedIndex = 0;

    for(var i=0;i< ordinateurs.length;i++){
        dropdownOrdi.innerHTML = dropdownOrdi.innerHTML+ '<option value="' + ordinateurs[i]['Type'] +'">' + ordinateurs[i]['Type'] + '</option>';
    }
}

function populateTelephoneDropdown(){
    let dropdownTelephone = document.getElementById("telephoneDropdown");
    var telephones = [
        {"Type":"Telephone Portable ", "PA":" 15 W","PL":" 6W","VO":" 2W"},
        {"Type":"Xiaomi RedmiNote 10Pro", "PA":" 16W","PL":" 7W","VO":" 3W"},
        {"Type":"Apple iPhone 12Pro", "PA":" 17W","PL":" 6W","VO":" 3W"},
        {"Type":"Samsung Galaxy S20 FE4G", "PA":" 16W","PL":" 8W","VO":" 4W"},
        {"Type":"Google Pixel 4a", "PA":" 14W","PL":" 7W","VO":" 3W"}
    ];
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choisir un telephone';
    dropdownTelephone.add(defaultOption);
    dropdownTelephone.selectedIndex = 0;

    for(var i=0;i< telephones.length;i++){
        dropdownTelephone.innerHTML = dropdownTelephone.innerHTML+ '<option value="' + telephones[i]['Type'] +'">' + telephones[i]['Type'] + '</option>';
    }
}


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
//convertie le format heure/minute de time en float
//exemple '16h30' est convertie en 16.5
function timeStringToFloat(time) {
    var hoursMinutes = time.split(":");
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

function form_submit(){
    alert("form submit");
    let form = document.getElementById("calcForm");
    //Récuperer les inputs du formulaire
    let checkBoxOrdinateur = document.getElementById("verifOrdinateur").value;
    let checkBoxTelephone = document.getElementById("verifTelephone").value;
    let heureArrivee = timeStringToFloat(document.getElementById("edt_debut_horaire").value);
    let heureDepart = timeStringToFloat(document.getElementById("edt_fin_horaire").value);
    let nbJoursSemaine = document.getElementById("edt_nbJours_select").value;
    let tpsPause = parseFloat(document.getElementById("edt_pause_texte").value);
    let nbMail = document.getElementById("mail").value;
    let stockageCloud = document.getElementById("stockage").value;
    let typeTransport = document.getElementById("trajet_transport_choix").value;
    let nbKmJournalier = document.getElementById("nb_km_journalier").value;
    let checkBoxCovoiturage = document.getElementById("verifCovoiturage").value;
    let trajetProVoiture = document.getElementById("trajet_pro_voiture").value;
    let trajetProTrain = document.getElementById("trajet_pro_train").value;
    let trajetProAvion = document.getElementById("trajet_pro_avion").value;

    //traitement des données
    let nbHeureTravail = nb_dheure_de_travail(heureArrivee,heureDepart,nbJoursSemaine,tpsPause);


    if(checkBoxOrdinateur.checked==true){
        let ordinateur = document.getElementById("ordinateurDropdown").value;
        let ecran = document.getElementById("equipement_ordinateur_ecran").value;
        let impactOrdinateur= consommation_Pc(nbHeureTravail,ordinateur);
        alert(impactOrdinateur);
    }
}