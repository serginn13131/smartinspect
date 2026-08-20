
// ==========================================
// SMARTINSPECT AI
// API GROQ + VERCEL
// ==========================================

export default async function handler(req, res) {

    try {

        // ======================================
        // POST
        // ======================================

        if (req.method !== "POST") {

            return res.status(405).json({

                erro: "Método não permitido."

            });

        }


        // ======================================
        // API KEY
        // ======================================

        const apiKey =
            process.env.GROQ_API_KEY;


        if (!apiKey) {

            return res.status(500).json({

                erro:
                    "GROQ_API_KEY não encontrada na Vercel."

            });

        }


        // ======================================
        // MENSAGEM
        // ======================================

        const mensagem =
            req.body?.mensagem;


        if (!mensagem) {

            return res.status(400).json({

                erro:
                    "Mensagem não informada."

            });

        }


        // ======================================
        // GROQ
        // ======================================

        const resposta = await fetch(

            "https://api.groq.com/openai/v1/chat/completions",

            {

                method: "POST",

                headers: {

                    "Authorization":
                        "Bearer " + apiKey,

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    model:
                        "openai/gpt-oss-20b",

                    messages: [

                        {

                            role: "system",

                            content: `
Você é o SmartInspect AI.

Você é especialista em construção civil.

Auxilie engenheiros, arquitetos,
técnicos e inspetores.

Conhecimentos principais:

- Inspeções de obras
- Patologias
- Concreto
- Estruturas
- Alvenaria
- Materiais
- Manutenção
- Normas técnicas

Responda em português do Brasil.

Seja técnico, claro e objetivo.

Não invente normas ou informações.
Quando não tiver certeza, informe.
`

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


        // ======================================
        // PEGAR RESPOSTA
        // ======================================

        const dados =
            await resposta.json();


        // ======================================
        // ERRO GROQ
        // ======================================

        if (!resposta.ok) {

            console.error(
                "Erro Groq:",
                dados
            );


            return res.status(502).json({

                erro:
                    "Erro da inteligência artificial.",

                status_groq:
                    resposta.status,

                erro_groq:
                    dados?.error?.message ||
                    "Erro desconhecido."

            });

        }


        // ======================================
        // RESPOSTA
        // ======================================

        const texto =
            dados?.choices?.[0]?.message?.content;


        if (!texto) {

            return res.status(502).json({

                erro:
                    "A IA não retornou uma resposta."

            });

        }


        // ======================================
        // SUCESSO
        // ======================================

        return res.status(200).json({

            resposta:
                texto

        });

    }

    catch (erro) {

        console.error(
            "ERRO API CHAT IA:",
            erro
        );


        return res.status(500).json({

            erro:
                erro?.message ||
                "Erro interno da API."

        });

    }

}
```
