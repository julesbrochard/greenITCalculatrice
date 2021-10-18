//Création des Objets PC et Telephone

function Device(nomModele,type,PA,PL,PO){
    this.nomModele = nomModele; // Nom du modèle
    this.type = type            // Type de Device (Tel ou PC)
    this.PA = PA;               // Puissance en activité
    this.PL = PL;               // Puissance en veille
    this.PO = PO;               // Puissance appareil éteint
}

//Test des fonctions

let heureDeTravail = nb_dheure_de_travail();
let nb_dimpression= 4 ;                                      // (A récupérer dans le formulaire)
let PC_choisi = new Device("Macbook","PC", 45, 15, 7);       // A remplacer par une fonction qui récupère le bon PC dans le fichier Json en fonction du formulaire

let UEC_PC = consommation_Pc(heureDeTravail,PC_choisi);
let UEC_Cloud = consommation_Cloud(heureDeTravail).toFixed(2);
let UEC_Transport_Quotidien = consommation_deplacement_quotidien(heureDeTravail).toFixed(2);
let UEC_Transport_Pro = consommation_deplacement_pro().toFixed(2);
let UEC_Impression = (0.3*nb_dimpression*heureDeTravail[2]*52/1000).toFixed(2);

alert("Le salarie travail "+heureDeTravail[0] +"h par semaine dont "+ heureDeTravail[1]+ "h de pause");
alert("Avec son " + PC_choisi.nomModele +" le salarie a consomme : "+ UEC_PC + "kWh."); 
alert("Le salarie a consomme "+ UEC_Cloud + " kWh en utilisant le Cloud");
alert("Conso de déplacement quotidien en kWh : " + UEC_Transport_Quotidien);
alert("Conso de déplacement pro en kWh : " + UEC_Transport_Pro);
alert("La conso pour " + nb_dimpression + " impressions par jour, le salarie consommera "+ UEC_Impression + " kWh par an");


//Fonction du script

/// <summary>
/// Calcul le nombre d'heures de travail et le nombre d'heures de pause du salarié dans une semaine
/// </summary>
/// <returns>Retourne un tableau [nombre d'heure au travail pendant la semaine, le nombre d'heure de pause, nb de jour travaillé dans la semaine] </returns>
function nb_dheure_de_travail(){

let heure_arrive = 9;       //Heure d'arrivée du salarié au travail (A récupérer dans le formulaire)
let heure_depart = 17;      //Heure de départ du salarié au travail (A récupérer dans le formulaire)
let nb_jours_semaine = 5;   //Nombre de jours par semaine passé au travail (A récupérer dans le formulaire)
let temps_de_pause = 1;     //Nombre d'heure de pause par jour (A récupérer dans le formulaire)

return HeureDeTravail= [(heure_depart-heure_arrive)*nb_jours_semaine , temps_de_pause*nb_jours_semaine , nb_jours_semaine]; 
}

/// <summary>
/// Calcul la consommation du PC du salarié
/// </summary>
/// <param name="NbHeureDeTravail">(tableau) Nb d'heures de travail et Nb d'heure de pause d</param>
/// <param name="PC">(objet) Le PC demandé sur le formulaire et récupérer dans le fichier json d</param>
/// <returns>Retourne la consommation du PC par an  en kWh </returns>
function consommation_Pc(NbHeureDeTravail,PC){

    const SPM = 0.30;                                       // Valeur de base 30%  
    let HA = NbHeureDeTravail[0]-NbHeureDeTravail[1];       //Nombre d'heures ou le Pc est actif par semaine
    let HL = NbHeureDeTravail[1];                           //Nombre d'heures ou le Pc est en veille par semaine
    let HO = 24*7-NbHeureDeTravail[0];                      //Nombre d'heures ou le Pc est éteint par semaine
    let UEC_Pc = (SPM* (PC.PA*HA + PC.PL*HL+ PC.PO*HO)/7)*365/1000 + ((1-SPM)*(PC.PA*(HA+HL)+PC.PO*HO)/7)*365/1000;

    return UEC_Pc.toFixed(2);
}

