// allikas: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

function kerigeRetseptiJuurde() {
    const retseptElement = document.getElementById("retsept1");
    retseptElement.scrollIntoView({ behavior: "smooth" });
}

// Retsepti otsija kirjutatud Mattiase poolt Google-i abiga

// Retseptide massiiv
const retseptid = [
    // Iga retsept koosneb nimest ja koostisosadest
    { name: "Kaneelirullid", koostisosad: ["Või", "Piim", "Suhkur","Nisujahu","Pärm"] },
    { name: "Ülepannikoogid", koostisosad: ["Muna","Nisujahu","Suhkur","Piim","Või","Sool"] },
    { name: "Šokolaadi kringel", koostisosad: ["Pärm", "Piim", "Suhkur","Sool","Nisujahu","Või","Muna","Šokolaad"] },
    { name: "Klassikalised õhukesed vahvlid", koostisosad: ["Muna","Nisujahu","Suhkur","Piim","Või","Vanillisuhkur"] },
    { name: "Vanilliküpsised", koostisosad: ["Või","Suhkur","Vanillisuhkur","Toiduõli","Jahu","Küpsetuspulber"]},
    { name: "Makroonid", koostisosad: ["Munavalge","Mandlilaastud","Tuhksuhkur","Peeneteraline suhkur","Pulbriline toiduvärv","Või"] },
    { name: "Rabarberikook", koostisosad: ["Muna","Suhkur","Jahu","Pannkoogijahu","Või","Hapukoor","Rabarberivars","Kaneel","Tuhksuhkur"] },
    { name: "Brownie", koostisosad: ["Muna", "Suhkur", "Jahu", "Või", "Tume 70 % šokolaad", "Kreeka pähklid", "Sool", "Vanilliekstrakt"] },
    { name: "Lihapirukad", koostisosad: ["Jahu","Suhkur","Sool","Või","Presspärm","Vesi","Muna","Seguhakkliha","Sibul","Pipar"] },
    { name: "Peedi ja sinihallitusjuustu pirukad", koostisosad: ["Pärmi-lehttaigen", "Peet", "Sinihallitusjuust","Muna"] },
    { name: "Lihtne juustuküpsetis", koostisosad: ["Juust","Või","Muna","Hapukoor","Kodujuust","Jahu"] },
    { name: "Suvikõrvitsavorm", koostisosad: ["Suvikõrvits","Sibul","Muna","Peekon","Õli","Riivjuust","Nisujahu","Küpsetuspulber","Sool","Pipar"] },
    { name: "Porgandipirukas", koostisosad: ["Või","Jahu","Munakollane","Sool","Porgand","Sibul","Seened","Muna","Küüslaugu küüs","Rõõsk koor","Parmesan","Soolapähklid"] },
    { name: "Viineripirukad", koostisosad: ["Pärmi-lehttaigen","Viinerid","Paprika","Muna"] },
    { name: "Quiche", koostisosad: ["Jahu","Sool","Või","Vesi","Sibul","Sink","Muna","Rõõsk koor","Hapukoor","Riivjuust"] },
];
// See funktsioon on lõplik funktsioon, mis kutsub enda sees üles teisi funktsioone 
function leiaRetseptid() {
    // Massiiv kus on kasutaja poolt valitud koostisosad
    const valitudKoostisosad = Array.from(document.querySelectorAll('input[name="koostisosa"]:checked')).map(checkbox => checkbox.value);
    // Massiiv, kus on 3 kasutaja valitud koostisosadega kõige sobilikumat retsepti
    const sobivadRetseptid = leiaSobivadRetseptid(valitudKoostisosad);
    // Näitab sobivaid retsepte lehe peal 
    näitaVasted(sobivadRetseptid);
}

// See funktsioon leiab retseptid, mis sisaldavad valitud koostisosasid
function leiaSobivadRetseptid(valitudKoostisosad) {
    // Tagastab retseptid, mis sisaldavad valitud koostisosasid
    return retseptid.map(retsept => {
        // Massiiv, kus on iga retsept ja mitu kasutaja poolt valitud koostisosa selles retseptis on
        const mituSama = valitudKoostisosad.filter(koostisosa => retsept.koostisosad.includes(koostisosa)).length;
        // Tagastatakse retsepti nimi ja mitu sobivat koostisosa selles retseptis on
        return { name: retsept.name, mituSama: mituSama };
    }).sort((a, b) => b.mituSama - a.mituSama).slice(0, 3); // Sorteerib retseptid selle järgi, mitu sobivat koostisosa retseptis on ning siis võetakse 3 kõige rohkemate sobivate koostisosadega retsepti
}
// See funktsioon näitab lehel sobivaid retsepte
function näitaVasted(sobivadRetseptid) {
    // Kõigepealt öeldakse, kuhu container-isse lähevad sobivad retseptid
    const vasteteContainer = document.getElementById('retseptiVasted');
    vasteteContainer.innerHTML = ''; // Retseptide container tühjendatakse, et seal midagi ees poleks
    // Kui on sobivad retsepte, siis need kuvatakse
    if (sobivadRetseptid.length > 0) {
        vasteteContainer.style.display = 'block'; // Retseptid kuvatakse
        // Luuakse uus pidev list, mis hiljem kuvatakse kasutajale
        const vasteteList = document.createElement('ul');
        // Tsükkel, mis lisab iga sobiva retsepti koos koostisosade arvuga listi
        sobivadRetseptid.forEach(retsept => {
            // Luuakse ajutine list, kuhu läheb iga retsept koos koostisosade arvuga, mis hiljem kuvatakse
            const listItem = document.createElement('li');
            // Listi lisatakse retsepti nimi koos samade koostisosade arvuga, mis ühtisid nendega, mis kasutaja valis
            listItem.textContent = `${retsept.name} (${retsept.mituSama} sama koostisosa)`;
            // List lisatakse juurde pidevasse listi
            vasteteList.appendChild(listItem);
        });
        // Eelloodud pidev list lisatakse vastete container-isse
        vasteteContainer.appendChild(vasteteList);
    // Kui ei ole ühtegi retsepti, kus on sobiv koostisosa, siis ei kuvata midagi
    } else {
        vasteteContainer.style.display = 'none';
    }
}
