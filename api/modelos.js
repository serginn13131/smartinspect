export default async function handler(req,res){

const resposta = await fetch(
"https://api.groq.com/openai/v1/models",
{
headers:{
"Authorization":
"Bearer " + process.env.GROQ_API_KEY
}
}
);


const dados = await resposta.json();


res.status(200).json(dados);

}
