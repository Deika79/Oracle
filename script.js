document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const button = document.getElementById("send-btn");
  const chatBox = document.getElementById("chat-box");

  // Comprobación de seguridad
  if (!input || !button || !chatBox) {
    console.error("❌ Elementos del DOM no encontrados", {
      input,
      button,
      chatBox
    });
    return;
  }

  button.addEventListener("click", async () => {
    const pregunta = input.value.trim();
    if (!pregunta) return;

    // Mostrar pregunta del usuario
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = pregunta;
    chatBox.appendChild(userMsg);

    input.value = "";

    // Mensaje temporal del oráculo
    const oracleMsg = document.createElement("div");
    oracleMsg.className = "oracle-msg";
    oracleMsg.textContent = "🔮 El oráculo medita...";
    chatBox.appendChild(oracleMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta })
      });

      const data = await res.json();

      oracleMsg.textContent =
        data.respuesta || "El oráculo guarda silencio...";
    } catch (error) {
      console.error(error);
      oracleMsg.textContent = "❌ El velo del futuro está nublado.";
    }
  });

  // Enviar con ENTER
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      button.click();
    }
  });
});
