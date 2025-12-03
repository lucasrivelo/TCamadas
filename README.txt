T2 - Implementação em Camadas
202426610029 - Adriana de Oliveira Lopes
202426610020 - Lucas Rivelo Campos Almeida

# Implementação em Camadas
## Sistema de Agendamento

### Inicialização do Ambiente
Após clonar o diretório do projeto utilizar o seguinte comando no terminal:

``` bash
# Instala TypeScript, tsx (para rodar TS diretamente) e tipos do Node como devDependencies
npm install typescript tsx @types/node --save-dev
```

### Configurações do banco de dados
É necessário ajustar os seguintes componentes no arquivo `.env` de acordo com o que foi configurado na máquina: 
`usuario`, `senha`, `localhost`, `5432` e `nome_do_banco`

```
"DATABASE_URL="postgresql://postgres:123@localhost:5432/postgresql?schema=public"
```

É necessário realizar a migração inicial e criar a tabela no banco de dados, e assim fazer a conexão com o prisma.

No terminal execute:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### CLI
A CLI possuí os comandos de adicionar e listas compromissos. Assim é feita a execução:

```bash
# Adicionar novo compromisso
# Formato: npx tsx src/cli.ts adicionar compromisso "DD/MM/AAAA" "HH:MM" "HH:MM" "Nome_do_Compromisso"
# Exemplo: npx tsx src/cli.ts adicionar compromisso "12/12/2025" "19:00" "22:00" "Prova de POO" 

# Listar compromissos
npx tsx src/cli.ts listar_compromissos
```

### Adaptador Web
Para iniciar o servidor, use o comando:

```bash
npx tsx web/server.ts
# O servidor estará rodando em http://localhost:3000
```
Abra o Git Bash e execute os comandos como o exemplo abaixo:
```bash
$ curl -X POST http://localhost:3000/compromissos \
  -H "Content-Type: application/json" \
  -d '{"data":"05/12/2025", "hora_inicio":"14:00", "hora_fim":"14:30", "descricao":"Consulta"}'

$ curl http://localhost:3000/compromissos
```
