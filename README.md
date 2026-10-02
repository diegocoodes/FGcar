# FCar Garage

Site institucional em português, com Next.js App Router, React, TypeScript, Tailwind CSS, Motion, GSAP e Lucide React. A página inicial é renderizada estaticamente. Não há backend, formulário de envio ou painel administrativo.

## Executar localmente

Requer Node.js 20.9 ou superior.

```sh
npm install
npm run dev
```

Abra http://localhost:3000. Para conferir a versão de produção:

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

Para executar as verificações de navegação, layout e acessibilidade em desktop e celular, use `npm run test:e2e` após o build. Os testes usam o Google Chrome instalado no computador. O Playwright inicia e encerra o servidor de produção na porta 3100, permitindo continuar o desenvolvimento na porta 3000.

## Conteúdo e identidade

- `src/config/site.ts`: dados da empresa, contato, navegação e serviços.
- `src/config/reviews.ts`: os quatro comentários fornecidos pelo usuário e sua atribuição à FG Car Mecânica de Autos.
- `src/components/ui/`: componentes integrados dos anexos, com identidade visual e conteúdo adaptados ao site.
- `components.json` e `src/lib/utils.ts`: aliases compatíveis com shadcn e utilitário `cn`. O diretório `ui` mantém os imports dos componentes enviados compatíveis com `@/components/ui`.
- `src/app/globals.css`: paleta, tipografia, composição e responsividade.
- `src/app/page.tsx`: seções renderizadas no servidor.
- `src/components/`: menu acessível, animações progressivas e expansão dos serviços.
- `public/images/`: fotografias ilustrativas locais.

O WhatsApp fornecido para contato da FCar Garage é +55 11 99839-3642, com link direto para `https://wa.me/5511998393642` e opção de ligação. O Instagram permanece disponível para acompanhar o trabalho. Os dados das avaliações mantêm sua atribuição original.

O formulário de contato solicita nome, veículo e serviço, com detalhes opcionais. Ao continuar, abre o WhatsApp com a mensagem pronta para revisão e envio pelo visitante. Um botão fixo no canto inferior direito mantém acesso ao WhatsApp durante a rolagem.

## Assets a substituir

O símbolo fornecido em `public/images/logofgcar.png` é usado no cabeçalho e no rodapé, preservando o arquivo, as cores e a proporção. Ele acompanha o nome tipográfico da empresa. Adicione uma versão de maior resolução para usos que exijam ampliação e um arquivo de favicon quando disponível.

As fotografias são ilustrativas e não representam serviços executados pela FCar. Não foi criada uma seção de trabalhos. As imagens foram obtidas no Unsplash e convertidas em WebP:

- Hero anterior, preservado em `public/images/hero.webp`, Josh Berquist: https://unsplash.com/photos/pjxe3p4u5aI
- Detalhe, Jordan: https://unsplash.com/photos/eXgM5cIYNW0

Substitua por fotografias autorizadas da empresa: carro finalizado, detalhes de pintura, aplicação de PPF, polimento e vidros. Atualize os textos alternativos em `page.tsx` junto com as imagens.

As cinco imagens de tratamentos em `public/images/services/` foram criadas com a ferramenta integrada `image_gen`, inspecionadas e convertidas em WebP de 1536 × 1024 px. São ilustrações e não representam trabalhos executados pela empresa. Os prompts completos e os caminhos de cada arquivo estão em `docs/service-images.json`. Os caminhos e textos alternativos usados pelo site estão em `src/config/site.ts`.

O hero usa uma composição inspirada na referência enviada: letras grandes `FGCAR` em Anton, carro vermelho centralizado à frente do texto, fundo preto com iluminação vermelha, informações dos serviços e botões arredondados na base. O cabeçalho reúne a marca centralizada e uma navegação discreta. No celular, a marca e o menu ficam na mesma linha e os botões do hero são empilhados.

O novo carro ilustrativo foi criado com a ferramenta integrada `image_gen` e salvo em `public/images/hero-car-v2.webp`, preservando a transparência. O prompt e a referência de composição estão em `docs/hero-image-v2.json`. A imagem é carregada com prioridade; as demais fotografias continuam progressivas. Não foram adicionadas especificações de desempenho ou números de um veículo.

