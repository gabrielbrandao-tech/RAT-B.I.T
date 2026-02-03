document.addEventListener("DOMContentLoaded", () => {

  const steps = document.querySelectorAll(".step");
  let currentStep = 0;

  const listaProblemas = document.getElementById("listaProblemas");
  const listaSolucoes = document.getElementById("listaSolucoes");

  const STORAGE_PROBLEMAS = "rat_problemas";
  const STORAGE_SOLUCOES = "rat_solucoes";

  function showStep(i) {
    steps.forEach((s, idx) => s.style.display = idx === i ? "block" : "none");
  }

  window.nextStep = () => { if (currentStep < steps.length - 1) showStep(++currentStep); };
  window.prevStep = () => { if (currentStep > 0) showStep(--currentStep); };

  window.toggleTema = () => document.body.classList.toggle("dark");

  /* ===== CRIAR CHECKBOX (BIBLIOTECA) ===== */
  function criarCheckbox(tipo, texto) {
    const box = document.getElementById(
      tipo === "problemas" ? "boxProblemas" : "boxSolucoes"
    );

    const label = document.createElement("label");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.value = texto;

    const span = document.createElement("span");
    span.textContent = texto;

    const del = document.createElement("small");
    del.textContent = "✖";
    del.onclick = () => {
      label.remove();
      salvar(tipo);
    };

    label.append(check, span, del);
    box.appendChild(label);
  }

  /* ===== CRIAR ITEM DO RELATÓRIO ===== */
  function criarItem(tipo, texto) {
    const li = document.createElement("li");
    li.textContent = texto;

    const del = document.createElement("small");
    del.textContent = "✖";
    del.onclick = () => li.remove();

    li.appendChild(del);

    (tipo === "problemas" ? listaProblemas : listaSolucoes).appendChild(li);
  }

  function salvar(tipo) {
    const box = document.getElementById(
      tipo === "problemas" ? "boxProblemas" : "boxSolucoes"
    );

    const dados = [...box.querySelectorAll("input")]
      .map(i => i.value);

    localStorage.setItem(
      tipo === "problemas" ? STORAGE_PROBLEMAS : STORAGE_SOLUCOES,
      JSON.stringify(dados)
    );
  }

  function carregar() {
    (JSON.parse(localStorage.getItem(STORAGE_PROBLEMAS)) || [])
      .forEach(p => criarCheckbox("problemas", p));

    (JSON.parse(localStorage.getItem(STORAGE_SOLUCOES)) || [])
      .forEach(s => criarCheckbox("solucoes", s));
  }

  window.addCustom = (tipo) => {
    const input = document.getElementById(
      tipo === "problemas" ? "novoProblema" : "novaSolucao"
    );

    if (!input.value.trim()) return;

    criarCheckbox(tipo, input.value.trim());
    salvar(tipo);
    input.value = "";
  };

  window.addChecked = (tipo) => {
    const box = document.getElementById(
      tipo === "problemas" ? "boxProblemas" : "boxSolucoes"
    );

    box.querySelectorAll("input:checked").forEach(c => {
      criarItem(tipo, c.value);
      c.checked = false;
    });
  };

  window.gerarRelatorio = () => {
    let texto = "RELATÓRIO TÉCNICO\n\n";

    texto += "PROBLEMAS:\n";
    [...listaProblemas.children].forEach(li =>
      texto += "- " + li.firstChild.textContent + "\n"
    );

    texto += "\nSOLUÇÕES:\n";
    [...listaSolucoes.children].forEach(li =>
      texto += "- " + li.firstChild.textContent + "\n"
    );

    document.getElementById("resultado").textContent = texto;
  };

  window.copiar = () => {
    navigator.clipboard.writeText(resultado.textContent);
    alert("Copiado!");
  };

  carregar();
  showStep(currentStep);
});
