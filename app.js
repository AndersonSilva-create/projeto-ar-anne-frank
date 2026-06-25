
/* ====================================== */
/* CONFIGURAÇÕES GLOBAIS */
/* ====================================== */

const CONFIG = {

    velocidadeJoystick: 0.045,

    fadeDuration: 450,

    limiteMinX: -2.6,
    limiteMaxX: 2.6,

    limiteMinZ: -9.4,
    limiteMaxZ: 1.6,

    yTerreo: 1.6,
    yAndar1: 5.6,
    ySotao: 9.6

};

/* ====================================== */
/* ESTADO GLOBAL */
/* ====================================== */

const STATE = {

    estanteAberta: false,

    paginaAtual: 0,

    modoNoturno: false,

    joystickAtivo: false,

    joystickX: 0,
    joystickY: 0,

    falaAtualAnne: 0,

    diarioAberto: false,

    objetoInspecionado: null

};

/* ====================================== */
/* CACHE DOM */
/* ====================================== */

const HUD =
    document.getElementById("hud-message");

const fadeScreen =
    document.getElementById("fade-screen");

const diaryModal =
    document.getElementById("diary-modal");

const diaryDate =
    document.getElementById("diary-date");

const diaryContent =
    document.getElementById("diary-content");

const prevPageBtn =
    document.getElementById("prev-page");

const nextPageBtn =
    document.getElementById("next-page");

const pageCounter =
    document.getElementById("page-counter");

const closeDiaryBtn =
    document.getElementById("close-diary");

const qrModal =
    document.getElementById("qr-modal");

const qrImage =
    document.getElementById("qr-image");

const closeQrBtn =
    document.getElementById("close-qr");

const anneDialog =
    document.getElementById("anne-dialog");

const inspectPanel =
    document.getElementById("inspect-panel");

const inspectTitle =
    document.getElementById("inspect-title");

const inspectText =
    document.getElementById("inspect-text");

const inspectClose =
    document.getElementById("inspect-close");

const toggleLightBtn =
    document.getElementById("toggle-light");

const openQrBtn =
    document.getElementById("open-qr");

/* ====================================== */
/* ELEMENTOS A-FRAME */
/* ====================================== */

const cameraRig =
    document.getElementById("camera-rig");

const camera =
    document.getElementById("visao-usuario");

const estante =
    document.getElementById("estante-secreta");

const diario =
    document.getElementById("objeto-diario");

const anne =
    document.getElementById("anne-frank-3d");

const subirAndar1 =
    document.getElementById("subir-andar1");

const subirSotao =
    document.getElementById("subir-sotao");

const descerAndar1 =
    document.getElementById("descer-andar1");

const descerSotao =
    document.getElementById("descer-sotao");

const armario =
    document.getElementById("armario");

const bauHistorico =
    document.getElementById("bau-historico");

const caixaDocumentos =
    document.getElementById("caixa-documentos");

const ambientLight =
    document.getElementById("ambient-light");

const sunLight =
    document.getElementById("sun-light");

const mobileAction =
    document.getElementById("mobile-action");

/* ====================================== */
/* DIÁRIO */
/* ====================================== */

const PAGINAS_DIARIO = [

    {
        data: "9 de Julho de 1942",
        texto: "Ficou combinado que partiríamos no dia 16 de julho. Mas a passagem teve de ser antecipada. O esconderijo era no prédio dos escritórios do papai. Uma estante escondia a porta de entrada."
    },

    {
        data: "11 de Julho de 1942",
        texto: "O Anexo Secreto é o esconderijo ideal. Embora seja úmido e inclinado, você não encontrará outro local tão confortavelmente decorado em toda Amsterdã."
    },

    {
        data: "1 de Outubro de 1942",
        texto: "Ontem apanhei um susto terrível. Às oito horas da noite, a campainha tocou forte. Pensei logo que fosse alguém vindo nos buscar."
    },

    {
        data: "19 de Novembro de 1942",
        texto: "Poderíamos fechar os olhos perante toda essa miséria, mas pensamos naqueles que nos eram queridos e para os quais tememos o pior."
    },

    {
        data: "6 de Junho de 1944",
        texto: "É o Dia D. Os Aliados desembarcaram na Normandia. O rádio fala em esperança. Será que a libertação está próxima?"
    }

];

