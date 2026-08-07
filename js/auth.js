// ======================================
// SMARTINSPECT AI
// AUTH + PERMISSÕES
// ======================================


// ======================================
// PEGA USUÁRIO LOGADO
// ======================================

function getUsuario(){

    const usuario = localStorage.getItem("usuario");


    if(!usuario){

        return null;

    }


    try{

        return JSON.parse(usuario);

    }catch{

        return null;

    }

}





// ======================================
// VERIFICA LOGIN
// ======================================

function verificarLogin(){


    const usuario = getUsuario();


    if(!usuario){

        window.location.href="login.html";

        return false;

    }


    return true;


}





// ======================================
// SAIR
// ======================================

function sair(){


    localStorage.removeItem("usuario");


    window.location.href="login.html";


}





// ======================================
// CARGOS E PERMISSÕES
// ======================================


const permissoes = {



adm:[

"index",

"obras",

"imoveis",

"criar",

"inspecoes",

"estoque",

"ia",

"relatorios",

"equipe",

"solicitacoes",

"perfil"

],




engenheiro:[

"index",

"obras",

"imoveis",

"criar",

"inspecoes",

"ia",

"relatorios",

"perfil"

],




inspetor:[

"index",

"inspecoes",

"relatorios",

"perfil"

],




tecnico:[

"index",

"obras",

"inspecoes",

"perfil"

],




usuario:[

"index",

"perfil"

]


};






// ======================================
// VERIFICA PERMISSÃO
// ======================================

function temPermissao(pagina){


const usuario = getUsuario();



if(!usuario){

    return false;

}



const cargo = usuario.nivel_acesso;



if(!permissoes[cargo]){

    return false;

}



return permissoes[cargo].includes(pagina);



}






// ======================================
// ESCONDE MENU
// ======================================

function controlarMenu(){



const links = document.querySelectorAll(".sidebar a");



links.forEach(link=>{



const href = link.getAttribute("href");



if(!href){

return;

}



let pagina = href

.replace(".html","")

.replace("#","");





if(

pagina &&

!temPermissao(pagina)

){


link.style.display="none";


}



});



}







// ======================================
// BLOQUEIO DE PÁGINAS INTERNAS
// ======================================


function protegerPagina(pagina){



const usuario = getUsuario();



if(!usuario){


window.location.href="login.html";


return false;


}






// páginas internas dos módulos


const paginasEspeciais = {



"novo_imovel":"imoveis",


"nova_obra":"obras",


"nova_inspecao":"inspecoes",


"novo_estoque":"estoque",


"novo_relatorio":"relatorios"



};






if(paginasEspeciais[pagina]){


pagina = paginasEspeciais[pagina];


}








if(!temPermissao(pagina)){



alert("❌ Você não tem permissão para acessar esta área");



window.location.href="index.html";



return false;



}





return true;



}









// ======================================
// INICIALIZAÇÃO AUTOMÁTICA
// ======================================


document.addEventListener(

"DOMContentLoaded",

()=>{



controlarMenu();





const paginaAtual = window.location.pathname

.split("/")

.pop()

.replace(".html","");





if(

paginaAtual !== "" &&

paginaAtual !== "login" &&

paginaAtual !== "cadastro"

){



protegerPagina(paginaAtual);



}



}

);
