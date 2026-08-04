// ======================================
// SMARTINSPECT AI - AUTH + PERMISSÕES
// ======================================


// PEGA USUÁRIO LOGADO

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





// VERIFICA LOGIN

function verificarLogin(){


    const usuario = getUsuario();


    if(!usuario){


        window.location.href="login.html";

        return false;


    }


    return true;


}






// SAIR

function sair(){


    localStorage.removeItem("usuario");


    window.location.href="login.html";


}









// ======================================
// CARGOS E PERMISSÕES
// ======================================


const permissoes = {



admin:[

"index",
"obras",
"imoveis",
"criar",
"inspecoes",
"estoque",
"ia",
"relatorios",
"equipe",
"solicitacoes"

],




empresa:[

"index",
"obras",
"imoveis",
"criar",
"inspecoes",
"estoque",
"relatorios",
"equipe"

],




engenheiro:[

"index",
"obras",
"imoveis",
"criar",
"inspecoes",
"ia",
"relatorios"

],




inspetor:[

"index",
"obras",
"inspecoes",
"ia"

],




campo:[

"index",
"inspecoes"

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



const pagina = href

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
// BLOQUEIA ACESSO DIRETO PELA URL
// ======================================


function protegerPagina(pagina){



const usuario = getUsuario();



if(!usuario){


window.location.href="login.html";


return false;


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
