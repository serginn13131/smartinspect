
export default function handler(req, res) {

    console.log("SMARTINSPECT CHAT IA EXECUTOU");

    return res.status(200).json({

        sucesso: true,

        resposta:
            "🤖 A Function do SmartInspect AI está funcionando!"

    });

}
```