/* ====================================== */
/* FALAS DA ANNE */
/* ====================================== */

const FALAS_ANNE = [

    "Apesar de tudo, continuo acreditando na bondade das pessoas.",

    "Enquanto houver esperança, existe um motivo para continuar.",

    "Os pensamentos podem viajar para lugares que ninguém consegue prender.",

    "Quero continuar vivendo mesmo depois da minha morte.",

    "A liberdade parece pequena apenas para quem nunca a perdeu."

];

/* ====================================== */
/* OBJETOS HISTÓRICOS */
/* ====================================== */

const OBJETOS = {

    bau: {

        titulo: "Baú Histórico",

        texto:
            "Este baú representa os poucos pertences que muitas famílias escondidas conseguiam preservar durante a guerra."

    },

    documentos: {

        titulo: "Documentos",

        texto:
            "Papéis, registros e cartas eram frequentemente escondidos para evitar perseguições e preservar identidades."

    }

};

/* ====================================== */
/* UTILITÁRIOS */
/* ====================================== */

function atualizarHUD(texto) {

    HUD.textContent = texto;

}

function isMobile() {

    return (
        /Android|iPhone|iPad|iPod/i
            .test(navigator.userAgent)
    );

}

function clamp(valor, min, max) {

    return Math.max(
        min,
        Math.min(max, valor)
    );

}

function getRigPosition() {

    return cameraRig.object3D.position;

}

function setRigPosition(x, y, z) {

    cameraRig.setAttribute(
        "position",
        `${x} ${y} ${z}`
    );

}

console.log(
    "Configuração inicial carregada."
);

/* ====================================== */
/* DIÁRIO */
/* ====================================== */

function atualizarDiario() {

    const pagina =
        PAGINAS_DIARIO[
        STATE.paginaAtual
        ];

    diaryDate.textContent =
        pagina.data;

    diaryContent.textContent =
        pagina.texto;

    pageCounter.textContent =
        `Pág. ${STATE.paginaAtual + 1} / ${PAGINAS_DIARIO.length}`;

    prevPageBtn.disabled =
        STATE.paginaAtual === 0;

    nextPageBtn.disabled =
        STATE.paginaAtual ===
        PAGINAS_DIARIO.length - 1;

}

function abrirDiario() {

    STATE.diarioAberto =
        true;

    atualizarDiario();

    diaryModal.classList.add(
        "active"
    );

    if (
        document.exitPointerLock
    ) {
        document.exitPointerLock();
    }

    atualizarHUD(
        "Lendo o diário..."
    );

}

function fecharDiario() {

    STATE.diarioAberto =
        false;

    diaryModal.classList.remove(
        "active"
    );

    atualizarHUD(
        "Explore o Anexo Secreto"
    );

}

function paginaAnterior() {

    if (
        STATE.paginaAtual > 0
    ) {

        STATE.paginaAtual--;

        atualizarDiario();

    }

}

function paginaSeguinte() {

    if (
        STATE.paginaAtual <
        PAGINAS_DIARIO.length - 1
    ) {

        STATE.paginaAtual++;

        atualizarDiario();

    }

}

function executarInteracaoCursor() {

    const cursor =
        document.querySelector(
            "a-cursor"
        );

    if (
        !cursor ||
        !cursor.components.raycaster
    ) {
        return;
    }

    const intersecoes =
        cursor.components.raycaster
            .intersections;

    if (
        !intersecoes.length
    ) {
        return;
    }

    intersecoes[0]
        .object
        .el
        .emit("click");

}

/* ====================================== */
/* INSPEÇÃO */
/* ====================================== */

function abrirInspecao(
    titulo,
    texto
) {

    STATE.objetoInspecionado =
        titulo;

    inspectTitle.textContent =
        titulo;

    inspectText.textContent =
        texto;

    inspectPanel.classList.add(
        "active"
    );

    atualizarHUD(
        "Objeto histórico"
    );

}

