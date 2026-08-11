async function criarNotificacao({
titulo,
mensagem,
categoria = "informativo",
prioridade = "informativo",
obra_id = null,
problema = null,
impacto = null,
recomendacao = null
}) {

```
try {

    const usuario = getUsuario();

    if (!usuario) {
        console.warn("Usuário não encontrado para criar notificação.");
        return null;
    }

    const usuario_id = usuario.id || null;

    const { data, error } = await banco
        .from("notificacoes")
        .insert([{
            usuario_id,
            obra_id,
            titulo,
            mensagem,
            categoria,
            prioridade,
            problema,
            impacto,
            recomendacao,
            lida: false
        }])
        .select()
        .single();

    if (error) {
        console.error("Erro ao criar notificação:", error);
        return null;
    }

    return data;

} catch (erro) {

    console.error(
        "Erro inesperado ao criar notificação:",
        erro
    );

    return null;
}
```

}
