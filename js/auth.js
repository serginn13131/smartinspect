```javascript
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

function sair() {

    localStorage.removeItem("usuario");

    window.location.href =
        "login.html";

}


// ======================================
// PERMISSÕES
// ======================================

const permissoes = {

    // ==================================
    // ADM
    // ==================================

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

        "solicitacoes",

        "notificacoes",

        "perfil",

        "configuracoes",

        "atendimento"

    ],


    // ==================================
    // ENGENHEIRO
    // ==================================

    engenheiro: [

        "index",

        "obras",

        "imoveis",

        "criar",

        "inspecoes",

        "estoque",

        "ia",

        "relatorios",

        "perfil",

        "configuracoes"

    ],


    // ==================================
    // INSPETOR
    // ==================================

    inspetor: [

        "index",

        "obras",

        "inspecoes",

        "ia",

        "relatorios",

        "perfil",

        "configuracoes"

    ],


    // ==================================
    // TÉCNICO
    // ==================================

    tecnico: [

        "index",

        "obras",

        "inspecoes",

        "estoque",

        "perfil",

        "configuracoes"

    ],


    // ==================================
    // USUÁRIO
    // ==================================

    usuario: [

        "index",

        "inspecoes",

        "perfil",

        "configuracoes"

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
// CONTROLAR MENU
// ======================================

function controlarMenu() {

    const links =
        document.querySelectorAll(
            ".sidebar a"
        );

    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href === "#"
        ) {

            return;

        }

        let pagina =
            href
                .replace(".html", "")
                .replace("#", "")
                .trim();

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
// PÁGINAS ESPECIAIS
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

    "usuarios":
        "usuarios",

    "solicitacoes":
        "solicitacoes",

    "atendimento":
        "atendimento",

    "configuracoes":
        "configuracoes"

};


// ======================================
// PROTEGER PÁGINA
// ======================================

function protegerPagina(pagina) {

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
            "❌ Você não tem permissão para acessar esta área"
        );

        window.location.href =
            "index.html";

        return false;

    }

    return true;

}


// ======================================
// INICIALIZAÇÃO
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * A sidebar é carregada
         * separadamente pelo sidebar.js.
         *
         * Por isso damos um pequeno
         * tempo para ela aparecer.
         */

        setTimeout(() => {

            controlarMenu();

        }, 300);


        const arquivoAtual =
            window.location.pathname
                .split("/")
                .pop();


        const paginaAtual =
            arquivoAtual
                .replace(".html", "")
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
);
```