function fecharInspecao() {

    STATE.objetoInspecionado =
        null;

    inspectPanel.classList.remove(
        "active"
    );

    atualizarHUD(
        "Explore o ambiente"
    );

}

/* ====================================== */
/* ANNE FRANK */
/* ====================================== */

let anneTimeout = null;

function mostrarFalaAnne() {

    const fala =
        FALAS_ANNE[
        STATE.falaAtualAnne
        ];

    anneDialog.textContent =
        fala;

    anneDialog.classList.add(
        "active"
    );

    clearTimeout(
        anneTimeout
    );

    anneTimeout =
        setTimeout(
            () => {

                anneDialog.classList.remove(
                    "active"
                );

            },
            5000
        );

    STATE.falaAtualAnne++;

    if (
        STATE.falaAtualAnne >=
        FALAS_ANNE.length
    ) {

        STATE.falaAtualAnne = 0;

    }

}

/* ====================================== */
/* EVENTOS DO DIÁRIO */
/* ====================================== */

diario.addEventListener(
    "click",
    abrirDiario
);

closeDiaryBtn.addEventListener(
    "click",
    fecharDiario
);

prevPageBtn.addEventListener(
    "click",
    paginaAnterior
);

nextPageBtn.addEventListener(
    "click",
    paginaSeguinte
);

/* ====================================== */
/* EVENTOS DE INSPEÇÃO */
/* ====================================== */

bauHistorico.addEventListener(
    "click",
    () => {

        abrirInspecao(
            OBJETOS.bau.titulo,
            OBJETOS.bau.texto
        );

    }
);

caixaDocumentos.addEventListener(
    "click",
    () => {

        abrirInspecao(
            OBJETOS.documentos.titulo,
            OBJETOS.documentos.texto
        );

    }
);

inspectClose.addEventListener(
    "click",
    fecharInspecao
);

/* ====================================== */
/* EVENTO ANNE */
/* ====================================== */

anne.addEventListener(
    "click",
    mostrarFalaAnne
);

console.log(
    "Interações do diário e Anne carregadas."
);

/* ====================================== */
/* FADE */
/* ====================================== */

function fadeIn() {

    return new Promise(
        resolve => {

            fadeScreen.classList.add(
                "active"
            );

            setTimeout(
                resolve,
                CONFIG.fadeDuration
            );

        });

}

function fadeOut() {

    return new Promise(
        resolve => {

            fadeScreen.classList.remove(
                "active"
            );

            setTimeout(
                resolve,
                CONFIG.fadeDuration
            );

        });

}

/* ====================================== */
/* TELETRANSPORTE */
/* ====================================== */

async function teleportar(
    destinoY
) {

    await fadeIn();

    const pos =
        getRigPosition();

    setRigPosition(
        pos.x,
        destinoY,
        pos.z
    );

    await fadeOut();

}

/* ====================================== */
/* ESTANTE SECRETA */
/* ====================================== */

function abrirEstante() {

    if (
        STATE.estanteAberta
    ) {
        return;
    }

    STATE.estanteAberta =
        true;

    estante.setAttribute(
        "animation",
        {
            property: "position",
            to: "1.8 1.5 -1.9",
            dur: 1400,
            easing: "easeInOutQuad"
        }
    );

    atualizarHUD(
        "Passagem secreta revelada"
    );

}

estante.addEventListener(
    "click",
    abrirEstante
);

/* ====================================== */
/* ESCADAS */
/* ====================================== */

subirAndar1.addEventListener(
    "click",
    () => {

        teleportar(
            CONFIG.yAndar1
        );

    }
);

subirSotao.addEventListener(
    "click",
    () => {

        teleportar(
            CONFIG.ySotao
        );

    }
);

descerAndar1.addEventListener(
    "click",
    () => {

        teleportar(
            CONFIG.yTerreo
        );

    }
);

