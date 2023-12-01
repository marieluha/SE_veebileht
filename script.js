// allikas: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

function kerigeRetseptiJuurde() {
    const retseptElement = document.getElementById("retsept1");
    retseptElement.scrollIntoView({ behavior: "smooth" });
}

const retseptid = [
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
// see funktsioon leiab retseptid
function leiaRetseptid() {
    const valitudKoostisosad = Array.from(document.querySelectorAll('input[name="koostisosa"]:checked')).map(checkbox => checkbox.value);

    const sobivadRetseptid = leiaSobivadRetseptid(valitudKoostisosad);
    näitaVasted(sobivadRetseptid);
}

function leiaSobivadRetseptid(valitudKoostisosad) {
    return retseptid.map(retsept => {
        const mituSama = valitudKoostisosad.filter(koostisosa => retsept.koostisosad.includes(koostisosa)).length;
        return { name: retsept.name, mituSama: mituSama };
    }).sort((a, b) => b.mituSama - a.mituSama).slice(0, 3);
}

function näitaVasted(sobivadRetseptid) {
    const vasteteContainer = document.getElementById('retseptiVasted');
    vasteteContainer.innerHTML = '';

    if (sobivadRetseptid.length > 0) {
        vasteteContainer.style.display = 'block';

        const vasteteList = document.createElement('ul');
        sobivadRetseptid.forEach(retsept => {
            const listItem = document.createElement('li');
            listItem.textContent = `${retsept.name} (${retsept.mituSama} sama koostisosa)`;
            vasteteList.appendChild(listItem);
        });

        vasteteContainer.appendChild(vasteteList);
    } else {
        vasteteContainer.style.display = 'none';
    }
}
