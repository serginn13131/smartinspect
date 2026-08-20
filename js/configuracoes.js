```javascript
// ======================================
// SMARTINSPECT AI
// SISTEMA DE CONFIGURAÇÕES
// ======================================


let configuracoes = {

    tema: "claro",

    fonte: "normal",

    idioma: "pt-BR",

    modoAuditivo: false,

    alertasVisuais: true,

    altoContraste: false,

    reduzirAnimacoes: false,

    notificacoes: true,

    alertasEstoque: true

};


// ======================================
// CARREGAR CONFIGURAÇÕES
// ======================================

function carregarConfiguracoes(){

    try{

        const salvas =
            localStorage.getItem(
                "smartinspect_configuracoes"
            );


        if(salvas){

            configuracoes =
                {

                    ...configuracoes,

                    ...JSON.parse(salvas)

                };

        }

    }

    catch(erro){

        console.error(
            "Erro ao carregar configurações:",
            erro
        );

    }


    preencherInterface();

    aplicarConfiguracoes();

}


// ======================================
// PREENCHER INTERFACE
// ======================================

function preencherInterface(){

    const tema =
        document.getElementById("tema");

    const fonte =
        document.getElementById("fonte");

    const idioma =
        document.getElementById("idioma");

    const modoAuditivo =
        document.getElementById("modoAuditivo");

    const alertasVisuais =
        document.getElementById("alertasVisuais");

    const altoContraste =
        document.getElementById("altoContraste");

    const reduzirAnimacoes =
        document.getElementById("reduzirAnimacoes");

    const notificacoes =
        document.getElementById("notificacoes");

    const alertasEstoque =
        document.getElementById("alertasEstoque");


    if(tema)
        tema.value =
            configuracoes.tema;


    if(fonte)
        fonte.value =
            configuracoes.fonte;


    if(idioma)
        idioma.value =
            configuracoes.idioma;


    if(modoAuditivo)
        modoAuditivo.checked =
            configuracoes.modoAuditivo;


    if(alertasVisuais)
        alertasVisuais.checked =
            configuracoes.alertasVisuais;


    if(altoContraste)
        altoContraste.checked =
            configuracoes.altoContraste;


    if(reduzirAnimacoes)
        reduzirAnimacoes.checked =
            configuracoes.reduzirAnimacoes;


    if(notificacoes)
        notificacoes.checked =
            configuracoes.notificacoes;


    if(alertasEstoque)
        alertasEstoque.checked =
            configuracoes.alertasEstoque;

}


// ======================================
// APLICAR CONFIGURAÇÕES
// ======================================

function aplicarConfiguracoes(){

    const body =
        document.body;


    // ==============================
    // TEMA
    // ==============================

    body.classList.remove(
        "tema-escuro"
    );


    if(
        configuracoes.tema ===
        "escuro"
    ){

        body.classList.add(
            "tema-escuro"
        );

    }


    if(
        configuracoes.tema ===
        "automatico"
    ){

        if(
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
        ){

            body.classList.add(
                "tema-escuro"
            );

        }

    }


    // ==============================
    // FONTE
    // ==============================

    body.classList.remove(
        "fonte-grande",
        "fonte-extra-grande"
    );


    if(
        configuracoes.fonte ===
        "grande"
    ){

        body.classList.add(
            "fonte-grande"
        );

    }


    if(
        configuracoes.fonte ===
        "extra-grande"
    ){

        body.classList.add(
            "fonte-extra-grande"
        );

    }


    // ==============================
    // CONTRASTE
    // ==============================

    body.classList.toggle(

        "alto-contraste",

        configuracoes.altoContraste

    );


    // ==============================
    // ANIMAÇÕES
    // ==============================

    body.classList.toggle(

        "reduzir-animacoes",

        configuracoes.reduzirAnimacoes

    );

}


// ======================================
// SALVAR
// ======================================

async function salvarConfiguracoes(){

    configuracoes = {

        tema:
            document.getElementById(
                "tema"
            ).value,

        fonte:
            document.getElementById(
                "fonte"
            ).value,

        idioma:
            document.getElementById(
                "idioma"
            ).value,

        modoAuditivo:
            document.getElementById(
                "modoAuditivo"
            ).checked,

        alertasVisuais:
            document.getElementById(
                "alertasVisuais"
            ).checked,

        altoContraste:
            document.getElementById(
                "altoContraste"
            ).checked,

        reduzirAnimacoes:
            document.getElementById(
                "reduzirAnimacoes"
            ).checked,

        notificacoes:
            document.getElementById(
                "notificacoes"
            ).checked,

        alertasEstoque:
            document.getElementById(
                "alertasEstoque"
            ).checked

    };


    // ==============================
    // SALVAR LOCALMENTE
    // ==============================

    localStorage.setItem(

        "smartinspect_configuracoes",

        JSON.stringify(
            configuracoes
        )

    );


    // ==============================
    // APLICAR
    // ==============================

    aplicarConfiguracoes();


    // ==============================
    // AVISO
    // ==============================

    const mensagem =
        document.getElementById(
            "mensagemConfig"
        );


    mensagem.style.display =
        "block";


    setTimeout(
        () => {

            mensagem.style.display =
                "none";

        },
        3000
    );


    // ==============================
    // FUTURO SUPABASE
    // ==============================

    /*
       Depois vamos salvar essas
       preferências também na tabela
       de usuários/configurações.

       Assim cada usuário terá
       suas próprias configurações
       em qualquer dispositivo.
    */

}


// ======================================
// ALERTA VISUAL
// ======================================

function mostrarAlertaVisual(
    mensagem
){

    if(
        !configuracoes.alertasVisuais &&
        !configuracoes.modoAuditivo
    ){

        return;

    }


    const alerta =
        document.getElementById(
            "alertaVisual"
        );


    if(!alerta)
        return;


    alerta.textContent =
        mensagem;


    alerta.style.display =
        "block";


    setTimeout(
        () => {

            alerta.style.display =
                "none";

        },
        4000
    );

}


// ======================================
// DISPONIBILIZAR GLOBALMENTE
// ======================================

window.mostrarAlertaVisual =
    mostrarAlertaVisual;


// ======================================
// INICIAR
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarConfiguracoes();

    }
);
```
