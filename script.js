function randomEquation() {
    const equations = [
        '∫ e^x dx = e^x + C',
        'Σ (n=1 bis ∞) 1/n² = π²/6',
        'lim (x→∞) (1 + 1/x)^x = e',
        'P(A|B) = P(A ∩ B) / P(B)',
        'y = mx + b',
        'E = mc²',
        'a² + b² = c²'
    ];
    return equations[Math.floor(Math.random() * equations.length)];
}

function berechneSteuer() {
    let ergebnisDiv = document.getElementById("ergebnis");
    let loadingOverlay = document.getElementById("loadingOverlay");
    let berechnungsText = document.getElementById("berechnungsText");
    loadingOverlay.style.display = "flex";
    setTimeout(() => { loadingOverlay.style.opacity = "1"; }, 10);

    let interval = setInterval(() => {
        berechnungsText.innerHTML = randomEquation();
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        let einkommen = parseFloat(document.getElementById("einkommen").value);
        let kinder = parseInt(document.getElementById("kinder").value) || 0;
        let ausgaben = parseFloat(document.getElementById("ausgaben").value) || 0;
        let steuer;
        let emoji;

        if (einkommen <= 11000) {
            steuer = 0;
            emoji = "😃";
        } else if (einkommen <= 18000) {
            steuer = (einkommen - 11000) * 0.2;
            emoji = "🙂";
        } else if (einkommen <= 31000) {
            steuer = (einkommen - 18000) * 0.3 + 1400;
            emoji = "😐";
        } else if (einkommen <= 60000) {
            steuer = (einkommen - 31000) * 0.42 + 5300;
            emoji = "😕";
        } else {
            steuer = (einkommen - 60000) * 0.48 + 17600;
            emoji = "😩";
        }

        steuer -= kinder * 500;
        steuer -= ausgaben * 0.5;
        steuer = Math.max(steuer, 0);

        loadingOverlay.style.opacity = "0";
        setTimeout(() => { loadingOverlay.style.display = "none"; }, 300);
        ergebnisDiv.innerHTML = `Ihre Steuerlast beträgt: € ${steuer.toFixed(2)} ${emoji}`;
    }, 3000);
}
