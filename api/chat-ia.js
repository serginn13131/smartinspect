
export default async function handler(req, res) {

    console.log("=== SMARTINSPECT AI ===");

    console.log("Método:", req.method);

    console.log(
        "GROQ_API_KEY existe:",
        !!process.env.GROQ_API_KEY
    );


    if (req.method !== "POST") {

        return res.status(405).json({

            erro: "Método não permitido."

        });

    }


    try {

        const mensagem =
            req.body?.mensagem;


        console.log(
            "Mensagem recebida:",
            !!mensagem
        );


        if (!process.env.GROQ_API_KEY) {

            console.error(
                "GROQ_API_KEY NÃO ENCONTRADA"
            );


            return res.status(500).json({

                erro:
                    "GROQ_API_KEY não está disponível na função."

            });

        }


        if (!mensagem) {

            return res.status(400).json({

                erro:
                    "Mensagem não recebida."

            });

        }


        console.log(
            "Chamando Groq..."
        );


        const resposta = await fetch(

            "https://api.groq.com/openai/v1/chat/completions",

            {

                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${process.env.GROQ_API_KEY}`,

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    model:
                        "llama-3.3-70b-versatile",

                    messages: [

                        {

                            role: "system",

                            content:
                                "Você é o SmartInspect AI, especialista em construção civil. Responda em português do Brasil de forma técnica e objetiva."

                        },

                        {

                            role: "user",

                            content: mensagem

                        }

                    ]

                })

            }

        );


        console.log(
            "Status Groq:",
            resposta.status
        );


        const texto =
            await resposta.text();


        console.log(
            "Resposta Groq:",
            texto
        );


        if (!resposta.ok) {

            return res.status(502).json({

                erro:
                    `Groq retornou ${resposta.status}: ${texto}`

            });

        }


        let dados;


        try {

            dados =
                JSON.parse(texto);

        }

        catch (erro) {

            return res.status(502).json({

                erro:
                    "Resposta da Groq não é JSON válido."

            });

        }


        const resultado =
            dados?.choices?.[0]?.message?.content;


        if (!resultado) {

            return res.status(502).json({

                erro:
                    "A Groq não retornou conteúdo.",

                detalhes:
                    dados

            });

        }


        return res.status(200).json({

            resposta:
                resultado

        });


    }

    catch (erro) {

        console.error(
            "ERRO SMARTINSPECT:",
            erro
        );


        return res.status(500).json({

            erro:
                erro?.message ||
                String(erro)

        });

    }

}

