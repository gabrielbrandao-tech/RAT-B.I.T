document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
    });
  }

  /* =========================
     NAVEGAÇÃO
  ========================= */

  window.nextStep = function () {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  };

  window.prevStep = function () {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  };

  window.validarStep2 = function () {
    nextStep();
  };

  /* =========================
     TEMA
  ========================= */

  window.toggleTema = function () {
    document.body.classList.toggle("dark");
  };

  /* =========================
     ADICIONAR PROBLEMAS / SOLUÇÕES
  ========================= */

  window.addCustom = function (tipo) {
    let input, lista;

    if (tipo === "problemas") {
      input = document.getElementById("novoProblema");
      lista = document.getElementById("listaProblemas");
    } else {
      input = document.getElementById("novaSolucao");
      lista = document.getElementById("listaSolucoes");
    }

    if (!input.value.trim()) return;

    const li = document.createElement("li");
    li.textContent = input.value;

    lista.appendChild(li);
    input.value = "";
  };

  window.addChecked = function (tipo) {
    let box, lista;

    if (tipo === "problemas") {
      box = document.getElementById("boxProblemas");
      lista = document.getElementById("listaProblemas");
    } else {
      box = document.getElementById("boxSolucoes");
      lista = document.getElementById("listaSolucoes");
    }

    const checks = box.querySelectorAll("input[type=checkbox]:checked");

    checks.forEach(check => {
      const li = document.createElement("li");
      li.textContent = check.value;
      lista.appendChild(li);
      check.checked = false;
    });
  };

  /* =========================
     RELATÓRIO FINAL
  ========================= */

  window.gerarRelatorio = function () {
    const resultado = document.getElementById("resultado");

    resultado.textContent = "Relatório gerado com sucesso.";
  };

  window.copiar = function () {
    const texto = document.getElementById("resultado").textContent;
    navigator.clipboard.writeText(texto);
  };

  showStep(currentStep);
});
