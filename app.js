document.getElementById('monnaieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const montantRecu = parseFloat(document.getElementById('montantRecu').value);
    const montantDu = parseFloat(document.getElementById('montantDu').value);
    const resultats = calculerChange(montantRecu, montantDu);
    afficherResultats(resultats);
});

function calculerChange(montantRecu, montantDu) {
    
    let monnaie = montantRecu - montantDu;
    
    //problème éventuel : si argent reçu < montant dû, fin du programme
    if (montantRecu < montantDu) {
        return [{valeurPiece: 'Erreur', Nb: 'La somme reçue n\'est pas suffisante pour payer l\'article.'}];
    }

    if (montantRecu === montantDu) {
        return [{valeurPiece: 'Parfait !', Nb: 'La somme reçue est exactement le prix de l\'article.'}];
    }

    const monnaies = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];
    const piecesARendre = [];

    for (let i = 0; i < monnaies.length; i++) {
        let cpt = 0;
        
        while (monnaie >= monnaies[i] - 0.001) {
            monnaie -= monnaies[i];
            monnaie = parseFloat(monnaie.toFixed(2));
            cpt ++;
        }
        
        if (cpt > 0) {
                piecesARendre.push({valeurPiece : monnaies[i], Nb : cpt});
        }   
    }
    console.log(piecesARendre);
    return piecesARendre;
}

function afficherResultats(resultats) {
    const resultatHtml = document.querySelector('#resultats tbody');
    resultatHtml.innerHTML = '';

    const thead = document.querySelector('#resultats thead');
    thead.style.display = 'table-header-group';

    resultats.forEach(item => {
        const tr = document.createElement('tr');
        const tdValeurPiece = document.createElement('td');
        if (typeof item.valeurPiece === 'string') {
            tdValeurPiece.textContent = item.valeurPiece;
        } else {
            tdValeurPiece.textContent = item.valeurPiece + '€';
        }
        const tdQuantitePiece = document.createElement('td');
        tdQuantitePiece.textContent = item.Nb;
        tr.appendChild(tdValeurPiece);
        tr.appendChild(tdQuantitePiece);
        resultatHtml.appendChild(tr);
    });
}
