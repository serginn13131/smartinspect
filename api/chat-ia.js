
export default async function handler(req, res) {

    // ==========================================
    // SOMENTE POST
    // ==========================================

    if (req.method !== "POST") {

        return res.status(405).json({
            erro: "Método não permitido."
        });

    }


    try {

        // ==========================================
        // VERIFICAR CHAVE
        // ==========================================

        const apiKey =
            process.env.GROQ_API_KEY;


        if (!apiKey) {

            return res.status(500).json({

                erro:
                    "GROQ_API_KEY não encontrada na Vercel."

            });

        }


        // ==========================================
        // MENSAGEM
        // ==========================================

        const mensagem =
            req.body?.mensagem;


        if (!mensagem) {

            return res.status(400).json({

                erro:
                    "Nenhuma mensagem foi enviada."

            });

        }


        // ==========================================
        // GROQ
        // ==========================================

        const resposta = await fetch(

            "https://api.groq.com/openai/v1/chat/completions",

            {

                method: "POST",

                headers: {

                    "Authorization":
                        `Bearer ${apiKey}`,

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
                                "Você é o SmartInspect AI, um especialista em construção civil. Responda em português do Brasil. Seja técnico, objetivo e organizado. Não invente normas técnicas."

                        },

                        {

                            role: "user",

                            content:
                                mensagem

                        }

                    ]

                })

            }

        );


        // ==========================================
        // LER RESPOSTA DA GROQ
        // ==========================================

        const texto =
            await resposta.text();


        let dados = null;


        try {

            dados =
                JSON.parse(texto);

        } catch {

            dados = null;

        }


        // ==========================================
        // GROQ DEU ERRO
        // ==========================================

        if (!resposta.ok) {

            console.error(
                "ERRO GROQ:",
                resposta.status,
                texto
            );


            return res.status(502).json({

                sucesso: false,

                status_groq:
                    resposta.status,

                erro_groq:
                    dados?.error?.message ||
                    texto ||
                    "Erro desconhecido da Groq."

            });

        }


        // ==========================================
        // PEGAR RESPOSTA
        // ==========================================

        const respostaIA =
            dados?.choices?.[0]?.message?.content;


        if (!respostaIA) {

            return res.status(502).json({

                sucesso: false,

                erro:
                    "A Groq respondeu, mas não enviou o texto da IA.",

                resposta_groq:
                    dados

            });

        }


        // ==========================================
        // SUCESSO
        // ==========================================

        return res.status(200).json({

            sucesso: true,

            resposta:
                respostaIA

        });


    }

    catch (erro) {

        console.error(
            "ERRO API:",
            erro
        );


        return res.status(500).json({

            sucesso: false,

            erro:
                erro?.message ||
                String(erro)

        });

    }

}
