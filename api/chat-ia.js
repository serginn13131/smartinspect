```javascript
// ==========================================
// SMARTINSPECT AI
// API DE INTELIGÊNCIA ARTIFICIAL
// VERCEL + GROQ
// ==========================================

export default async function handler(req, res) {

    // ==========================================
    // PERMITIR SOMENTE POST
    // ==========================================

    if (req.method !== "POST") {

        return res.status(405).json({

            sucesso: false,

            erro: "Método não permitido."

        });

    }


    try {

        // ==========================================
        // PEGAR CHAVE DA VERCEL
        // ==========================================

        const apiKey =
            process.env.GROQ_API_KEY;


        if (!apiKey) {

            console.error(
                "GROQ_API_KEY não encontrada."
            );


            return res.status(500).json({

                sucesso: false,

                erro:
                    "A GROQ_API_KEY não está configurada na Vercel."

            });

        }


        // ==========================================
        // PEGAR MENSAGEM
        // ==========================================

        const mensagem =
            req.body?.mensagem;


        if (
            !mensagem ||
            typeof mensagem !== "string"
        ) {

            return res.status(400).json({

                sucesso: false,

                erro:
                    "Nenhuma mensagem foi enviada."

            });

        }


        // ==========================================
        // CHAMAR GROQ
        // ==========================================

        const resposta =
            await fetch(

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
                            "llama-3.1-8b-instant",

                        temperature:
                            0.3,

                        max_tokens:
                            1200,

                        messages: [

                            {

                                role: "system",

                                content: `
Você é o SmartInspect AI.

Você é um assistente especializado em construção civil.

Seu objetivo é auxiliar engenheiros,
arquitetos, técnicos e inspetores.

Conhecimentos principais:

- Inspeções prediais
- Inspeções de obras
- Patologias da construção
- Segurança
- Normas técnicas

Responda sempre em português do Brasil.

Seja técnico, claro e objetivo.

Quando necessário, organize a resposta em:

Causa provável
Riscos
Recomendação
Próximos passos

Não invente números de normas técnicas.

Quando não tiver certeza de alguma informação,
deixe isso claro.
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


        // ==========================================
        // LER RESPOSTA
        // ==========================================

        const texto =
            await resposta.text();


        console.log(
            "Groq status:",
            resposta.status
        );


        // ==========================================
        // ERRO DA GROQ
        // ==========================================

        if (!resposta.ok) {

            console.error(
                "Erro Groq:",
                texto
            );


            let erroGroq =
                texto;


            try {

                const jsonErro =
                    JSON.parse(texto);


                erroGroq =
                    jsonErro?.error?.message ||
                    texto;

            }

            catch {

                // Mantém texto original

            }


            return res.status(502).json({

                sucesso: false,

                erro:
                    "A Groq recusou a solicitação.",

                status_groq:
                    resposta.status,

                erro_groq:
                    erroGroq

            });

        }


        // ==========================================
        // CONVERTER JSON
        // ==========================================

        let dados;


        try {

            dados =
                JSON.parse(texto);

        }

        catch {

            return res.status(502).json({

                sucesso: false,

                erro:
                    "A Groq retornou uma resposta inválida."

            });

        }


        // ==========================================
        // PEGAR RESPOSTA DA IA
        // ==========================================

        const respostaIA =
            dados
                ?.choices
                ?. [0]
                ?.message
                ?.content;


        if (!respostaIA) {

            console.error(
                "Resposta inesperada da Groq:",
                dados
            );


            return res.status(502).json({

                sucesso: false,

                erro:
                    "A Groq não retornou uma resposta de texto."

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
            "Erro interno da API:",
            erro
        );


        return res.status(500).json({

            sucesso: false,

            erro:
                erro?.message ||
                "Erro interno no servidor."

        });

    }

}

