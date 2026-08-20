
(function () {

    "use strict";

    const CHAVE =
        "smartinspect_configuracoes";


    const PADRAO = {

        idioma: "pt-BR",

        tamanhoFonte: "medio",

        altoContraste: false,

        fonteLegivel: false,

        espacamento: false,

        reduzirAnimacoes: false,

        modoEscuro: false,

        destaqueFoco: false,

        textoMaior: false

    };


    // ==================================================
    // CARREGAR
    // ==================================================

    function carregar() {

        try {

            const salvo =
                localStorage.getItem(CHAVE);


            if (!salvo) {

                return {
                    ...PADRAO
                };

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


            return {
                ...PADRAO
            };

        }

    }


    // ==================================================
    // SALVAR
    // ==================================================

    function salvar(config) {

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
    // APLICAR
    // ==================================================

    function aplicar() {

        const config = carregar();

        const html =
            document.documentElement;


        // Remove classes antigas

        html.classList.remove(
            "fonte-pequena",
            "fonte-media",
            "fonte-grande",
            "fonte-muito-grande",
            "smart-contraste",
            "smart-fonte-legivel",
            "smart-espacamento",
            "smart-sem-animacao",
            "smart-modo-escuro",
            "smart-foco",
            "smart-texto-maior"
        );


        // ==================================================
        // TAMANHO
        // ==================================================

        if (
            config.tamanhoFonte ===
            "pequeno"
        ) {

            html.classList.add(
                "fonte-pequena"
            );

        }

        else if (
            config.tamanhoFonte ===
            "grande"
        ) {

            html.classList.add(
                "fonte-grande"
            );

        }

        else if (
            config.tamanhoFonte ===
            "muito-grande"
        ) {

            html.classList.add(
                "fonte-muito-grande"
            );

        }

        else {

            html.classList.add(
                "fonte-media"
            );

        }


        // ==================================================
        // ACESSIBILIDADE
        // ==================================================

        if (
            config.altoContraste
        ) {

            html.classList.add(
                "smart-contraste"
            );

        }


        if (
            config.fonteLegivel
        ) {

            html.classList.add(
                "smart-fonte-legivel"
            );

        }


        if (
            config.espacamento
        ) {

            html.classList.add(
                "smart-espacamento"
            );

        }


        if (
            config.reduzirAnimacoes
        ) {

            html.classList.add(
                "smart-sem-animacao"
            );

        }


        if (
            config.modoEscuro
        ) {

            html.classList.add(
                "smart-modo-escuro"
            );

        }


        if (
            config.destaqueFoco
        ) {

            html.classList.add(
                "smart-foco"
            );

        }


        if (
            config.textoMaior
        ) {

            html.classList.add(
                "smart-texto-maior"
            );

        }


        // ==================================================
        // IDIOMA
        // ==================================================

        html.setAttribute(
            "lang",
            config.idioma || "pt-BR"
        );

    }


    // ==================================================
    // SALVAR CONFIGURAÇÕES DA TELA
    // ==================================================

    window.salvarConfiguracoes =
        function () {

            const config = carregar();


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

                config.idioma =
                    idioma.value;

            }


            if (tamanhoFonte) {

                config.tamanhoFonte =
                    tamanhoFonte.value;

            }


            if (altoContraste) {

                config.altoContraste =
                    altoContraste.checked;

            }


            if (fonteLegivel) {

                config.fonteLegivel =
                    fonteLegivel.checked;

            }


            if (espacamento) {

                config.espacamento =
                    espacamento.checked;

            }


            if (reduzirAnimacoes) {

                config.reduzirAnimacoes =
                    reduzirAnimacoes.checked;

            }


            if (modoEscuro) {

                config.modoEscuro =
                    modoEscuro.checked;

            }


            if (destaqueFoco) {

                config.destaqueFoco =
                    destaqueFoco.checked;

            }


            if (textoMaior) {

                config.textoMaior =
                    textoMaior.checked;

            }


            salvar(config);

            aplicar();


            alert(
                "✅ Configurações salvas!"
            );

        };


    // ==================================================
    // RESTAURAR
    // ==================================================

    window.restaurarConfiguracoes =
        function () {

            const confirmar =
                confirm(
                    "Deseja restaurar as configurações padrão?"
                );


            if (!confirmar) {

                return;

            }


            salvar({
                ...PADRAO
            });


            aplicar();


            atualizarCampos();


            alert(
                "✅ Configurações restauradas!"
            );

        };


    // ==================================================
    // ATUALIZAR CAMPOS
    // ==================================================

    function atualizarCampos() {

        const config =
            carregar();


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
                config.idioma;

        }


        if (tamanhoFonte) {

            tamanhoFonte.value =
                config.tamanhoFonte;

        }


        const campos = [

            "altoContraste",

            "fonteLegivel",

            "espacamento",

            "reduzirAnimacoes",

            "modoEscuro",

            "destaqueFoco",

            "textoMaior"

        ];


        campos.forEach(
            function (nome) {

                const campo =
                    document.getElementById(
                        nome
                    );


                if (campo) {

                    campo.checked =
                        Boolean(
                            config[nome]
                        );

                }

            }
        );

    }


    // ==================================================
    // API GLOBAL
    // ==================================================

    window.SmartInspectConfiguracoes = {

        carregar: carregar,

        salvar: salvar,

        aplicar: aplicar,

        restaurar:
            restaurarConfiguracoes

    };


    // ==================================================
    // INICIALIZAÇÃO
    // ==================================================

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                aplicar();

                atualizarCampos();

            }
        );

    }

    else {

        aplicar();

        atualizarCampos();

    }


})();
```
