

// ============================================================
// SMARTINSPECT AI
// CONFIGURAÇÕES GLOBAIS
// ============================================================

(function () {

    "use strict";


    // ========================================================
    // CONFIGURAÇÕES PADRÃO
    // ========================================================

    const configuracoesPadrao = {

        idioma: "pt-BR",

        tamanhoFonte: "medio",

        altoContraste: false,

        fonteLegivel: false,

        espacamento: false,

        reduzirAnimacoes: false,

        modoEscuro: false,

        destaqueFoco: false,

        textoMaior: false,

        leitorTela: false

    };


    // ========================================================
    // PEGAR CONFIGURAÇÕES SALVAS
    // ========================================================

    function obterConfiguracoes() {

        try {

            const salvo =
                localStorage.getItem(
                    "smartinspect_configuracoes"
                );


            if (!salvo) {

                return {
                    ...configuracoesPadrao
                };

            }


            const configuracoes =
                JSON.parse(salvo);


            return {

                ...configuracoesPadrao,

                ...configuracoes

            };


        } catch (erro) {

            console.error(
                "Erro ao carregar configurações:",
                erro
            );


            return {
                ...configuracoesPadrao
            };

        }

    }


    // ========================================================
    // CONFIGURAÇÕES ATUAIS
    // ========================================================

    let configuracoes =
        obterConfiguracoes();


    // ========================================================
    // SALVAR
    // ========================================================

    function salvarConfiguracoesLocal() {

        try {

            localStorage.setItem(

                "smartinspect_configuracoes",

                JSON.stringify(
                    configuracoes
                )

            );

        } catch (erro) {

            console.error(
                "Erro ao salvar configurações:",
                erro
            );

        }

    }


    // ========================================================
    // APLICAR CONFIGURAÇÕES
    // ========================================================

    function aplicarConfiguracoes() {

        configuracoes =
            obterConfiguracoes();


        const html =
            document.documentElement;

        const body =
            document.body;


        if (!html || !body) {

            return;

        }


        // ====================================================
        // LIMPAR ESTADOS
        // ====================================================

        html.classList.remove(
            "smartinspect-contraste"
        );

        html.classList.remove(
            "smartinspect-fonte-legivel"
        );

        html.classList.remove(
            "smartinspect-espacamento"
        );

        html.classList.remove(
            "smartinspect-sem-animacao"
        );

        html.classList.remove(
            "smartinspect-modo-escuro"
        );

        html.classList.remove(
            "smartinspect-foco"
        );


        body.classList.remove(
            "smartinspect-texto-maior"
        );


        // ====================================================
        // TAMANHO DA FONTE
        // ====================================================

        html.classList.remove(
            "fonte-pequena",
            "fonte-media",
            "fonte-grande",
            "fonte-muito-grande"
        );


        switch (
            configuracoes.tamanhoFonte
        ) {

            case "pequeno":

                html.classList.add(
                    "fonte-pequena"
                );

                break;


            case "grande":

                html.classList.add(
                    "fonte-grande"
                );

                break;


            case "muito-grande":

                html.classList.add(
                    "fonte-muito-grande"
                );

                break;


            default:

                html.classList.add(
                    "fonte-media"
                );

                break;

        }


        // ====================================================
        // TEXTO MAIOR
        // ====================================================

        if (
            configuracoes.textoMaior
        ) {

            body.classList.add(
                "smartinspect-texto-maior"
            );

        }


        // ====================================================
        // ALTO CONTRASTE
        // ====================================================

        if (
            configuracoes.altoContraste
        ) {

            html.classList.add(
                "smartinspect-contraste"
            );

        }


        // ====================================================
        // FONTE LEGÍVEL
        // ====================================================

        if (
            configuracoes.fonteLegivel
        ) {

            html.classList.add(
                "smartinspect-fonte-legivel"
            );

        }


        // ====================================================
        // ESPAÇAMENTO
        // ====================================================

        if (
            configuracoes.espacamento
        ) {

            html.classList.add(
                "smartinspect-espacamento"
            );

        }


        // ====================================================
        // REDUZIR ANIMAÇÕES
        // ====================================================

        if (
            configuracoes.reduzirAnimacoes
        ) {

            html.classList.add(
                "smartinspect-sem-animacao"
            );

        }


        // ====================================================
        // MODO ESCURO
        // ====================================================

        if (
            configuracoes.modoEscuro
        ) {

            html.classList.add(
                "smartinspect-modo-escuro"
            );

        }


        // ====================================================
        // DESTAQUE DE FOCO
        // ====================================================

        if (
            configuracoes.destaqueFoco
        ) {

            html.classList.add(
                "smartinspect-foco"
            );

        }


        // ====================================================
        // IDIOMA
        // ====================================================

        html.setAttribute(
            "lang",
            configuracoes.idioma || "pt-BR"
        );

    }


    // ========================================================
    // ALTERAR UMA CONFIGURAÇÃO
    // ========================================================

    function alterarConfiguracao(
        nome,
        valor
    ) {

        configuracoes =
            obterConfiguracoes();


        configuracoes[nome] =
            valor;


        salvarConfiguracoesLocal();


        aplicarConfiguracoes();


        // Dispara evento para outras partes
        // do sistema perceberem a alteração

        window.dispatchEvent(
            new CustomEvent(
                "smartinspect-configuracao-alterada",
                {
                    detail: configuracoes
                }
            )
        );

    }


    // ========================================================
    // PEGAR UMA CONFIGURAÇÃO
    // ========================================================

    function obterConfiguracao(
        nome
    ) {

        const atual =
            obterConfiguracoes();


        return atual[nome];

    }


    // ========================================================
    // SALVAR CONFIGURAÇÕES
    // ========================================================

    window.salvarConfiguracoes =
        function () {

            const idioma =
                document.getElementById(
                    "idioma"
                );


            const tamanhoFonte =
                document.getElementById(
                    "tamanhoFonte"
                );


            const altoContraste =
                document.getElementById(
                    "altoContraste"
                );


            const fonteLegivel =
                document.getElementById(
                    "fonteLegivel"
                );


            const espacamento =
                document.getElementById(
                    "espacamento"
                );


            const reduzirAnimacoes =
                document.getElementById(
                    "reduzirAnimacoes"
                );


            const modoEscuro =
                document.getElementById(
                    "modoEscuro"
                );


            const destaqueFoco =
                document.getElementById(
                    "destaqueFoco"
                );


            const textoMaior =
                document.getElementById(
                    "textoMaior"
                );


            if (idioma) {

                configuracoes.idioma =
                    idioma.value;

            }


            if (tamanhoFonte) {

                configuracoes.tamanhoFonte =
                    tamanhoFonte.value;

            }


            if (altoContraste) {

                configuracoes.altoContraste =
                    altoContraste.checked;

            }


            if (fonteLegivel) {

                configuracoes.fonteLegivel =
                    fonteLegivel.checked;

            }


            if (espacamento) {

                configuracoes.espacamento =
                    espacamento.checked;

            }


            if (reduzirAnimacoes) {

                configuracoes.reduzirAnimacoes =
                    reduzirAnimacoes.checked;

            }


            if (modoEscuro) {

                configuracoes.modoEscuro =
                    modoEscuro.checked;

            }


            if (destaqueFoco) {

                configuracoes.destaqueFoco =
                    destaqueFoco.checked;

            }


            if (textoMaior) {

                configuracoes.textoMaior =
                    textoMaior.checked;

            }


            salvarConfiguracoesLocal();


            aplicarConfiguracoes();


            alert(
                "✅ Configurações salvas com sucesso!"
            );


        };


    // ========================================================
    // RESETAR
    // ========================================================

    window.restaurarConfiguracoes =
        function () {


            const confirmar =
                confirm(
                    "Deseja restaurar todas as configurações padrão?"
                );


            if (!confirmar) {

                return;

            }


            configuracoes = {

                ...configuracoesPadrao

            };


            salvarConfiguracoesLocal();


            aplicarConfiguracoes();


            // Atualizar controles da página

            atualizarControles();


            alert(
                "✅ Configurações restauradas!"
            );

        };


    // ========================================================
    // ATUALIZAR CONTROLES
    // ========================================================

    function atualizarControles() {


        const idioma =
            document.getElementById(
                "idioma"
            );


        const tamanhoFonte =
            document.getElementById(
                "tamanhoFonte"
            );


        if (idioma) {

            idioma.value =
                configuracoes.idioma;

        }


        if (tamanhoFonte) {

            tamanhoFonte.value =
                configuracoes.tamanhoFonte;

        }


        const controles = {

            altoContraste:
                configuracoes.altoContraste,

            fonteLegivel:
                configuracoes.fonteLegivel,

            espacamento:
                configuracoes.espacamento,

            reduzirAnimacoes:
                configuracoes.reduzirAnimacoes,

            modoEscuro:
                configuracoes.modoEscuro,

            destaqueFoco:
                configuracoes.destaqueFoco,

            textoMaior:
                configuracoes.textoMaior

        };


        Object.keys(controles)
            .forEach(
                nome => {

                    const elemento =
                        document.getElementById(
                            nome
                        );


                    if (elemento) {

                        elemento.checked =
                            controles[nome];

                    }

                }
            );

    }


    // ========================================================
    // MUDANÇA DE PÁGINA
    // ========================================================

    window.addEventListener(
        "pageshow",
        function () {

            aplicarConfiguracoes();

        }
    );


    // ========================================================
    // OUTRA ABA ALTEROU CONFIGURAÇÕES
    // ========================================================

    window.addEventListener(
        "storage",
        function (evento) {

            if (
                evento.key ===
                "smartinspect_configuracoes"
            ) {

                aplicarConfiguracoes();

            }

        }
    );


    // ========================================================
    // INICIALIZAR
    // ========================================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                aplicarConfiguracoes();

                atualizarControles();

            }
        );

    } else {

        aplicarConfiguracoes();

        atualizarControles();

    }


    // ========================================================
    // DISPONIBILIZAR FUNÇÕES
    // ========================================================

    window.SmartInspectConfiguracoes = {

        obter:
            obterConfiguracoes,

        obterConfiguracao:
            obterConfiguracao,

        alterar:
            alterarConfiguracao,

        aplicar:
            aplicarConfiguracoes,

        restaurar:
            restaurarConfiguracoes

    };


})();
```
