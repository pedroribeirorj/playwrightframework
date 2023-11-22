# Uma implementação baseada em Playwright Framework

[![licence mit](https://img.shields.io/badge/licence-MIT-blue.svg)](./LICENSE)

Este é um framework baseado em playwright.js, tendo como objetivo facilitar a construção de scripts automatizados para projetos web ou api.

<p align="center">
   <img src="https://miro.medium.com/v2/resize:fit:646/1*gMiUPuRGC36nxZHe2zthOg.png" />
</p>

# Estrutura Geral
<p align="center">
   <img src="https://github.com/pedroribeirorj/playwrightframework/blob/main/doc/estrutura_basica.png" />
</p>

# Estrutura das classes de teste
<p align="center">
   <img src="https://github.com/pedroribeirorj/playwrightframework/blob/main/doc/classe_de_teste.png" />
</p>

# Estrutura das classes do tipo página
<p align="center">
   <img src="https://github.com/pedroribeirorj/playwrightframework/blob/main/doc/pages.png" />
</p>

# Estrutura das classes dsl.js
<p align="center">
   <img src="https://github.com/pedroribeirorj/playwrightframework/blob/main/doc/dsl.png" />
</p>

# FAQ/Perguntas Frequentes

## Preciso ter conhecimento básico de alguma tecnologia específica?
> **R:** Conhecimentos básicos de Javascript.js serão importantes para uma melhor compreensão do framework. Já a nível de Playwright.js,
> a ferramenta contém uma documentação muito bem descrita, que poderá auxiliar nos primeiros passos.

## Quais são as dependências do projeto?
> **R:** As dependências estão no arquivo package.json, na raiz do projeto. Entre elas estão o playwright.js (v1.33) e csv-parse (v5.5.2)

## Existe algum link para as documentações de apoio?
> **R:** Playwright.js: https://playwright.dev/docs/intro  
> CSV-Parse.js: https://csv.js.org/project/examples/

## Como posso criar meu primeiro caso de teste?
> **R:** O projeto contém um exemplo de uso (imovirtual.spec.js). Nele você poderá observar toda a implementação de um caso de teste, assim como a sua relação> com as páginas acessadas, onde estão os locators e steps, que por sua vez se comunicam com a dsl.js (responsável pelas ações em playwright).

## Como gero evidências/report da execução?


## Como faço para alterar as colunas da planilha e refletir tais mudanças no código?

## Como posso executar os casos de teste?
> **R:** O framework utiliza as execuções nativas do Playwright. Entre elas, temos:
> - [X] Executar todas as suítes de teste - npx playwright test
> - [X] Executar uma única suíte de teste - npx playwright test [teste].spec.js
> - [X] Executar em um browser específico - npx playwright test --project webkit

> Para mais tipos de execuções, consulte a documentação: https://playwright.dev/docs/running-tests

# About the Project/Sobre o Projeto

## Contributing/Contribuir

### O que devo ter em mente antes de abrir um PullRequest?
- Esse é um projeto opensource e contribuições são bem vindas.
- Para aumentar a chance de a sua contribuição ser aprovada, escolha um título legal, simples e explicativo para os itens, e siga a formatação correta dos arquivos.

### Próximos Passos?

- [X] Faça o clone do projeto, execute o teste imovirtual.spec.js em modo debug, para avaliar com cuidado cada ação do código. Isto facilitará a absorção do conhecimento 

## License/Licença do Projeto

- [MIT](./LICENSE)

## Agradecimentos
> Pedro Ribeiro e Nickson Chagas