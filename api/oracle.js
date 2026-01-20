import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { pregunta } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un oráculo antiguo y críptico. Respondes en frases breves, misteriosas y simbólicas." },
        { role: "user", content: pregunta }
      ],
      max_tokens: 100
    });

    const respuesta = completion.choices[0].message.content;
    res.status(200).json({ respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del oráculo" });
  }
}
