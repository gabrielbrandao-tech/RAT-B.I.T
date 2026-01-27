  let step=1;

    // Opções fixas
    let problemasFixos=JSON.parse(localStorage.getItem("problemasFixos"))||[
      "Falha de autenticação","Serviço parado","Erro de permissão","Falha de conexão"
    ];
    let solucoesFixas=JSON.parse(localStorage.getItem("solucoesFixas"))||[
      "Reinício do serviço","Ajuste de permissões","Correção de configuração","Atualização do sistema"
    ];

    // Listas adicionadas
    let problemas=JSON.parse(localStorage.getItem("problemas"))||[];
    let solucoes=JSON.parse(localStorage.getItem("solucoes"))||[];

    // Navegação
    function mostrar(s){
      document.querySelectorAll(".step").forEach(e=>e.style.display="none");
      document.querySelector(`[data-step="${s}"]`).style.display="block";
      step=s;
    }
    function nextStep(){mostrar(step+1)}
    function prevStep(){mostrar(step-1)}
    function toggleTema(){document.body.classList.toggle("dark")}

    // Render fixos
    function renderFixos(){
      boxProblemas.innerHTML=problemasFixos.map((p,i)=>
        `<label><input type="checkbox" value="${p}"> ${p} <small onclick="removerFixo('problemas',${i})">✖</small></label>`
      ).join("");

      boxSolucoes.innerHTML=solucoesFixas.map((s,i)=>
        `<label><input type="checkbox" value="${s}"> ${s} <small onclick="removerFixo('solucoes',${i})">✖</small></label>`
      ).join("");
    }

    // Adicionar checkboxes selecionados
    function addChecked(tipo){
      document.querySelectorAll(`#box${cap(tipo)} input:checked`).forEach(c=>{
        const arr=tipo==="problemas"?problemas:solucoes;
        if(!arr.includes(c.value)) arr.push(c.value);
        c.checked=false;
      });
      salvar();
    }

    // Adicionar personalizado
    function addCustom(tipo){
      const input=tipo==="problemas"?novoProblema:novaSolucao;
      if(!input.value.trim()) return;
      const fixos=tipo==="problemas"?problemasFixos:solucoesFixas;
      fixos.push(input.value.trim());
      input.value="";
      salvarFixos();
    }

    // Remover fixos
    function removerFixo(tipo,i){
      (tipo==="problemas"?problemasFixos:solucoesFixas).splice(i,1);
      salvarFixos();
    }

    // Render listas adicionadas
    function renderLista(tipo){
      const arr=tipo==="problemas"?problemas:solucoes;
      document.getElementById("lista"+cap(tipo)).innerHTML=
        arr.map((e,i)=>`<li>${e} <span onclick="remover('${tipo}',${i})">✖</span></li>`).join("");
    }

    // Remover item adicionado
    function remover(tipo,i){
      (tipo==="problemas"?problemas:solucoes).splice(i,1);
      salvar();
    }

    // Salvar listas
    function salvar(){
      localStorage.setItem("problemas",JSON.stringify(problemas));
      localStorage.setItem("solucoes",JSON.stringify(solucoes));
      renderLista("problemas");
      renderLista("solucoes");
    }

    // Salvar fixos
    function salvarFixos(){
      localStorage.setItem("problemasFixos",JSON.stringify(problemasFixos));
      localStorage.setItem("solucoesFixas",JSON.stringify(solucoesFixas));
      renderFixos();
    }

    // Validar STEP2 antes de avançar
    function validarStep2(){
      if(problemas.length===0){ alert("Adicione pelo menos um PROBLEMA."); return; }
      if(solucoes.length===0){ alert("Adicione pelo menos uma SOLUÇÃO."); return; }
      nextStep();
    }

    // Gerar relatório
    function gerarRelatorio(){
      const statusValue = document.getElementById("status").value;

      if(!local.value || !wot.value || !responsavel.value || !funcao.value){
        alert("Preencha todos os campos de identificação."); return;
      }
      if(problemas.length===0){ alert("Adicione pelo menos um PROBLEMA."); return; }
      if(solucoes.length===0){ alert("Adicione pelo menos uma SOLUÇÃO."); return; }
      if(!statusValue){ alert("Selecione o STATUS."); return; }

      resultado.innerText = `DATA: ${new Date().toLocaleString("pt-BR")}


    LOCAL: ${local.value}
    WOT${wot.value}
    RESPONSÁVEL: ${responsavel.value}
    FUNÇÃO: ${funcao.value}
    STATUS: ${statusValue}

    PROBLEMAS IDENTIFICADOS:
    ${problemas.map(p=>"- "+p).join("\n")}

    SOLUÇÕES APLICADAS:
    ${solucoes.map(s=>"- "+s).join("\n")}`;
    }

    // Copiar
    function copiar(){navigator.clipboard.writeText(resultado.innerText); alert("Copiado!");}

    // Capitalizar tipo
    function cap(t){return t.charAt(0).toUpperCase()+t.slice(1)}

    // Inicializar
    renderFixos();
    renderLista("problemas");
    renderLista("solucoes");
    mostrar(1);