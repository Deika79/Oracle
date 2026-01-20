const input = document.getElementById("pregunta");
const button = document.getElementById("enviar");
const respuestaDiv = document.getElementById("respuesta");

button.addEventListener("click", async () => {
  const pregunta = input.value;
  if (!pregunta) return;

  respuestaDiv.textContent = "🔮 El oráculo piensa...";

  try {
    const res = await fetch("/api/oracle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta })
    });

    const data = await res.json();
    respuestaDiv.textContent = data.respuesta;
  } catch (err) {
    respuestaDiv.textContent = "❌ Error al contactar al oráculo.";
    console.error(err);
  }
});
