async function carregarSidebar(){

    const menu = document.querySelector(".menu-container");

    if(!menu) return;


    const resposta = await fetch(
        "componentes/sidebar.html"
    );


    const html = await resposta.text();


    menu.innerHTML = html;

}


carregarSidebar();
