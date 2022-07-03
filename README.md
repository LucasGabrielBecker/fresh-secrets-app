## Este foi um projeto experimental criado para testes no framework [Deno Fresh](https://fresh.deno.dev/)

<p>A intenção era avaliar a experiência para desenvolvimento de um app pequeno com o framework, utilizando apenas os recursos do próprio Fresh.
<p>Acesse aqui o app <a href="https://secrets.deno.dev">demo</a></p>
<p><i>Vale notar que apesar do app ser pequeno e com poucas interações, tudo isso é feito sem enviar nenhum arquivo Javascript para o client. <code>Tudo é server side rendered. </code></i><svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; transform:translateY(5px);"class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
</svg></p>

#### Alguns pontos positivos do framework

<ul>
<li>Fácilmente se desenvolve um app com <b>0 javascript para o client</b></li>
<li>Capacidade de lidar requests á página nos métodos GET e POST e a renderização do componente, tudo no mesmo arquivo!</li>
<li>Se utilizada a plataforma <a href="https://deno.com/deploy">Deno deploy</a> o deploy é extremamente rápido, já que não possui o step de build comum a outros frameworks full stack</li>
<li>Por vezes o deploy é tão rápido que bastam uns 2 ou 3 refreshs na página que você já tem o conteúdo mais recente do repositório na tela</li>
<li>Deno tem suporte a typescript <code>out of the box</code></li>
<li>Edge computing 🌎 (se hospedado no deno deploy)</li>
</ul>

## Performance

Apesar de ser uma aplicação extremamente pequena, mas ainda assim tendo interação com banco de dados, a performance impressiona.
Não dei nenhuma ênfase ou atenção especial em performance durante o desenvolvimento, mesmo assim o resultado do Lighthouse do google foi insano.
<img src="/static/fresh_performance.png" alt="print screen website performance" height="600">
