//Création des Objets PC et Telephone

function Device(nomModele,type,PA,PL,PO){
    this.nomModele = nomModele; // Nom du modèle
    this.type = type            // Type de Device (Tel ou PC)
    this.PA = PA;               // Puissance en activité
    this.PL = PL;               // Puissance en veille
    this.PO = PO;               // Puissance appareil éteint
}

//Fonction du script

/// <summary>
/// Calcul le nombre d'heures de travail et le nombre d'heures de pause du salarié dans une semaine
/// </summary>
/// <returns>Retourne un tableau [nombre d'heure au travail pendant la semaine, le nombre d'heure de pause, nb de jour travaillé dans la semaine] </returns>
function nb_dheure_de_travail(heure_arrive,heure_depart,nb_jours_semaine,temps_de_pause){

return HeureDeTravail= [(heure_depart-heure_arrive)*nb_jours_semaine , temps_de_pause*nb_jours_semaine , nb_jours_semaine*1]; 
}

/// <summary>
/// Calcul la consommation du PC du salarié
/// </summary>
/// <param name="NbHeureDeTravail">(tableau) Nb d'heures de travail et Nb d'heure de pause d</param>
/// <param name="PC">(objet) Le PC demandé sur le formulaire et récupérer dans le fichier json d</param>
/// <returns>Retourne la consommation du PC par an  en kWh </returns>
function consommation_Pc(NbHeureDeTravail,ordinateurValue,nombreEcran){

    let PC = ordinateurValue.toString().split(":");
    console.log(PC);
    const SPM = 0.30;                                       // Valeur de base 30%
    const ConsoEcran = 22;
    let HA = NbHeureDeTravail[0]-NbHeureDeTravail[1];       //Nombre d'heures ou le Pc est actif par semaine
    let HL = NbHeureDeTravail[1];                           //Nombre d'heures ou le Pc est en veille par semaine
    let HO = 24*7-NbHeureDeTravail[0];                      //Nombre d'heures ou le Pc est éteint par semaine
    let UEC_Pc = (SPM* (PC[1]*HA + PC[2]*HL+ PC[3]*HO)/7)*365/1000 + ((1-SPM)*(PC[1]*(HA+HL)+PC[3]*HO)/7)*365/1000+ConsoEcran*nombreEcran*HA*52/1000;

    return UEC_Pc.toFixed(2);
}

/// <summary>
/// Calcul la consommation du salarié sur le cloud
/// </summary>
/// <param name="NbHeureDeTravail">(tableau) Nb d'heures de travail et Nb d'heure de pause d</param>
/// <returns>Retourne la consommation du salarié sur le cloud par an en kWh </returns>
function consommation_Cloud(NbHeureDeTravail,nb_Go_Stockes,nb_Mail_Envoyes){
    
    const Wh_pour_un_Go = 96;      // Nombre de Wh pour stoké 1go sur le cloud pendant un an
    const Wh_pour_un_Mail = 2.5;    //Nombre de Wh pour stocké un mail un an

    return (Wh_pour_un_Go*nb_Go_Stockes+Wh_pour_un_Mail*nb_Mail_Envoyes*52*NbHeureDeTravail[2])/1000;

}

/// <summary>
/// Calcul la valeur énergétique d'un salarié sur une année complete pour ce qui est de ses déplacements maison boulot
/// </summary>
/// <param name="NbHeureDeTravail">(tableau) Nb d'heures de travail et Nb d'heure de pause d</param>
/// <returns>Retourne la consommation énergétique du aux déplacements quotidiens du salarié sur une année (en kWh) </returns>
function consommation_deplacement_quotidien(NbHeureDeTravail,type_de_transport,nb_km_quotidien,bool_covoiturage,nb_passagers){

    let UEC_transport_quotidien;
    let valeur_energetique_transport;

    switch (type_de_transport){
        case 'voiture' :
            valeur_energetique_transport = 600;
            if (bool_covoiturage == true)
            {
                valeur_energetique_transport/=(nb_passagers+1);
            }
            break;
        case 'vehicule_electrique' : 
            valeur_energetique_transport =75;     
            if (bool_covoiturage == true)
            {
                valeur_energetique_transport/=(nb_passagers+1);
            }      
            break;
        case 'pied' :
            valeur_energetique_transport =0;
            break;
        case 'transport_en_commun' : 
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
function consommation_deplacement_pro(part_avion,part_train,part_voiture){

    let UEC_deplacement_pro = (part_avion*360 + part_train*80 + part_voiture*600)/1000;
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