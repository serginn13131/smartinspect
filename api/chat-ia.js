
// ==========================================
// SMARTINSPECT AI
// API VERCEL + GROQ
// ==========================================

export default async function handler(req, res) {

    try {

        // ======================================
        // VERIFICAR MÉTODO
        // ======================================

        if (req.method !== "POST") {

            return res.status(405).json({
                erro: "Método não permitido."
            });

        }


        // ======================================
        // VERIFICAR API KEY
        // ======================================

        const apiKey = process.env.GROQ_API_KEY;


        if (!apiKey) {

            console.error(
                "GROQ_API_KEY não encontrada."
            );

            return res.status(500).json({
                erro:
                    "GROQ_API_KEY não configurada na Vercel."
            });

        }


        // ======================================
        // PEGAR MENSAGEM
        // ======================================

        const mensagem =
            req.body?.mensagem;


        if (
            !mensagem ||
            typeof mensagem !== "string"
        ) {

            return res.status(400).json({
                erro:
                    "Mensagem não informada."
            });

        }


        // ======================================
        // CHAMAR GROQ
        // ======================================

        const resposta = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        "Bearer " + apiKey

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
        // LER RESPOSTA DA GROQ
        // ======================================

        const texto =
            await resposta.text();


        console.log(
            "Status Groq:",
            resposta.status
        );


        console.log(
            "Resposta Groq:",
            texto
        );


        // ======================================
        // ERRO GROQ
        // ======================================

        if (!resposta.ok) {

            let erro = texto;


            try {

                const dadosErro =
                    JSON.parse(texto);


                erro =
                    dadosErro?.error?.message ||
                    texto;

            }

            catch {

                // mantém erro original

            }


            return res.status(502).json({

                erro:
                    "Erro da inteligência artificial.",

                status_groq:
                    resposta.status,

                erro_groq:
                    erro

            });

        }


        // ======================================
        // CONVERTER RESPOSTA
        // ======================================

        let dados;


        try {

            dados =
                JSON.parse(texto);

        }

        catch {

            return res.status(502).json({

                erro:
                    "A Groq retornou uma resposta inválida.",

                resposta:
                    texto

            });

        }


        // ======================================
        // PEGAR RESPOSTA DA IA
        // ======================================

        const respostaIA =
            dados
                ?.choices?.[0]
                ?.message?.content;


        if (!respostaIA) {

            return res.status(502).json({

                erro:
                    "A IA não retornou uma resposta.",

                dados:
                    dados

            });

        }


        // ======================================
        // SUCESSO
        // ======================================

        return res.status(200).json({

            sucesso: true,

            resposta:
                respostaIA

        });


    }

    catch (erro) {

        console.error(
            "ERRO NA FUNCTION /api/chat-ia:",
            erro
        );


        return res.status(500).json({

            erro:
                erro?.message ||
                "Erro interno na Function."

        });

    }

}
```
