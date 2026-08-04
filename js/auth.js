function getUsuario(){

    const usuario = localStorage.getItem("usuario");

    if(!usuario){
        return null;
    }

    return JSON.parse(usuario);

}




function verificarLogin(){

    const usuario = getUsuario();

    if(!usuario){

        window.location.href="login.html";
        return false;

    }

    return true;

}





function sair(){

    localStorage.removeItem("usuario");

    window.location.href="login.html";

}





const permissoes = {


admin:[
"index",
"obras",
"imoveis",
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
"inspecoes",
"estoque",
"relatorios",
"equipe"
],


engenheiro:[
"index",
"obras",
"imoveis",
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





function temPermissao(pagina){


const usuario = getUsuario();


if(!usuario){

return false;

}


const cargo = usuario.nivel_acesso;


if(!permissoes[cargo]){

return true;

}


return permissoes[cargo].includes(pagina);


}






function controlarMenu(){

const usuario = getUsuario();


if(!usuario){

return;

}



const links = document.querySelectorAll(".sidebar a");



links.forEach(link=>{


const href = link.getAttribute("href");



if(!href){

return;

}



const pagina = href.replace(".html","");



if(
pagina !== "#" &&
!temPermissao(pagina)

){

link.style.display="none";

}


});


}



document.addEventListener(

"DOMContentLoaded",

()=>{

controlarMenu();

}

);