/// <summary>
/// Calcul la consommation du salarié sur le cloud
/// </summary>
/// <param name="NbHeureDeTravail">(tableau) Nb d'heures de travail et Nb d'heure de pause d</param>
/// <returns>Retourne la consommation du salarié sur le cloud par an en kWh </returns>
function consommation_Cloud(NbHeureDeTravail){
    
    const Wh_pour_un_Go = 96;      // Nombre de Wh pour stoké 1go sur le cloud pendant un an
    const Wh_pour_un_Mail = 2.5;    //Nombre de Wh pour stocké un mail un an
    let nb_Go_Stockes = 92 ;           //Nombre de giga stocké par le salarié sur le cloud (A récupérer dans le formulaire)
    let nb_Mail_Envoyes = 7;         //Nombre de mails envoyé par jour par le salarié (A récupérer dans le formulaire)

    return (Wh_pour_un_Go*nb_Go_Stockes+Wh_pour_un_Mail*nb_Mail_Envoyes*52*NbHeureDeTravail[2])/1000;

}

/// <summary>
/// Calcul la valeur énergétique d'un salarié sur une année complete pour ce qui est de ses déplacements maison boulot
/// </summary>
/// <param name="NbHeureDeTravail">(tableau) Nb d'heures de travail et Nb d'heure de pause d</param>
/// <returns>Retourne la consommation énergétique du aux déplacements quotidiens du salarié sur une année (en kWh) </returns>
function consommation_deplacement_quotidien(NbHeureDeTravail){

    let type_de_transport='voiture';      //(A recupérer dans le formulaire)
    let nb_km_quotidien = 21;                 //(A recupérer dans le formulaire)
    let UEC_transport_quotidien;
    let valeur_energetique_transport;

    switch (type_de_transport){
        case 'voiture' :
            valeur_energetique_transport = 600;
            let bool_covoiturage=false;   //(A recupérer dans le formulaire)
            if (bool_covoiturage == true)
            {
                let nb_passagers;   //(A recupérer dans le formulaire)
                valeur_energetique_transport/=(nb_passagers+1);
            }
            break;
        case 'vehicule electrique' : 
            valeur_energetique_transport =75;           
            break;
        case 'a pied' :
            valeur_energetique_transport =0;
            break;
        case 'transport en commun' : 
            valeur_energetique_transport =150;
            break;
    }
    UEC_transport_quotidien = valeur_energetique_transport*nb_km_quotidien*2*NbHeureDeTravail[2]*52;
    return UEC_transport_quotidien/1000;
}

/// <summary>
/// Calcul la valeur énergétique d'un salarié sur une année complète pour ce qui est de ses déplacements professionnels
/// </summary>
/// <returns>Retourne la consommation énergétique du aux déplacements pro du salarié sur une année (en kWh) </returns>
function consommation_deplacement_pro(){

    let nb_km_par_annee=17542;    //(A recupérer dans le formulaire)
    let part_avion=15;         //(A recupérer dans le formulaire)
    let part_train=27;         //(A recupérer dans le formulaire)
    let part_voiture=100-15-27;       //(A recupérer dans le formulaire)

    let UEC_deplacement_pro = (nb_km_par_annee*part_avion/100*360 + nb_km_par_annee*part_train/100*80 + nb_km_par_annee*part_voiture/100*600)/1000;
    return UEC_deplacement_pro;
}

/// <summary>
/// Convertie la valeur de kWh en kg eq CO2
/// </summary>
/// <returns>Retourne le résultat de la conversion </returns>
function convertisseur_kWh_GES(UEC_kwh){

    const coefficient_conversion = 0.0001;
    return (UEC_kwh*coefficient_conversion).toFixed(2);
}