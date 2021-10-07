
document.querySelector('.entete').addEventListener('keyup', getFiltrer);
let infos = []
let load = function () {
    let tmp = JSON.parse(localStorage.getItem('arrayAmis'));
    if (tmp){
        infos = tmp;
    }
}
load()

function getFiltrer(){
    let amis = localStorage.getItem('arrayAmis');
    let arrayAmis = JSON.parse(amis)??[];
    let str = document.getElementById("keywords").value;
    if (str.length === 0){
        document.getElementById('showmsg').innerHTML = "";
    }else {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                console.log(this.responseText.split("}")[1]);
                document.getElementById('showmsg').style.display = "block";
                document.getElementById('showmsg').style.textAlign = 'center';
                document.getElementById('showmsg').innerHTML = this.responseText.split("}")[1];
                document.querySelectorAll("#chercher-user").forEach(user => {
                    user.onclick = () => {
                        ajoutAmi(user)
                        arrayAmis.push({
                            idUtilisateur:user.dataset.id,
                            nomUtilisateur:user.dataset.nom
                        })
                        localStorage.setItem('arrayAmis', JSON.stringify(arrayAmis));
                    }
                })
            }
        }
        xmlhttp.open('GET', 'public/web/script/filtrer.php?NomUtilisateur=' + str, true);
        xmlhttp.send();
    }
}

function ajoutAmi(info){
    document.querySelector(".messagerie-user").innerHTML += `
        <div id="listeAmi">
            <div class="c1" id="c1">
                <div id="prompt3">
                    <span id="imgSpan" style="left: 0; right: 0 ">${info.dataset.nom}</span>
                </div>
                <img id="img3" alt="portrait"/>        
            </div>
        </div>`
}

function loadUser(){
    infos.forEach(info => {
        document.querySelector(".messagerie-user").innerHTML += `
        <div id="listeAmi">
            <div class="c1" id="c1">
                <div id="prompt3">
                    <span id="imgSpan" style="left: 0; right: 0 ">${info.nomUtilisateur}</span>
                </div>
                <img id="img3" alt="portrait"/>        
            </div>
        </div>`
    })
}
loadUser()


function sendMessage(){
    let message = document.querySelector(".messagerie-content").value
    console.log(message)
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log(this.responseText.split("<}>")[1])
            messageHTML(this.responseText.split("}")[1])
        }
    }
    xmlhttp.open('GET', 'public/web/script/envoyer.php?message=' + message, true);
    xmlhttp.send();
}

window.onload=function() {
    if (document.addEventListener) {
        document.addEventListener("keypress", keyPressHandler, true);
    } else {
        document.attachEvent("onkeyup", keyPressHandler);
    }
    function keyPressHandler(evt) {
        if (evt.keyCode === 13) {
            sendMessage()
        }
    }
}

function messageHTML(info){
    document.querySelector('.messagerie-chat').innerHTML += `<div id="content-item">${info}</div>`
}