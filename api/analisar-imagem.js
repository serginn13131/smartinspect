export default async function handler(req, res) {

try {

const chunks = [];

for await (const chunk of req) {
    chunks.push(chunk);
}

const buffer = Buffer.concat(chunks);


const contentType = req.headers["content-type"];


const base64 = buffer.toString("base64");



const resposta = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{

method:"POST",

headers:{

"Authorization":
"Bearer " + process.env.GROQ_API_KEY,

"Content-Type":"application/json"

},


body:JSON.stringify({

model:"meta-llama/llama-4-maverick-17b-128e-instruct",


messages:[

{

role:"system",

content:

"Você é o SmartInspect AI, especialista em inspeção de obras. Analise imagens de construção civil. Identifique possíveis fissuras, trincas, infiltrações, umidade, corrosão e problemas de acabamento. Responda com diagnóstico técnico, nível de atenção e recomendações."

},


{

role:"user",

content:[

{

type:"text",

text:"Analise esta imagem de uma obra."

},


{

type:"image_url",

image_url:{

url:`data:${contentType};base64,${base64}`

}

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

dados.choices[0].message.content

});


}

catch(error){


console.log(error);


res.status(500).json({

resposta:"Erro na análise: " + error.message

});


}


}
