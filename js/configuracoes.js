```javascript
// ======================================================
// SMARTINSPECT AI
// CONFIGURAÇÕES GLOBAIS DE ACESSIBILIDADE
// ======================================================

(function () {

    "use strict";

    const CHAVE = "smartinspect_configuracoes";

    const PADRAO = {
        fonte: "100",
        tema: "claro",
        contraste: false,
        espaco: false,
        fonteLegivel: false,
        animacoes: true,
        foco: true,
        acessibilidadeAuditiva: false
    };


    // ==================================================
    // LER CONFIGURAÇÕES
    // ==================================================

    function obterConfiguracoes() {

        try {

            const salvo =
                localStorage.getItem(CHAVE);

            if (!salvo) {
                return { ...PADRAO };
            }

            return {
                ...PADRAO,
                ...JSON.parse(salvo)
            };

        } catch (erro) {

            console.error(
                "Erro ao carregar configurações:",
                erro
            );

            return { ...PADRAO };

        }

    }


    // ==================================================
    // SALVAR CONFIGURAÇÕES
    // ==================================================

    function salvarConfiguracoesGlobais(config) {

        try {

            localStorage.setItem(
                CHAVE,
                JSON.stringify(config)
            );

        } catch (erro) {

            console.error(
                "Erro ao salvar configurações:",
                erro
            );

        }

    }


    // ==================================================
    // CRIAR ESTILO GLOBAL
    // ==================================================

    function criarEstiloGlobal() {

        if (
            document.getElementById(
                "smartinspect-acessibilidade"
            )
        ) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "smartinspect-acessibilidade";


        style.innerHTML = `

            /* =========================================
               TAMANHO DA FONTE
            ========================================= */

            html {
                font-size: var(--smartinspect-font-size, 100%);
            }


            /* =========================================
               FONTE MAIS LEGÍVEL
            ========================================= */

            body.smart-fonte-legivel,
            body.smart-fonte-legivel * {

                font-family:
                    Arial,
                    Verdana,
                    sans-serif !important;

            }


            /* =========================================
               MODO ESCURO
            ========================================= */

            body.smart-tema-escuro {

                background:#121212 !important;
                color:#f1f1f1 !important;

            }


            body.smart-tema-escuro .card,
            body.smart-tema-escuro .usuario-card,
            body.smart-tema-escuro .resumo-card,
            body.smart-tema-escuro .chamado,
            body.smart-tema-escuro .config-card,
            body.smart-tema-escuro .content,
            body.smart-tema-escuro .main {

                background:#1e1e1e !important;
                color:#f1f1f1 !important;

            }


            body.smart-tema-escuro input,
            body.smart-tema-escuro textarea,
            body.smart-tema-escuro select {

                background:#292929 !important;
                color:#fff !important;
                border-color:#555 !important;

            }


            body.smart-tema-escuro p,
            body.smart-tema-escuro span,
            body.smart-tema-escuro label {

                color:#ddd;

            }


            /* =========================================
               ALTO CONTRASTE
            ========================================= */

            body.smart-alto-contraste {

                background:#000 !important;
                color:#fff !important;

            }


            body.smart-alto-contraste * {

                border-color:#fff !important;

            }


            body.smart-alto-contraste a {

                color:#ffff00 !important;

            }


            body.smart-alto-contraste button {

                background:#ffff00 !important;
                color:#000 !important;

            }


            /* =========================================
               ESPAÇAMENTO
            ========================================= */

            body.smart-espacamento * {

                letter-spacing:.04em;

                line-height:1.7;

            }


            /* =========================================
               DESATIVAR ANIMAÇÕES
            ========================================= */

            body.smart-sem-animacoes *,
            body.smart-sem-animacoes *::before,
            body.smart-sem-animacoes *::after {

                animation:none !important;
                transition:none !important;
                scroll-behavior:auto !important;

            }


            /* =========================================
               FOCO PARA ACESSIBILIDADE
            ========================================= */

            body.smart-foco-acessivel
            button:focus,
            body.smart-foco-acessivel
            a:focus,
            body.smart-foco-acessivel
            input:focus,
            body.smart-foco-acessivel
            select:focus,
            body.smart-foco-acessivel
            textarea:focus {

                outline:
                    3px solid #ffcc00 !important;

                outline-offset:3px !important;

            }


            /* =========================================
               AVISOS VISUAIS PARA ACESSIBILIDADE AUDITIVA
            ========================================= */

            #smartinspect-alerta-visual {

                position:fixed;

                top:20px;

                right:20px;

                z-index:999999;

                background:#0066cc;

                color:#fff;

                padding:14px 18px;

                border-radius:10px;

                box-shadow:
                    0 5px 20px rgba(0,0,0,.25);

                display:none;

                max-width:350px;

                font-weight:bold;

            }

        `;


        document.head.appendChild(style);

    }


    // ==================================================
    // APLICAR CONFIGURAÇÕES
    // ==================================================

    function aplicarConfiguracoes() {

        const config =
            obterConfiguracoes();


        criarEstiloGlobal();


        const body =
            document.body;


        if (!body) {
            return;
        }


        // ==========================================
        // TAMANHO
        // ==========================================

        let tamanho =
            Number(config.fonte);


        if (!tamanho || tamanho < 75) {
            tamanho = 75;
        }


        if (tamanho > 150) {
            tamanho = 150;
        }


        document.documentElement.style
            .setProperty(
                "--smartinspect-font-size",
                tamanho + "%"
            );


        // ==========================================
        // TEMA
        // ==========================================

        body.classList.toggle(
            "smart-tema-escuro",
            config.tema === "escuro"
        );


        // ==========================================
        // CONTRASTE
        // ==========================================

        body.classList.toggle(
            "smart-alto-contraste",
            config.contraste === true
        );


        // ==========================================
        // ESPAÇAMENTO
        // ==========================================

        body.classList.toggle(
            "smart-espacamento",
            config.espaco === true
        );


        // ==========================================
        // FONTE LEGÍVEL
        // ==========================================

        body.classList.toggle(
            "smart-fonte-legivel",
            config.fonteLegivel === true
        );


        // ==========================================
        // ANIMAÇÕES
        // ==========================================

        body.classList.toggle(
            "smart-sem-animacoes",
            config.animacoes === false
        );


        // ==========================================
        // FOCO
        // ==========================================

        body.classList.toggle(
            "smart-foco-acessivel",
            config.foco !== false
        );

    }


    // ==================================================
    // FUNÇÃO PÚBLICA
    // ==================================================

    window.SmartInspectConfiguracoes = {

        obter: obterConfiguracoes,

        salvar: function (novasConfiguracoes) {

            const atual =
                obterConfiguracoes();


            const novas = {

                ...atual,

                ...novasConfiguracoes

            };


            salvarConfiguracoesGlobais(
                novas
            );


            aplicarConfiguracoes();

        },

        aplicar:
            aplicarConfiguracoes,

        restaurar: function () {

            salvarConfiguracoesGlobais(
                { ...PADRAO }
            );

            aplicarConfiguracoes();

        }

    };


    // ==================================================
    // APLICAR AUTOMATICAMENTE
    // ==================================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            aplicarConfiguracoes
        );

    } else {

        aplicarConfiguracoes();

    }


})();
```