descerSotao.addEventListener(
    "click",
    () => {

        teleportar(
            CONFIG.yAndar1
        );

    }
);

/* ====================================== */
/* DESCIDA AUTOMÁTICA */
/* ====================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "e"
        ) {
            return;
        }

        const pos =
            getRigPosition();

        if (
            pos.y > 8
        ) {

            teleportar(
                CONFIG.yAndar1
            );

            return;

        }

        if (
            pos.y > 4
        ) {

            teleportar(
                CONFIG.yTerreo
            );

        }

    }
);

/* ====================================== */
/* QR CODE */
/* ====================================== */

function abrirQR() {

    const url =
        encodeURIComponent(
            window.location.href
        );

    qrImage.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${url}`;

    qrModal.classList.add(
        "active"
    );

}

function fecharQR() {

    qrModal.classList.remove(
        "active"
    );

}

openQrBtn.addEventListener(
    "click",
    abrirQR
);

closeQrBtn.addEventListener(
    "click",
    fecharQR
);

/* ====================================== */
/* MODO DIA / NOITE */
/* ====================================== */

function atualizarModoVisual() {

    if (
        STATE.modoNoturno
    ) {

        ambientLight.setAttribute(
            "intensity",
            0.15
        );

        ambientLight.setAttribute(
            "color",
            "#4f6380"
        );

        sunLight.setAttribute(
            "intensity",
            0.35
        );

        sunLight.setAttribute(
            "color",
            "#9bb6ff"
        );

        toggleLightBtn.textContent =
            "Modo Dia";

        atualizarHUD(
            "Modo noturno ativado"
        );

    }

    else {

        ambientLight.setAttribute(
            "intensity",
            0.35
        );

        ambientLight.setAttribute(
            "color",
            "#bfc9d4"
        );

        sunLight.setAttribute(
            "intensity",
            1.2
        );

        sunLight.setAttribute(
            "color",
            "#fff1c2"
        );

        toggleLightBtn.textContent =
            "Modo Noite";

        atualizarHUD(
            "Modo diurno ativado"
        );

    }

}

toggleLightBtn.addEventListener(
    "click",
    () => {

        STATE.modoNoturno =
            !STATE.modoNoturno;

        atualizarModoVisual();

    }
);

console.log(
    "Teleporte, QR Code e iluminação carregados."
);

/* ====================================== */
/* MOTOR DE COLISÃO */
/* ====================================== */

AFRAME.registerComponent(
    "motor-colisao",
    {

        init() {

            this.lastX = 0;
            this.lastZ = 0;

        },

        tick() {

            if (
                STATE.diarioAberto ||
                STATE.objetoInspecionado
            ) {
                return;
            }

            const pos =
                this.el.object3D.position;

            const currentX = pos.x;
            const currentZ = pos.z;
            const currentY = pos.y;

            /* ========================= */
            /* LIMITES GERAIS */
            /* ========================= */

            pos.x = clamp(
                currentX,
                CONFIG.limiteMinX,
                CONFIG.limiteMaxX
            );

            pos.z = clamp(
                currentZ,
                CONFIG.limiteMinZ,
                CONFIG.limiteMaxZ
            );

            /* ========================= */
            /* ESTANTE FECHADA */
            /* ========================= */

            if (
                !STATE.estanteAberta
            ) {

                const dentroPassagemX =
                    pos.x > -0.95 &&
                    pos.x < 0.95;

                const tentandoEntrar =
                    pos.z < -1.5;

                if (
                    dentroPassagemX &&
                    tentandoEntrar
                ) {

                    pos.z = -1.5;

                }

            }

            /* ========================= */
            /* ARMÁRIO */
            /* ========================= */

            if (
                currentY < 3
            ) {

                const colidiuArmario =

                    pos.x < -1.8 &&
                    pos.x > -3.0 &&

                    pos.z < -7.4 &&
                    pos.z > -9.5;

                if (
                    colidiuArmario
                ) {

                    pos.x = this.lastX;
                    pos.z = this.lastZ;

                }

            }

            /* ========================= */
            /* CAMA */
            /* ========================= */

            if (
                currentY > 3 &&
                currentY < 7
            ) {

                const colidiuCama =

                    pos.x > -0.2 &&
                    pos.x < 1.7 &&

                    pos.z < -7.4 &&
                    pos.z > -9.6;

                if (
                    colidiuCama
                ) {

                    pos.x = this.lastX;
                    pos.z = this.lastZ;

                }

            }

            /* ========================= */
            /* PROTEÇÃO PAREDE FUNDO */
            /* ========================= */

            if (
                pos.z < -9.4
            ) {

                pos.z = -9.4;

            }

            /* ========================= */
            /* PROTEÇÃO PAREDE FRENTE */
            /* ========================= */

            if (
                pos.z > 1.6
            ) {

                pos.z = 1.6;

            }

            /* ========================= */
            /* MEMÓRIA */
            /* ========================= */

            this.lastX = pos.x;
            this.lastZ = pos.z;

        }

    }
);

console.log(
    "Motor de colisão carregado."
);

/* ====================================== */
/* JOYSTICK MOBILE */
/* ====================================== */

const joystick =
    document.getElementById(
        "mobile-joystick"
    );

const joystickBase =
    document.getElementById(
        "joystick-base"
    );

const joystickKnob =
    document.getElementById(
        "joystick-knob"
    );

let joystickPointerId = null;

const JOYSTICK = {

    centerX: 0,
    centerY: 0,

    radius: 50,

    active: false,

    moveX: 0,
    moveY: 0

};

function atualizarCentroJoystick() {

    const rect =
        joystickBase.getBoundingClientRect();

    JOYSTICK.centerX =
        rect.left + rect.width / 2;

    JOYSTICK.centerY =
        rect.top + rect.height / 2;

}

function resetJoystick() {

    JOYSTICK.active = false;

    JOYSTICK.moveX = 0;
    JOYSTICK.moveY = 0;

    joystickKnob.style.left =
        "40px";

    joystickKnob.style.top =
        "40px";

}

function moverJoystick(clientX, clientY) {

    let dx =
        clientX - JOYSTICK.centerX;

    let dy =
        clientY - JOYSTICK.centerY;

    const distance =
        Math.hypot(dx, dy);

    if (
        distance > JOYSTICK.radius
    ) {

        const scale =
            JOYSTICK.radius / distance;

        dx *= scale;
        dy *= scale;

    }

    JOYSTICK.moveX =
        dx / JOYSTICK.radius;

    JOYSTICK.moveY =
        dy / JOYSTICK.radius;

    joystickKnob.style.left =
        `${40 + dx}px`;

    joystickKnob.style.top =
        `${40 + dy}px`;

}

/* ====================================== */
/* TOUCH START */
/* ====================================== */

joystick.addEventListener(
    "pointerdown",
    event => {

        joystickPointerId =
            event.pointerId;

        JOYSTICK.active = true;

        atualizarCentroJoystick();

        moverJoystick(
            event.clientX,
            event.clientY
        );

    }
);

/* ====================================== */
/* Click botão de interação */
/* ====================================== */

mobileAction.addEventListener("click", executarInteracaoCursor);


/* ====================================== */
/* TOUCH MOVE */
/* ====================================== */

window.addEventListener(
    "pointermove",
    event => {

        if (
            !JOYSTICK.active
        ) {
            return;
        }

        if (
            event.pointerId !==
            joystickPointerId
        ) {
            return;
        }

        moverJoystick(
            event.clientX,
            event.clientY
        );

    }
);

/* ====================================== */
/* TOUCH END */
/* ====================================== */

window.addEventListener(
    "pointerup",
    event => {

        if (
            event.pointerId !==
            joystickPointerId
        ) {
            return;
        }

        joystickPointerId = null;

        resetJoystick();

    }
);

window.addEventListener(
    "pointercancel",
    resetJoystick
);

/* ====================================== */
/* MOVIMENTO */
/* ====================================== */

function atualizarJoystick() {

    if (
        !isMobile()
    ) {
        return;
    }

    if (
        !JOYSTICK.active
    ) {
        return;
    }

    const rig =
        cameraRig.object3D;

    const cameraObj =
        camera.object3D;

    const rotY =
        cameraObj.rotation.y;

    const frenteX =
        -Math.sin(rotY);

    const frenteZ =
        -Math.cos(rotY);

    const lateralX =
        Math.cos(rotY);

    const lateralZ =
        -Math.sin(rotY);

    rig.position.x +=
        (
            frenteX *
            (-JOYSTICK.moveY) +

            lateralX *
            JOYSTICK.moveX
        ) *
        CONFIG.velocidadeJoystick;

    rig.position.z +=
        (
            frenteZ *
            (-JOYSTICK.moveY) +

            lateralZ *
            JOYSTICK.moveX
        ) *
        CONFIG.velocidadeJoystick;

}

/* ====================================== */
/* LOOP CENTRAL */
/* ====================================== */

function animationLoop() {

    atualizarJoystick();

    requestAnimationFrame(
        animationLoop
    );

}

requestAnimationFrame(
    animationLoop
);

console.log(
    "Joystick mobile carregado."
);

/* ====================================== */
/* WEBXR */
/* ====================================== */

function verificarWebXR() {

    if (
        !navigator.xr
    ) {

        console.warn(
            "WebXR não suportado."
        );

        return;

    }

    navigator.xr
        .isSessionSupported(
            "immersive-ar"
        )
        .then(
            suportado => {

                if (
                    suportado
                ) {

                    atualizarHUD(
                        "AR disponível neste dispositivo"
                    );

                }

            }
        )
        .catch(
            () => { }
        );

}

/* ====================================== */
/* QR AUTOMÁTICO */
/* ====================================== */

function prepararQRCode() {

    if (
        !qrImage
    ) {
        return;
    }

    const url =
        encodeURIComponent(
            window.location.href
        );

    qrImage.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${url}`;

}

