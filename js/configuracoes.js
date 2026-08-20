
// ==========================================
// SMARTINSPECT AI
// CONFIGURAÇÕES DO USUÁRIO
// ==========================================

(function () {

    "use strict";


    // ==========================================
    // CONFIGURAÇÕES PADRÃO
    // ==========================================

    const configuracoesPadrao = {

        idioma: "pt-BR",

        tamanhoFonte: "normal",

        altoContraste: false,

        reduzirAnimacoes: false,

        leituraFacilitada: false,

        modoSurdo: false

    };


    // ==========================================
    // PEGAR CONFIGURAÇÕES
    // ==========================================

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


    // ==========================================
    // SALVAR CONFIGURAÇÕES
    // ==========================================

    window.salvarConfiguracoes = function () {

        try {

            const configuracoes = {

                idioma:
                    document.getElementById(
                        "idioma"
                    )?.value || "pt-BR",


                tamanhoFonte:
                    document.getElementById(
                        "tamanhoFonte"
                    )?.value || "normal",


                altoContraste:
                    document.getElementById(
                        "altoContraste"
                    )?.checked || false,


                reduzirAnimacoes:
                    document.getElementById(
                        "reduzirAnimacoes"
                    )?.checked || false,


                leituraFacilitada:
                    document.getElementById(
                        "leituraFacilitada"
                    )?.checked || false,


                modoSurdo:
                    document.getElementById(
                        "modoSurdo"
                    )?.checked || false

            };


            localStorage.setItem(

                "smartinspect_configuracoes",

                JSON.stringify(
                    configuracoes
                )

            );


            aplicarConfiguracoes(
                configuracoes
            );


            mostrarMensagem(
                "✅ Configurações salvas com sucesso!"
            );


        } catch (erro) {

            console.error(
                "Erro ao salvar configurações:",
                erro
            );


            alert(
                "❌ Não foi possível salvar as configurações."
            );

        }

    };


    // ==========================================
    // APLICAR CONFIGURAÇÕES
    // ==========================================

    function aplicarConfiguracoes(
        configuracoes
    ) {

        if (!configuracoes) {
            return;
        }


        // ======================================
        // TAMANHO DA FONTE
        // ======================================

        document.documentElement.classList.remove(

            "fonte-pequena",
            "fonte-normal",
            "fonte-grande",
            "fonte-muito-grande"

        );


        document.documentElement.classList.add(

            "fonte-" +
            configuracoes.tamanhoFonte

        );


        // ======================================
        // ALTO CONTRASTE
        // ======================================

        document.documentElement.classList.toggle(

            "alto-contraste",

            configuracoes.altoContraste === true

        );


        // ======================================
        // REDUZIR ANIMAÇÕES
        // ======================================

        document.documentElement.classList.toggle(

            "sem-animacoes",

            configuracoes.reduzirAnimacoes === true

        );


        // ======================================
        // LEITURA FACILITADA
        // ======================================

        document.documentElement.classList.toggle(

            "leitura-facilitada",

            configuracoes.leituraFacilitada === true

        );


        // ======================================
        // MODO PARA DEFICIÊNCIA AUDITIVA
        // ======================================

        document.documentElement.classList.toggle(

            "modo-surdo",

            configuracoes.modoSurdo === true

        );

    }


    // ==========================================
    // PREENCHER FORMULÁRIO
    // ==========================================

    function carregarFormulario() {

        const configuracoes =
            obterConfiguracoes();


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


        const reduzirAnimacoes =
            document.getElementById(
                "reduzirAnimacoes"
            );


        const leituraFacilitada =
            document.getElementById(
                "leituraFacilitada"
            );


        const modoSurdo =
            document.getElementById(
                "modoSurdo"
            );


        if (idioma) {

            idioma.value =
                configuracoes.idioma;

        }


        if (tamanhoFonte) {

            tamanhoFonte.value =
                configuracoes.tamanhoFonte;

        }


        if (altoContraste) {

            altoContraste.checked =
                configuracoes.altoContraste;

        }


        if (reduzirAnimacoes) {

            reduzirAnimacoes.checked =
                configuracoes.reduzirAnimacoes;

        }


        if (leituraFacilitada) {

            leituraFacilitada.checked =
                configuracoes.leituraFacilitada;

        }


        if (modoSurdo) {

            modoSurdo.checked =
                configuracoes.modoSurdo;

        }


        aplicarConfiguracoes(
            configuracoes
        );

    }


    // ==========================================
    // MENSAGEM
    // ==========================================

    function mostrarMensagem(
        texto
    ) {

        const mensagem =
            document.getElementById(
                "mensagemConfiguracoes"
            );


        if (!mensagem) {

            return;

        }


        mensagem.textContent =
            texto;


        mensagem.style.display =
            "block";


        setTimeout(function () {

            mensagem.style.display =
                "none";

        }, 3000);

    }


    // ==========================================
    // RESTAURAR PADRÃO
    // ==========================================

    window.restaurarConfiguracoes =
        function () {

            localStorage.removeItem(
                "smartinspect_configuracoes"
            );


            carregarFormulario();


            mostrarMensagem(
                "↩️ Configurações restauradas."
            );

        };


    // ==========================================
    // INICIAR
    // ==========================================

    function iniciar() {

        carregarFormulario();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciar
        );

    } else {

        iniciar();

    }

})();
```
