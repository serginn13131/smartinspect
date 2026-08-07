let permissoesUsuario = null;


async function carregarPermissoes(){


const {data:user}=await banco.auth.getUser();


if(!user.user) return;



const {data:usuario}=await banco

.from("usuarios")

.select("nivel_acesso")

.eq("auth_id",user.user.id)

.single();



if(!usuario) return;




const {data:permissao}=await banco

.from("permissoes")

.select("*")

.eq("cargo",usuario.nivel_acesso)

.single();



permissoesUsuario = permissao;



aplicarPermissoes();


}





function aplicarPermissoes(){


if(!permissoesUsuario) return;



if(!permissoesUsuario.gerenciar_usuarios){


document.querySelectorAll(".admin-only")

.forEach(item=>{

item.style.display="none";

});


}



}



carregarPermissoes();
