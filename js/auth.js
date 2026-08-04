```javascript
// ======================================
// SMARTINSPECT AI - SISTEMA DE PERMISSÕES
// ======================================



// Recupera usuário logado

function getUsuario(){

    const usuario = localStorage.getItem("usuario");

    if(!usuario){
        return null;
    }

    return JSON.parse(usuario);

}





// Verifica se está logado

function verificarLogin(){


    const usuario = getUsuario();


    if(!usuario){

        window.location.href="login.html";

        return false;

    }


    return true;

}





// Logout

async function sair(){


    localStorage.removeItem("usuario");

    window.location.href="login.html";


}









// ======================================
// PERMISSÕES POR CARGO
// ======================================


const permissoes = {


admin:[

"dashboard",
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

"dashboard",
"obras",
"imoveis",
"inspecoes",
"estoque",
"relatorios",
"equipe"

],



engenheiro:[

"dashboard",
"obras",
"imoveis",
"inspecoes",
"ia",
"relatorios"

],



inspetor:[

"dashboard",
"obras",
"inspecoes",
"ia"

],



campo:[

"dashboard",
"inspecoes"

]


};









// Verifica permissão

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
// ESCONDER MENU AUTOMATICAMENTE
// ======================================


function controlarMenu(){


const links = document.querySelectorAll(".sidebar a");



links.forEach(link=>{


const pagina = link

.getAttribute("href")

.replace(".html","")

.replace("#","");





if(

pagina &&

pagina !== "login" &&

!temPermissao(pagina)

){


link.style.display="none";


}



});



}








// Executa quando página carregar


document.addEventListener(

"DOMContentLoaded",

()=>{


    controlarMenu();


}

);
```