## Movimento e acessibilidade

Anton no nome grande do hero, Rajdhani SemiBold/Bold nos demais títulos e Archivo nos textos e na navegação, carregadas por `next/font`. O visual usa recortes angulares nas fotografias, espaços de leitura e cores centralizadas. Os pequenos traços decorativos e os separadores de texto com hífen foram removidos.

Entradas em sequência no hero, nos serviços e nos cuidados, revelações uma única vez, zoom discreto, transições nos botões, links e avaliações, e parallax de 24 px somente a partir de 1024 px. O conteúdo é visível na renderização do servidor. A preferência de movimento reduzido remove deslocamentos, zoom, parallax e a abertura da marca.

O componente `DrawLineText` do segundo anexo desenha e preenche a palavra `FGcar` em uma abertura decorativa de até 950 ms. A abertura usa GSAP para as letras e Motion para desaparecer, sem capturar cliques, prender o foco ou travar a rolagem. Não espera requisições nem assets para liberar o site. Há um limite visual por CSS para que ela desapareça mesmo se o encerramento da animação falhar. É omitida com movimento reduzido e ao acessar uma âncora diretamente. O título principal continua sendo texto HTML.

## Avaliações

O primeiro componente foi adaptado para quatro comentários colados pelo usuário, atribuídos explicitamente à FG Car Mecânica de Autos. Inclui o comentário completo de Marcos Cressoni e o trecho de Rodrigo Maita Ferreira. A grade assimétrica usa preto, grafite e detalhes vermelhos com entradas por Motion.

O perfil exato foi localizado no Google Maps em 2 de outubro de 2026. Foram conferidos o nome, a nota 4,7, o endereço e o telefone fornecidos. A página do estabelecimento disponibiliza uma visualização limitada. Os quatro comentários e a contagem de 15 são os dados colados pelo usuário, sem importação automática nem atualização em tempo real. Não foram atribuídas notas individuais ou datas. O botão abre o perfil exato no Google Maps.

Os avatares de [Marcos Cressoni](https://www.google.com/maps/contrib/101690924004061913236/reviews?hl=pt-BR) e [Rodrigo Maita Ferreira](https://www.google.com/maps/contrib/112051118361121209335/reviews?hl=pt-BR) foram obtidos dos respectivos perfis públicos enviados pelo usuário. São imagens locais em WebP de 160 px, armazenadas em `public/images/reviews/`, e os nomes abrem esses perfis. A foto adicional enviada por Rodrigo mostra um carro em manutenção e não é usada como avatar.

`ReviewerAvatar` aceita o caminho de uma foto local na propriedade `photo` de cada autor. Renata e Julyan mantêm as iniciais enquanto os respectivos perfis ou arquivos não estiverem disponíveis. Se uma foto falhar, o componente também volta para as iniciais.

É necessário confirmar a relação entre FG Car Mecânica de Autos e FCar Garage antes de unificar nomes e dados de contato. Até essa confirmação, a atribuição das avaliações mantém o nome informado e o Instagram do site permanece o original.

O menu usa um diálogo nativo, com foco contido, fechamento por Escape e devolução de foco. Serviços usam `details` e `summary`, mantendo a expansão disponível sem JavaScript. Há navegação alternativa no celular sem JavaScript, foco visível, link para saltar ao conteúdo e compensação de âncoras para o cabeçalho.

A seção Sobre nós usa uma imagem fixa de polimento automotivo, fornecida pelo usuário a partir de [Protelim](https://protelim.com.br/wp-content/uploads/2024/04/image2-3.jpg) e armazenada em `public/images/about-fgcar.jpg`. Selecionar serviços ou cards de cuidados não altera essa imagem. Os serviços expandem seus detalhes; os cards selecionam e levam ao serviço correspondente. A navegação por teclado e os links continuam disponíveis.

Não foi configurado domínio fictício, canonical, sitemap ou metadata de avaliações. Nada foi publicado.
