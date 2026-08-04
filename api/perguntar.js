import OpenAI from "openai";


const openai = new OpenAI({

apiKey: process.env.OPENAI_API_KEY

});



export default async function handler(req,res){


if(req.method !== "POST"){

return res.status(405).json({

erro:"Método não permitido"

});

}



try{


const {pergunta}=req.body;



const resposta = await openai.chat.completions.create({

model:"gpt-4.1-mini",

messages:[

{

role:"system",

content:
"Você é o SmartInspect AI, especialista em engenharia civil, inspeção de obras e construção."

},

{

role:"user",

content:pergunta

}

]

});



res.status(200).json({

resposta:
resposta.choices[0].message.content

});



}catch(error){


console.log(error);


res.status(500).json({

erro:"Erro ao consultar IA"

});


}


}
