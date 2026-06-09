// ===============================================
// MODAL DE MENSAGENS
// ===============================================

function mostrarModal(mensagem, callback = null) {

    // Remove modal anterior, caso exista.
    const modalExistente = document.getElementById('modal-overlay');

    if (modalExistente) {
        modalExistente.remove();
    }

    // Cria estrutura do modal.
    const overlay = document.createElement('div');

    overlay.id = 'modal-overlay';

    overlay.innerHTML = `
        <div class="modal-box">
            <p>${mensagem}</p>

            <button id="modal-ok">
                OK
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('modal-ok').addEventListener('click', () => {

        overlay.remove();

        if (typeof callback === 'function') {
            callback();
        }
    });
}


// ===============================================
// MODAL DE CONFIRMAÇÃO
// ===============================================

function confirmarModal(mensagem, callbackConfirmar) {

    const modalExistente = document.getElementById('modal-overlay');

    if (modalExistente) {
        modalExistente.remove();
    }

    const overlay = document.createElement('div');

    overlay.id = 'modal-overlay';

    overlay.innerHTML = `
        <div class="modal-box">

            <p>${mensagem}</p>

            <div class="modal-buttons">

                <button id="modal-sim">
                    Sim
                </button>

                <button id="modal-nao">
                    Não
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('modal-sim').addEventListener('click', () => {

        overlay.remove();

        if (typeof callbackConfirmar === 'function') {
            callbackConfirmar();
        }
    });

    document.getElementById('modal-nao').addEventListener('click', () => {

        overlay.remove();
    });
}