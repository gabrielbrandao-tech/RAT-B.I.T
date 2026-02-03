# Relatório Técnico – PWA

Aplicação Web Progressiva (PWA) desenvolvida para auxiliar técnicos de TI no registro rápido, padronizado e reutilizável de relatórios técnicos, com suporte a funcionamento offline.

## Descrição

O Relatório Técnico – PWA permite cadastrar e manter uma biblioteca local de problemas e soluções recorrentes, selecionar rapidamente os itens necessários para cada atendimento e gerar um relatório técnico em formato de texto, pronto para cópia e envio.

O projeto foi pensado para uso prático em campo, inclusive sem conexão com a internet.

## Funcionalidades

- Interface em etapas (wizard)
- Cadastro de dados básicos do atendimento
- Biblioteca persistente de problemas e soluções
- Seleção de problemas e soluções para cada relatório
- Adição e remoção de itens da biblioteca
- Geração automática de relatório técnico em texto
- Botão para copiar o relatório gerado
- Tema claro e escuro
- Funcionamento offline
- Instalação como aplicativo (PWA)

## Persistência de Dados

Os dados de problemas e soluções são armazenados localmente utilizando `localStorage`, permitindo:

- Reutilização em novos atendimentos
- Inclusão e exclusão de itens a qualquer momento
- Funcionamento completo mesmo sem internet

## Funcionamento Offline

A aplicação utiliza Service Worker para cache de arquivos essenciais, garantindo:

- Acesso offline
- Melhor desempenho
- Comportamento semelhante a um aplicativo nativo

## Tecnologias Utilizadas

- HTML5
- CSS3 (Responsivo)
- JavaScript (Vanilla)
- PWA (Manifest e Service Worker)
- LocalStorage

## Estrutura de Pastas

```text
/
├── index.html
├── manifest.json
├── css/
│   └── estilo.css
├── js/
│   ├── relatorio.js
│   └── service-worker.js
├── icon-192.png
└── icon-512.png
