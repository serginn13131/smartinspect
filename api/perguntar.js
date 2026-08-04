export default async function handler(req, res) {

try {

const { pergunta } = req.body;


const resposta = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body: JSON.stringify({

contents:[

{

parts:[

{

text:
`Você é o SmartInspect AI, especialista em engenharia civil, inspeção de obras e construção.

Pergunta:
${pergunta}`

}

]

}

]

})

}

);



const dados = await resposta.json();



if(dados.error){

throw new Error(dados.error.message);

}



res.status(200).json({

resposta:

dados.candidates[0].content.parts[0].text

});



}catch(error){


console.log(error);


res.status(500).json({

resposta:"Erro na IA: " + error.message

});


}


}
