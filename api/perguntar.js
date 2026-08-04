import OpenAI from "openai";


export default async function handler(req,res){


try{


const openai = new OpenAI({

apiKey: process.env.OPENAI_API_KEY

});



const {pergunta} = req.body;



const resposta = await openai.chat.completions.create({

model:"gpt-4.1-mini",

messages:[

{

role:"system",

content:
"Você é o SmartInspect AI, especialista em engenharia civil, inspeção de obras e construção. Responda de forma técnica e objetiva."

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

resposta:"Erro na IA: " + error.message

});



}


}
