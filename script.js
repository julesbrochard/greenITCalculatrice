//remplir les dropdown avec le JSon
function populateDropdown(){
    populateOrdiDropdown();
    populateTelephoneDropdown();
}

function populateOrdiDropdown(){

    var ordinateursJSon = [
        {"Type":"Pc Portable Economique", "PA":25,"PL":11,"PO":7},
        {"Type":"PC Portable Grand Format", "PA":35,"PL":15,"PO":7},
        {"Type":"Pc Portable", "PA":25,"PL":13,"PO":7},
        {"Type":"MacBook pro", "PA":26,"PL":13,"PO":6},
        {"Type":"LenovoYoga 7i", "PA":24,"PL":12,"PO":7},
        {"Type":"Asus E203MA", "PA":20,"PL":10,"PO":6},
        {"Type":"DELL XPS 15", "PA":27,"PL":14,"PO":7}
    ];

    let dropdownOrdi = document.getElementById("ordinateurDropdown");
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choisir un ordinateur';
    dropdownOrdi.add(defaultOption);
    dropdownOrdi.selectedIndex = 0;

    for(var i=0;i< ordinateursJSon.length;i++){
        console.log(ordinateursJSon[i]);
        dropdownOrdi.innerHTML = dropdownOrdi.innerHTML+ '<option value="' + ordinateursJSon[i]['Type']+":"+ ordinateursJSon[i]['PA']+":"+ ordinateursJSon[i]['PL']+":"+ ordinateursJSon[i]['PO'] +'">' + ordinateursJSon[i]['Type'] + '</option>';
    }
}

function populateTelephoneDropdown(){
    let dropdownTelephone = document.getElementById("telephoneDropdown");
    var telephonesJSon = [
        {"Type":"Telephone Portable ", "PA":15,"PL":6,"PO":2},
        {"Type":"Xiaomi RedmiNote 10Pro", "PA":16,"PL":7,"PO":3},
        {"Type":"Apple iPhone 12Pro", "PA":17,"PL":6,"PO":3},
        {"Type":"Samsung Galaxy S20 FE4G", "PA":16,"PL":8,"PO":4},
        {"Type":"Google Pixel 4a", "PA":14,"PL":7,"PO":3}
    ];
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choisir un telephone';
    dropdownTelephone.add(defaultOption);
    dropdownTelephone.selectedIndex = 0;

    for(var i=0;i< telephonesJSon.length;i++){
        dropdownTelephone.innerHTML = dropdownTelephone.innerHTML+ '<option value="' + telephonesJSon[i]['Type']+":"+ telephonesJSon[i]['PA']+":"+ telephonesJSon[i]['PL']+":"+ telephonesJSon[i]['PO'] +'">' + telephonesJSon[i]['Type'] + '</option>';
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
    //Récuperer les inputs du formulaire
    let checkBoxOrdinateur = document.getElementById("verifOrdinateur");
    let checkBoxTelephone = document.getElementById("verifTelephone");
    let heureArrivee = timeStringToFloat(document.getElementById("edt_debut_horaire").value);
    let heureDepart = timeStringToFloat(document.getElementById("edt_fin_horaire").value);
    let nbJoursSemaine = document.getElementById("edt_nbJours_select").value;
    let tpsPause = parseFloat(document.getElementById("edt_pause_texte").value);
    let nbMail = document.getElementById("mail").value;
    let stockageCloud = document.getElementById("stockage").value;
    let typeTransport = document.getElementById("trajet_transport_choix").value;
    let nbKmJournalier = parseInt(document.getElementById("nb_km_journalier").value);
    let checkBoxCovoiturage = document.getElementById("verifCovoiturage");
    let trajetProVoiture = document.getElementById("trajet_pro_voiture").value;
    let trajetProTrain = document.getElementById("trajet_pro_train").value;
    let trajetProAvion = document.getElementById("trajet_pro_avion").value;
    let nbPassagersCovoit = parseInt(document.getElementById("trajet_covoiturage_nb").value);
    //traitement des données
    let nbHeureTravail = nb_dheure_de_travail(heureArrivee,heureDepart,nbJoursSemaine,tpsPause);
    let ordinateurDropdown;
    let ordinateurID;
    let impactOrdinateur;
    let impactTelephone;
    let consoCloud;
    let consoTransport;
    let consoTotal=0;
    let ecran;

    if(checkBoxOrdinateur.checked==true){
        ordinateurDropdown = document.getElementById("ordinateurDropdown");
        ordinateurValue = ordinateurDropdown.value.toString();
        console.log(ordinateurValue);
        ecran = parseFloat(document.getElementById("ecran").value);
        impactOrdinateur= consommation_Pc(nbHeureTravail,ordinateurValue,ecran);
        consoTotal+=parseFloat(impactOrdinateur);
        console.log(impactOrdinateur);
    }
    if(checkBoxTelephone.checked==true){
        telephoneDropdown = document.getElementById("telephoneDropdown");
        telephone = telephoneDropdown.value;
        console.log(telephone);
        impactTelephone= consommation_Pc(nbHeureTravail,telephone);
        consoTotal+=parseFloat(impactTelephone);
    }

    if(nbMail!=0 && stockageCloud!= 0){
        consoCloud = consommation_Cloud(nbHeureTravail,stockageCloud,nbMail);
        consoTotal+=parseFloat(consoCloud);
    }

    if(nbKmJournalier!=0){
        consoTransport = consommation_deplacement_quotidien(nbHeureTravail,typeTransport,nbKmJournalier,checkBoxCovoiturage,nbPassagersCovoit);
        consoTotal+=parseFloat(consoTransport);
    }

    let consoTransportPro = consommation_deplacement_pro(trajetProAvion,trajetProTrain,trajetProVoiture);
    consoTotal+=parseFloat(consoTransportPro);
    console.log('Consommation total: ' + consoTotal + " KwH");
    let impactCo2 = convertisseur_kWh_GES(consoTotal);
    console.log(impactCo2);
    document.getElementById("reponseFormulaire").innerHTML = '<p>Votre consommation en Kg eq CO2 est: '+ impactCo2.toString() +'</p>'
}
