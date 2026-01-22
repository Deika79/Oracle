export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pregunta } = req.body;

  if (!pregunta) {
    return res.status(400).json({ error: "No hay pregunta" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Eres un oráculo místico, hablas de forma enigmática y profética."
          },
          {
            role: "user",
            content: pregunta
          }
        ],
        temperature: 0.9
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI error:", data);
      return res.status(500).json({ error: data });
    }

    const respuesta = data.choices[0].message.content;

    return res.status(200).json({ respuesta });

  } catch (err) {
    console.error("🔥 Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
