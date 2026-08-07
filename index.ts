import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Método não permitido" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await request.json();
    const { destinatario, assunto, nomeArquivo, pdfBase64, numeroRelatorio } = body;
    if (!destinatario || !pdfBase64 || !nomeArquivo) throw new Error("Destinatário, PDF e nome do arquivo são obrigatórios");

    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: Deno.env.get("REPORT_SENDER_EMAIL") ?? "SmartInspect AI <relatorios@seudominio.com>",
        to: [destinatario],
        subject: assunto ?? `Relatório de inspeção ${numeroRelatorio ?? "SmartInspect AI"}`,
        html: `<p>Olá,</p><p>Segue em anexo o relatório técnico <strong>${numeroRelatorio ?? "de inspeção"}</strong> gerado pelo SmartInspect AI.</p><p>Este e-mail foi enviado automaticamente pelo sistema.</p>`,
        attachments: [{ filename: nomeArquivo, content: pdfBase64 }],
      }),
    });

    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado?.message ?? "Falha no provedor de e-mail");
    return new Response(JSON.stringify({ ok: true, id: resultado.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Erro ao enviar relatório" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
