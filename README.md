# BRL Exchange Rate

Uma aplicação web em Angular para consultar a cotação de qualquer moeda estrangeira em relação ao Real (BRL). O app consome uma API pública, exibe a cotação atual e mostra um histórico visual dos últimos 30 dias com variação percentual dia a dia.

## Principais funcionalidades
- Busca por código de moeda (ex.: USD, EUR, GBP) e cálculo do par `MOEDA/BRL`.
- Exibição da cotação atual com data/hora da última atualização.
- Histórico dos últimos 30 dias com valores de abertura, máxima, mínima, fechamento e variação percentual diária.
- Limpeza rápida do formulário ao clicar no logo para começar uma nova consulta.

## Stack
- Angular 19 (componentes standalone + roteamento).
- Tailwind CSS 4 para estilização (`src/styles.scss`).
- HttpClient + RxJS para integrações com a API.

## Pré-requisitos
- Node.js 20+ e npm instalados.
- Não é necessário Angular CLI global; os scripts do `package.json` já usam a CLI local.

## Configuração da API
O app utiliza `apiBaseUrl` e `apiKey` definidos em `src/environments/environment.ts`.

Se quiser usar outra chave/endpoint, ajuste esse arquivo antes de rodar o projeto.

## Como instalar e rodar localmente
1. Instale dependências:
   ```bash
   npm install
   ```
2. Suba o servidor de desenvolvimento (porta padrão 4200):
   ```bash
   npm start
   ```
3. Abra http://localhost:4200/ no navegador (há redirecionamento automático para `/exchange-brl`).
4. Digite o código da moeda e clique em “EXCHANGE RESULT”. A cotação atual e o histórico serão carregados.

## Build para produção
Gera artefatos otimizados em `dist/brl-exchange-rate/`:
```bash
npm run build
```

## Estrutura essencial
- `src/app/exchange-brl/` – página principal e componentes (formulário, header/footer, resultado atual, histórico).
- `src/service/api.ts` – serviço que chama a API de câmbio com `HttpClient`.
- `src/models/brl-exchange.models.ts` – tipos usados nas respostas e view models.
- `src/environments/environment.ts` – configuração do endpoint e chave da API.

## Scripts disponíveis
- `npm start` – servidor de desenvolvimento.
- `npm run build` – build de produção.