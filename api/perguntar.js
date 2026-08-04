import OpenAI from "openai";


export default async function handler(req, res) {

try {


const apiKey = process.env.OPENAI_API_KEY;


if(!apiKey){

return res.status(500).json({

erro:"OPENAI_API_KEY não encontrada na Vercel"

});

}



const openai = new OpenAI({

apiKey: apiKey

});



const resposta = await openai.chat.completions.create({

model:"gpt-4.1-mini",

messages:[

{

role:"user",

content:req.body.pergunta

}

]

});



return res.status(200).json({

resposta: resposta.choices[0].message.content

});



}catch(error){


console.log(error);


return res.status(500).json({

erro:error.message

});


}


}
