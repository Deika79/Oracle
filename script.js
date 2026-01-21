document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const button = document.getElementById("send-btn");
  const chatBox = document.getElementById("chat-box");

  // Comprobación de seguridad
  if (!input || !button || !chatBox) {
    console.error("❌ Elementos del DOM no encontrados", {
      input,
      button,
      chatBox,
    });
    return;
  }

  async function enviarPregunta() {
    const pregunta = input.value.trim();
    if (!pregunta) return;

    // Mensaje del usuario
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = pregunta;
    chatBox.appendChild(userMsg);

    input.value = "";

    // Mensaje provisional del oráculo
    const oracleMsg = document.createElement("div");
    oracleMsg.className = "oracle-msg";
    oracleMsg.textContent = "🔮 El oráculo medita...";
    chatBox.appendChild(oracleMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta }),
      });

      // 🔥 CLAVE: comprobar si la respuesta es OK
      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Error del servidor:", text);
        oracleMsg.textContent = "🔮 El oráculo guarda silencio...";
        return;
      }

      const data = await res.json();

      oracleMsg.textContent =
        data.respuesta || "🔮 El oráculo no revela nada.";

    } catch (error) {
      console.error("❌ Error de red:", error);
      oracleMsg.textContent = "❌ El velo del futuro está nublado.";
    }
  }

  // Click en botón
  button.addEventListener("click", enviarPregunta);

  // Enviar con ENTER
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      enviarPregunta();
    }
  });
});
