// ======================================
// SMARTINSPECT AI
// AUTENTICAÇÃO E PERMISSÕES
// ======================================


// ======================================
// PEGAR USUÁRIO
// ======================================

function getUsuario() {

    const usuario =
        localStorage.getItem("usuario");

    if (!usuario) {
        return null;
    }

    try {

        return JSON.parse(usuario);

    } catch (erro) {

        console.error(
            "Erro ao ler usuário:",
            erro
        );

        return null;
    }
}


// ======================================
// VERIFICAR LOGIN
// ======================================

function verificarLogin() {

    const usuario =
        getUsuario();

    if (!usuario) {

        window.location.href =
            "login.html";

        return false;
    }

    return true;
}


// ======================================
// SAIR
// ======================================

async function sair() {

    try {

        if (
            typeof banco !== "undefined" &&
            banco.auth
        ) {

            await banco.auth.signOut();

        }

    } catch (erro) {

        console.error(
            "Erro ao sair:",
            erro
        );

    }


    localStorage.removeItem(
        "usuario"
    );


    window.location.href =
        "login.html";
}


// ======================================
// PERMISSÕES
// ======================================

const permissoes = {

    // ----------------------------------
    // ADMINISTRADOR
    // ----------------------------------

    adm: [

        "index",

        "obras",

        "imoveis",

        "criar",

        "usuarios",

        "inspecoes",

        "estoque",

        "ia",

        "detalhes_inspecao",

        "relatorios",

        "equipe",

        "suporte",

        "atendimento",

        "notificacoes",

        "perfil"

    ],


    // ----------------------------------
    // ENGENHEIRO
    // ----------------------------------

    engenheiro: [

        "index",

        "obras",

        "imoveis",

        "criar",

        "inspecoes",

        "estoque",

        "ia",

        "relatorios",

        "equipe",

        "suporte",

        "notificacoes",

        "perfil"

    ],


    // ----------------------------------
    // INSPETOR
    // ----------------------------------

    inspetor: [

        "index",

        "obras",

        "inspecoes",

        "ia",

        "relatorios",

        "equipe",

        "suporte",

        "notificacoes",

        "perfil"

    ],


    // ----------------------------------
    // TÉCNICO
    // ----------------------------------

    tecnico: [

        "index",

        "obras",

        "inspecoes",

        "estoque",

        "equipe",

        "suporte",

        "notificacoes",

        "perfil"

    ],


    // ----------------------------------
    // USUÁRIO
    // ----------------------------------

    usuario: [

        "index",

        "inspecoes",

        "equipe",

        "suporte",

        "notificacoes",

        "perfil"

    ]

};


// ======================================
// VERIFICAR PERMISSÃO
// ======================================

function temPermissao(pagina) {

    const usuario =
        getUsuario();

    if (!usuario) {

        return false;

    }


    const cargo =
        usuario.nivel_acesso;


    if (!permissoes[cargo]) {

        console.warn(
            "Cargo sem permissões:",
            cargo
        );

        return false;

    }


    return permissoes[cargo]
        .includes(pagina);

}


// ======================================
// MAPA DAS PÁGINAS
// ======================================

const paginasEspeciais = {

    "movimentar_estoque":
        "estoque",

    "novo_imovel":
        "imoveis",

    "nova_obra":
        "obras",

    "nova_inspecao":
        "inspecoes",

    "novo_estoque":
        "estoque",

    "novo_relatorio":
        "relatorios",

    "detalhes_inspecao":
        "detalhes_inspecao",

    "usuarios":
        "usuarios",

    "suporte":
        "suporte",

    "atendimento":
        "atendimento",

    "notificacoes":
        "notificacoes"

};


// ======================================
// CONTROLAR MENU
// ======================================

function controlarMenu() {

    const usuario =
        getUsuario();

    if (!usuario) {

        return;

    }


    const links =
        document.querySelectorAll(
            ".sidebar a"
        );


    links.forEach(link => {

        let href =
            link.getAttribute("href");


        if (
            !href ||
            href === "#" ||
            href.startsWith("javascript:")
        ) {

            return;

        }


        let pagina =
            href

                .split("/")
                .pop()

                .replace(
                    ".html",
                    ""
                )

                .trim();


        if (
            paginasEspeciais[pagina]
        ) {

            pagina =
                paginasEspeciais[pagina];

        }


        if (
            pagina &&
            !temPermissao(pagina)
        ) {

            link.style.display =
                "none";

        }

    });

}


// ======================================
// PROTEGER PÁGINA
// ======================================

function protegerPagina(
    pagina
) {

    const usuario =
        getUsuario();


    if (!usuario) {

        window.location.href =
            "login.html";

        return false;

    }


    if (
        paginasEspeciais[pagina]
    ) {

        pagina =
            paginasEspeciais[pagina];

    }


    if (
        !temPermissao(pagina)
    ) {

        alert(
            "❌ Você não tem permissão para acessar esta área."
        );


        window.location.href =
            "index.html";


        return false;

    }


    return true;

}


// ======================================
// INICIALIZAR PERMISSÕES
// ======================================

function inicializarPermissoes() {

    controlarMenu();


    const arquivoAtual =
        window.location.pathname
            .split("/")
            .pop();


    const paginaAtual =
        arquivoAtual
            .replace(
                ".html",
                ""
            )
            .trim();


    if (

        paginaAtual !== "" &&

        paginaAtual !== "login" &&

        paginaAtual !== "cadastro"

    ) {

        protegerPagina(
            paginaAtual
        );

    }

}


// ======================================
// IMPORTANTE
// SIDEBAR É CARREGADA DEPOIS
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * A sidebar agora é carregada
         * pelo sidebar.js.
         *
         * Por isso não tentamos
         * controlar .sidebar antes
         * dela existir.
         */

        setTimeout(
            inicializarPermissoes,
            300
        );

    }
);
