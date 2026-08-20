async function carregarSidebar() {

    const menu =
        document.querySelector(".menu-container");

    if (!menu) return;


    try {

        const resposta =
            await fetch(
                "componentes/sidebar.html"
            );


        if (!resposta.ok) {

            console.error(
                "Erro ao carregar sidebar:",
                resposta.status
            );

            return;

        }


        const html =
            await resposta.text();


        menu.innerHTML =
            html;


        // ==========================================
        // INICIALIZAR BADGES
        // ==========================================

        inicializarBadgesSidebar();


        // ==========================================
        // CONTROLAR MENU POR CARGO
        // ==========================================

        if (
            typeof controlarMenu === "function"
        ) {

            controlarMenu();

        }


    } catch (erro) {

        console.error(
            "Erro ao carregar sidebar:",
            erro
        );

    }

}


// ==========================================
// INICIALIZAR BADGES
// ==========================================

function inicializarBadgesSidebar() {

    carregarBadgeNotificacoes();

    carregarBadgeEstoque();


    // Atualiza a cada 30 segundos

    setInterval(() => {

        carregarBadgeNotificacoes();

        carregarBadgeEstoque();

    }, 30000);

}


// ==========================================
// 🔔 NOTIFICAÇÕES
// ==========================================

async function carregarBadgeNotificacoes() {

    const badge =
        document.getElementById(
            "badgeNotificacoes"
        );


    if (!badge) return;


    try {

        if (
            typeof banco === "undefined"
        ) {

            return;

        }


        let usuario = null;


        if (
            typeof getUsuario === "function"
        ) {

            usuario =
                getUsuario();

        }


        if (!usuario) {

            badge.style.display =
                "none";

            return;

        }


        const {
            count,
            error
        } = await banco

            .from("notificacoes")

            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )

            .eq(
                "usuario_id",
                usuario.id
            )

            .eq(
                "lida",
                false
            );


        if (error) {

            console.error(
                "Erro ao contar notificações:",
                error
            );

            return;

        }


        atualizarBadge(
            badge,
            count || 0
        );


    } catch (erro) {

        console.error(
            "Erro no badge de notificações:",
            erro
        );

    }

}


// ==========================================
// 📦 ESTOQUE
// ==========================================

async function carregarBadgeEstoque() {

    const badge =
        document.getElementById(
            "badgeEstoque"
        );


    if (!badge) return;


    try {

        if (
            typeof banco === "undefined"
        ) {

            return;

        }


        const {
            data,
            error
        } = await banco

            .from("estoque")

            .select("*");


        if (error) {

            console.error(
                "Erro ao consultar estoque:",
                error
            );

            return;

        }


        if (!data) {

            atualizarBadge(
                badge,
                0
            );

            return;

        }


        let quantidadeBaixo = 0;


        data.forEach(item => {


            const quantidade =
                Number(

                    item.quantidade ??
                    item.estoque_atual ??
                    item.estoque ??
                    item.qtd ??
                    0

                );


            const minimo =
                Number(

                    item.estoque_minimo ??
                    item.quantidade_minima ??
                    item.minimo ??
                    item.estoque_min ??
                    0

                );


            if (
                minimo > 0 &&
                quantidade <= minimo
            ) {

                quantidadeBaixo++;

            }

        });


        atualizarBadge(
            badge,
            quantidadeBaixo
        );


    } catch (erro) {

        console.error(
            "Erro no badge de estoque:",
            erro
        );

    }

}


// ==========================================
// BADGE
// ==========================================

function atualizarBadge(
    badge,
    quantidade
) {

    if (!badge) return;


    quantidade =
        Number(quantidade) || 0;


    if (quantidade <= 0) {

        badge.style.display =
            "none";

        badge.textContent =
            "";

        return;

    }


    badge.textContent =
        quantidade > 99
            ? "99+"
            : quantidade;


    badge.style.display =
        "inline-flex";

}


// ==========================================
// INICIAR
// ==========================================

carregarSidebar();
