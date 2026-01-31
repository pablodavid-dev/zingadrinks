// ================================
// MEMÓRIA DO SISTEMA
// ================================

var quantidades = [0, 0, 0, 0, 0];

var precos = [
    20, // 1 - Vodka Tropical
    15, // 2 - Vodka Especial
    15, // 3 - Beats
    25, // 4 - Brahma
    30  // 5 - Whisky
];

var nomesCombos = [
    "Vodka Tropical (Vodka + Baly + Gelo de Maracujá)",
    "Vodka Especial (Vodka + Baly + Gelo)",
    "Combo Beats (4 unidades)",
    "Combo Brahma (4 unidades)",
    "Combo Whisky + Baly + Gelo"
];

// ================================
// ADICIONAR
// ================================
function adicionar(index) {
    quantidades[index]++;
    document.getElementById("qtd-" + index).innerText = quantidades[index];
    calcularTotal();
}

// ================================
// REMOVER
// ================================
function remover(index) {
    if (quantidades[index] > 0) {
        quantidades[index]--;
        document.getElementById("qtd-" + index).innerText = quantidades[index];
        calcularTotal();
    }
}

// ================================
// TOTAL
// ================================
function calcularTotal() {
    let total = 0;
    for (let i = 0; i < quantidades.length; i++) {
        total += quantidades[i] * precos[i];
    }

    const bairro = document.getElementById("bairro").value;
    const taxa = bairro ? Number(bairro) : 0;

    document.getElementById("total").innerText = total + taxa;
}

// ================================
// WHATSAPP
// ================================
function enviarPedido() {
    let msg = "Oi! 🍹🔥 Pedido ZINGA DRINKS:\n\n";

    let temItem = false;
    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i] > 0) {
            msg += `${quantidades[i]}x ${nomesCombos[i]}\n`;
            temItem = true;
        }
    }

    if (!temItem) msg += "Nenhum item selecionado\n";

    const bairroSelect = document.getElementById("bairro");
    if (bairroSelect.value) {
        msg += `\nEntrega: ${bairroSelect.options[bairroSelect.selectedIndex].text}`;
    }

    msg += `\nTotal: R$ ${document.getElementById("total").innerText}`;

    const rua = document.getElementById("rua").value;
    if (rua.trim()) msg += `\nRua: ${rua}`;

    window.open(
        `https://wa.me/554888509014?text=${encodeURIComponent(msg)}`,
        "_blank"
    );
}

// ================================
// STATUS
// ================================
function atualizarStatusLoja() {
    const status = document.getElementById("status-loja");
    if (!status) return;

    const hora = new Date().getHours();
    if (hora >= 19 && hora < 24) {
        status.className = "status aberto";
        status.innerText = "🟢 Aberto agora • até 00h";
    } else {
        status.className = "status fechado";
        status.innerText = "🔴 Fechado agora • abre às 19h";
    }
}

atualizarStatusLoja();
