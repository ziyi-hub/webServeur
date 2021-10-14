<?php

require_once '../../index.php';
use crise\models\Contact;


$id = $_GET['idUser'];
$contact = Contact::join('Messages','Messages.idMessage','=','Contact.idMessage')
    ->join("Utilisateurs", "Utilisateurs.idUtilisateur", "=", "Contact.idUtilisateur")
    ->where("ami", "=", "oui")
    ->where("idGroupContact", "=", null)
    ->where("Contact.idUtilisateur", "=", $id)
    ->orderBy('tempsEnvoi','ASC')
    ->get();

$moi = Contact::join('Messages','Messages.idMessage','=','Contact.idMessage')
    ->join("Utilisateurs", "Utilisateurs.idUtilisateur", "=", "Contact.idUtilisateur")
    ->where("ami", "=", "oui")
    ->where("idGroupContact", "=", null)
    ->where("Contact.idUtilisateur", "=", $_SESSION['profile']['id'])
    ->where("individuel", "=", $id)
    ->orderBy('tempsEnvoi','ASC')
    ->get();

echo $contact->merge($moi);
