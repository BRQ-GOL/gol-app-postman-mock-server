# GOL App Postman Mock Server

Este repositório centraliza os **mocks de API utilizados pelo aplicativo da GOL**, organizados de forma modular e versionados em Git.

O objetivo é permitir que **desenvolvedores e QAs consigam testar o aplicativo mesmo quando o backend estiver indisponível**, além de manter um **padrão único de mocks no time**.

Os mocks são mantidos em arquivos separados e automaticamente **compilados em uma Postman Collection** (`collection.json`) através de um script.

---

# Estrutura do projeto

```
├─ mocks
│  ├─ aquisition
│  │  └─ POST_seats-select.json
│  │
│  └─ channelConfig
│     └─ GET_airlines.json
│
├─ scripts
│  └─ build-collection.js
│
├─ collection.json
│
└─ .github
   └─ workflows
      └─ build-postman-collection.yml
```

### Explicação

**mocks/**
Contém todos os endpoints mockados organizados por domínio ou módulo da aplicação.

Cada arquivo representa **uma request mockada do Postman**.

**scripts/build-collection.js**
Script responsável por reconstruir automaticamente a collection do Postman a partir da estrutura de arquivos.

**collection.json**
Collection final que pode ser importada diretamente no Postman.

**GitHub Actions**
Pipeline que reconstrói automaticamente a collection sempre que mudanças são feitas na `main`.

---

# Como adicionar um novo mock

1. Criar um novo arquivo `.json` dentro da pasta correspondente em `mocks/`.

Exemplo:

```
mocks/aquisition/POST_seats-select.json
```

2. O arquivo deve conter a estrutura de request do Postman.

3. Commitar a alteração normalmente.

---

# Gerar a collection localmente

Para reconstruir a collection manualmente:

```
npm run build:collection
```

Isso irá gerar:

```
collection.json
```

---

# CI automático

Sempre que houver push na branch `main`, o pipeline do GitHub executa automaticamente:

1. Instala dependências
2. Executa o script de build
3. Atualiza `collection.json`
4. Commita o arquivo gerado no repositório

Isso garante que a collection sempre reflita a estrutura atual de mocks.

---

# Importando no Postman

No Postman:

```
Import → GitHub
```

Selecionar:

```
Organization
→ BRQ-GOL
→ gol-app-postman-mock-server
→ collection.json
```

Depois disso é possível sincronizar atualizações diretamente do repositório.

---

# Boas práticas

Recomendado:

* 1 endpoint por arquivo
* nomear arquivos com método HTTP

Exemplo:

```
GET_airlines.json
POST_seats-select.json
DELETE_booking.json
```

Evitar:

```
test.json
mock1.json
response.json
```

---

# Fluxo de uso no time

```
Dev/Qa cria mock
↓
Commit no repo
↓
Merge na main
↓
GitHub Action roda
↓
Collection reconstruída
↓
Postman sync
↓
Mock server atualizado
```