/* ====================================== */
/* HUD */
/* ====================================== */

function atualizarMensagemInicial() {

    if (
        isMobile()
    ) {

        atualizarHUD(
            "Use o joystick para explorar"
        );

        return;

    }

    atualizarHUD(
        "Use WASD e clique nos objetos"
    );

}

/* ====================================== */
/* MOBILE */
/* ====================================== */

function configurarMobile() {

    if (
        !isMobile()
    ) {
        return;
    }

    const joystick =
        document.getElementById(
            "mobile-joystick"
        );

    if (
        joystick
    ) {

        joystick.style.display =
            "block";

    }

}

/* ====================================== */
/* EVENTOS GLOBAIS */
/* ====================================== */

function registrarEventosGlobais() {

    window.addEventListener(
        "resize",
        () => {

            if (
                typeof atualizarCentroJoystick ===
                "function"
            ) {

                atualizarCentroJoystick();

            }

        }
    );

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                resetJoystick?.();

            }

        }
    );

}

/* ====================================== */
/* OTIMIZAÇÕES */
/* ====================================== */

function aplicarOtimizacoes() {

    const scene =
        document.querySelector(
            "a-scene"
        );

    if (
        !scene
    ) {
        return;
    }

    scene.renderer.sortObjects =
        true;

    scene.renderer.outputEncoding =
        THREE.sRGBEncoding;

}

/* ====================================== */
/* INICIALIZAÇÃO */
/* ====================================== */

function initApp() {

    atualizarMensagemInicial();

    configurarMobile();

    prepararQRCode();

    verificarWebXR();

    registrarEventosGlobais();

    const scene =
        document.querySelector(
            "a-scene"
        );

    if (
        scene &&
        scene.hasLoaded
    ) {

        aplicarOtimizacoes();

    }

    else if (scene) {

        scene.addEventListener(
            "loaded",
            aplicarOtimizacoes,
            { once: true }
        );

    }

    console.log(
        "Anexo Secreto iniciado."
    );

}

/* ====================================== */
/* START */
/* ====================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initApp,
        { once: true }
    );

}
else {

    initApp();

}
