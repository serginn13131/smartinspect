import OpenAI from "openai";


export default async function handler(req, res) {


try {


const client = new OpenAI({

apiKey: process.env.OPENAI_API_KEY

});



const resposta = await client.chat.completions.create({

model: "gpt-4.1-mini",

messages:[

{

role:"user",

content:req.body.pergunta

}

]

});



res.status(200).json({

resposta: resposta.choices[0].message.content

});



} catch(error) {


console.log(error);


res.status(500).json({

erro: error.message

});


}


}
