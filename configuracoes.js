(() => {
  "use strict";

  const CHAVE = "smartinspect_configuracoes";
  const PADRAO = {
    idioma: "pt-BR",
    modoEscuro: false,
    altoContraste: false,
    sublinharLinks: false,
    alertasVisuais: true,
    notificacoesTexto: true,
    fonte: "media"
  };

  let fonteSelecionada = PADRAO.fonte;

  function lerConfiguracoes() {
    try {
      const salvo = localStorage.getItem(CHAVE);
      return salvo ? { ...PADRAO, ...JSON.parse(salvo) } : { ...PADRAO };
    } catch (erro) {
      console.error("Erro ao carregar configurações:", erro);
      return { ...PADRAO };
    }
  }

  function salvarConfiguracoesNoStorage(configuracoes) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(configuracoes));
    } catch (erro) {
      console.error("Erro ao salvar configurações:", erro);
    }
  }

  function selecionarFonte(tamanho) {
    fonteSelecionada = ["pequena", "media", "grande", "muito-grande"].includes(tamanho)
      ? tamanho
      : PADRAO.fonte;

    document.querySelectorAll(".btn-tamanho").forEach((botao) => botao.classList.remove("ativo"));
    const id = `fonte${fonteSelecionada.charAt(0).toUpperCase()}${fonteSelecionada.slice(1).replace("-", "")}`;
    document.getElementById(id)?.classList.add("ativo");
  }

  function aplicarConfiguracoes(config) {
    const corpo = document.body;
    corpo.classList.remove("fonte-pequena", "fonte-media", "fonte-grande", "fonte-muito-grande");
    corpo.classList.add(`fonte-${fonteSelecionada}`);
    corpo.classList.toggle("modo-escuro", config.modoEscuro === true);
    corpo.classList.toggle("alto-contraste", config.altoContraste === true);
    corpo.classList.toggle("sublinhar-links", config.sublinharLinks === true);
    document.documentElement.lang = config.idioma || PADRAO.idioma;
  }

  function preencherCampos(config) {
    const definirValor = (id, valor) => {
      const campo = document.getElementById(id);
      if (campo) campo.value = valor;
    };
    const definirMarcacao = (id, valor) => {
      const campo = document.getElementById(id);
      if (campo) campo.checked = valor === true;
    };

    definirValor("idioma", config.idioma);
    definirMarcacao("modoEscuro", config.modoEscuro);
    definirMarcacao("altoContraste", config.altoContraste);
    definirMarcacao("sublinharLinks", config.sublinharLinks);
    definirMarcacao("alertasVisuais", config.alertasVisuais !== false);
    definirMarcacao("notificacoesTexto", config.notificacoesTexto !== false);
    selecionarFonte(config.fonte);
    aplicarConfiguracoes(config);
  }

  window.selecionarFonte = selecionarFonte;

  window.salvarConfiguracoes = () => {
    const config = {
      idioma: document.getElementById("idioma")?.value || PADRAO.idioma,
      modoEscuro: document.getElementById("modoEscuro")?.checked === true,
      altoContraste: document.getElementById("altoContraste")?.checked === true,
      sublinharLinks: document.getElementById("sublinharLinks")?.checked === true,
      alertasVisuais: document.getElementById("alertasVisuais")?.checked !== false,
      notificacoesTexto: document.getElementById("notificacoesTexto")?.checked !== false,
      fonte: fonteSelecionada
    };

    salvarConfiguracoesNoStorage(config);
    aplicarConfiguracoes(config);
    const mensagem = document.getElementById("mensagemConfiguracao");
    if (mensagem) {
      mensagem.style.display = "block";
      window.setTimeout(() => { mensagem.style.display = "none"; }, 3000);
    }
  };

  window.restaurarConfiguracoes = () => {
    if (!window.confirm("Deseja restaurar as configurações padrão?")) return;
    salvarConfiguracoesNoStorage({ ...PADRAO });
    preencherCampos(PADRAO);
    window.alert("Configurações restauradas.");
  };

  window.SmartInspectConfiguracoes = {
    carregar: lerConfiguracoes,
    salvar: salvarConfiguracoesNoStorage,
    aplicar: () => aplicarConfiguracoes(lerConfiguracoes()),
    restaurar: window.restaurarConfiguracoes
  };

  function iniciar() {
    preencherCampos(lerConfiguracoes());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();
