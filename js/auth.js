// ======================================
// SMARTINSPECT AI
// AUTENTICAÇÃO E PERMISSÕES
// ======================================

function getUsuario() {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
        return null;
    }

    try {
        return JSON.parse(usuario);
    } catch (erro) {
        console.error("Erro ao ler usuário:", erro);
        return null;
    }
}


// ======================================
// VERIFICAR LOGIN
// ======================================

function verificarLogin() {
    const usuario = getUsuario();

    if (!usuario) {
        window.location.href = "login.html";
        return false;
    }

    return true;
}


// ======================================
// SAIR
// ======================================

function sair() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}


// ======================================
// PERMISSÕES
// ======================================

const permissoes = {

    adm: [
        "index",
        "obras",
        "imoveis",
        "criar",
        "usuarios",
        "inspecoes",
        "estoque",
        "ia",
        "relatorios",
        "equipe",
        "solicitacoes",
        "notificacoes",
        "perfil"
    ],

    engenheiro: [
        "index",
        "obras",
        "imoveis",
        "criar",
        "inspecoes",
        "estoque",
        "ia",
        "relatorios",
        "perfil"
    ],

    inspetor: [
        "index",
        "obras",
        "inspecoes",
        "ia",
        "relatorios",
        "perfil"
    ],

    tecnico: [
        "index",
        "obras",
        "inspecoes",
        "estoque",
        "perfil"
    ],

    usuario: [
        "index",
        "inspecoes",
        "perfil"
    ]
};


// ======================================
// VERIFICAR PERMISSÃO
// ======================================

function temPermissao(pagina) {

    const usuario = getUsuario();

    if (!usuario) {
        return false;
    }

    const cargo = usuario.nivel_acesso;

    if (!permissoes[cargo]) {
        console.warn("Cargo sem permissões:", cargo);
        return false;
    }

    return permissoes[cargo].includes(pagina);
}


// ======================================
// CONTROLAR MENU
// ======================================

function controlarMenu() {

    const links = document.querySelectorAll(".sidebar a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }

        let pagina = href
            .replace(".html", "")
            .replace("#", "")
            .trim();

        if (
            pagina &&
            !temPermissao(pagina)
        ) {
            link.style.display = "none";
        }

    });
}


// ======================================
// PÁGINAS INTERNAS
// ======================================

const paginasEspeciais = {

    "movimentar_estoque": "estoque",
    "novo_imovel": "imoveis",
    "nova_obra": "obras",
    "nova_inspecao": "inspecoes",
    "novo_estoque": "estoque",
    "novo_relatorio": "relatorios",
    "usuarios": "usuarios",
    "solicitacoes": "solicitacoes"
};


// ======================================
// PROTEGER PÁGINA
// ======================================

function protegerPagina(pagina) {

    const usuario = getUsuario();

    if (!usuario) {
        window.location.href = "login.html";
        return false;
    }

    if (paginasEspeciais[pagina]) {
        pagina = paginasEspeciais[pagina];
    }

    if (!temPermissao(pagina)) {

        alert("❌ Você não tem permissão para acessar esta área");

        window.location.href = "index.html";

        return false;
    }

    return true;
}


// ======================================
// INICIALIZAÇÃO
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    controlarMenu();

    const arquivoAtual = window.location.pathname
        .split("/")
        .pop();

    const paginaAtual = arquivoAtual
        .replace(".html", "")
        .trim();

    if (
        paginaAtual !== "" &&
        paginaAtual !== "login" &&
        paginaAtual !== "cadastro"
    ) {

        protegerPagina(paginaAtual);

    }

});
