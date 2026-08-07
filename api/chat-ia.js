export default async function handler(req,res){


try{


const {mensagem}=req.body;



const resposta = await fetch(

"https://api.groq.com/openai/v1/chat/completions",

{

method:"POST",

headers:{


"Authorization":
"Bearer "+process.env.GROQ_API_KEY,


"Content-Type":"application/json"

},


body:JSON.stringify({

model:
"llama-3.3-70b-versatile",


messages:[


{

role:"system",

content:

`
Você é o SmartInspect AI.

Você é especialista em construção civil.

Responda dúvidas sobre:
- inspeções
- patologias
- concreto
- estruturas
- normas técnicas
- manutenção

Seja técnico e objetivo.
`

},


{

role:"user",

content:mensagem

}


]

})


}

);



const dados =
await resposta.json();



res.status(200).json({

resposta:
dados.choices[0].message.content

});



}

catch(e){


res.status(500).json({

erro:e.message

});


}


}
