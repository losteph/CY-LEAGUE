document.addEventListener('DOMContentLoaded', () => {
    caricaSquadre();
});

async function caricaSquadre() {
    try {
        const response = await fetch('dati/squadre.json');
        const squadre = await response.json();

        const container = document.getElementById('elenco-squadre');
        container.innerHTML = '';

        squadre.forEach(squadra => {
            let giocatoriHtml = '<ul>';
            squadra.rosa.forEach(giocatore => {
                giocatoriHtml += `<li>${giocatore.nome} <em>(${giocatore.ruolo})</em></li>`;
            });
            giocatoriHtml += '</ul>';

            // Costruiamo l'HTML includendo il Presidente
            const squadraHtml = `
                <div class="squadra-card">
                    <h3>${squadra.nome}</h3>
                    <div class="presidente-box">
                        <span class="label-presidente">Presidente:</span>
                        <span class="nome-presidente">${squadra.presidente || 'N.D.'}</span>
                    </div>
                    <div class="rosa-header">Rosa Giocatori</div>
                    ${giocatoriHtml}
                </div>
            `;
            container.innerHTML += squadraHtml;
        });
    } catch (error) {
        console.error("Errore nel caricamento delle squadre:", error);
    }
}
