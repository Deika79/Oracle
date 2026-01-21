export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pregunta } = req.body;

  if (!pregunta) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Eres un oráculo antiguo y críptico. Respondes de forma breve, simbólica y misteriosa.",
            },
            { role: "user", content: pregunta },
          ],
          max_tokens: 100,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI error:", data);
      return res.status(500).json({ error: "OpenAI API error" });
    }

    return res.status(200).json({
      respuesta: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
