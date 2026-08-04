
async function verificarLogin(){


const {data}=await banco.auth.getSession();



if(!data.session){


window.location.href="login.html";


return;


}



const usuario = JSON.parse(

localStorage.getItem("usuario")

);



if(!usuario){


window.location.href="login.html";


return;


}



}




async function sair(){


await banco.auth.signOut();


localStorage.removeItem("usuario");


window.location.href="login.html";


}
