
// ==========================================
// SMARTINSPECT AI
// VERCEL + GROQ
// ==========================================

const Groq = require("groq-sdk");


// ==========================================
// FUNÇÃO PRINCIPAL
// ==========================================

module.exports = async function handler(req, res) {

    // ======================================
    // MÉTODO
    // ======================================

    if (req.method !== "POST") {

        return res.status(405).json({

            erro: "Método não permitido."

        });

    }


    try {

        // ==================================
        // VERIFICAR API KEY
        // ==================================

        const apiKey =
            process.env.GROQ_API_KEY;


        if (!apiKey) {

            console.error(
                "GROQ_API_KEY não encontrada."
            );


            return res.status(500).json({

                erro:
                    "GROQ_API_KEY não configurada na Vercel."

            });

        }


        // ==================================
        // MENSAGEM
        // ==================================

        const mensagem =
            req.body &&
            req.body.mensagem;


        if (!mensagem) {

            return res.status(400).json({

                erro:
                    "Mensagem não informada."

            });

        }


        // ==================================
        // GROQ
        // ==================================

        const groq =
            new Groq({

                apiKey:
                    apiKey

            });


        // ==================================
        // CHAT
        // ==================================

        const completion =
            await groq.chat.completions.create({

                model:
                    "openai/gpt-oss-20b",

                messages: [

                    {

                        role:
                            "system",

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

                        role:
                            "user",

                        content:
                            mensagem

                    }

                ]

            });


        // ==================================
        // PEGAR TEXTO
        // ==================================

        const resposta =
            completion
                ?.choices?.[0]
                ?.message?.content;


        if (!resposta) {

            return res.status(502).json({

                erro:
                    "A IA não retornou uma resposta."

            });

        }


        // ==================================
        // SUCESSO
        // ==================================

        return res.status(200).json({

            resposta:
                resposta

        });


    }

    catch (erro) {

        console.error(
            "ERRO GROQ:",
            erro
        );


        return res.status(500).json({

            erro:
                erro?.message ||
                "Erro interno na API."

        });

    }

};
```
