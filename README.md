# 🌱 Bloom-Tech — Vasos Inteligentes

> Monitoramento inteligente de plantas com sensores IoT, dashboards em tempo real e cuidado automatizado.

Bloom-Tech é uma aplicação full-stack que conecta vasos instrumentados com sensores de temperatura, umidade e solo a um painel web. O usuário cadastra seus vasos, vincula plantas e acompanha as leituras dos sensores em gráficos dinâmicos, tudo em um único sistema.

---

## Funcionalidades

- Autenticação completa (login, cadastro, recuperação de senha por e-mail)
- Dashboard com gráficos de temperatura e umidade em tempo real
- Cadastro e vinculação de vasos a plantas
- Gerenciamento de sensores e placas controladoras (ESP-32)
- API REST para ingestão de leituras vindas de hardware IoT
- Tema claro/escuro
- Perfil de usuário com edição de dados e troca de senha

---

## Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Frontend** | Next.js 15, React, Tailwind CSS 4, shadcn/ui, Recharts, Motion |
| **Backend** | Next.js API Routes, NextAuth.js 4 (JWT) |
| **Banco de dados** | SQLite via Prisma ORM |
| **E-mail** | Nodemailer + Gmail SMTP |
| **Validação** | Zod, React Hook Form |
| **Hardware IoT** | ESP-32, DHT11 (temperatura/umidade), FC-28 (solo) |

---

## Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- Conta **Gmail** com [App Password](https://myaccount.google.com/apppasswords) habilitada (necessário para recuperação de senha)

---

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/Bloom-Tech.git
cd Bloom-Tech
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Banco de dados SQLite (caminho relativo ao diretório prisma/)
DATABASE_URL="file:./dev.db"

# NextAuth — chave secreta para assinar os tokens JWT
# Gere uma string aleatória segura: openssl rand -base64 32
NEXTAUTH_SECRET="sua-chave-secreta-aqui"

# URL base da aplicação (mude para sua URL em produção)
NEXTAUTH_URL="http://localhost:3000"

# Gmail para envio de e-mails de recuperação de senha
EMAIL_GOOGLE="seuemail@gmail.com"
PASS_GOOGLE="sua-app-password-do-google"
```

> **Como obter o App Password do Google:**
> 1. Acesse [myaccount.google.com/security](https://myaccount.google.com/security)
> 2. Ative a Verificação em duas etapas
> 3. Vá em **Senhas de app**, crie uma senha para "Outro (nome personalizado)"
> 4. Use a senha de 16 caracteres gerada no campo `PASS_GOOGLE`

### 4. Configure o banco de dados

```bash
# Aplica as migrações e cria o arquivo dev.db
npx prisma migrate dev

# Popula o banco com dados iniciais (famílias e plantas)
npx prisma db seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor em modo produção (requer build) |
| `npm run lint` | Executa o ESLint |

---

## Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `DATABASE_URL` | Caminho para o arquivo SQLite | Sim |
| `NEXTAUTH_SECRET` | Chave secreta para assinar tokens JWT | Sim |
| `NEXTAUTH_URL` | URL base da aplicação | Sim |
| `EMAIL_GOOGLE` | E-mail Gmail usado para envio de mensagens | Sim |
| `PASS_GOOGLE` | App Password do Gmail | Sim |

---

## Estrutura de Pastas

```
Bloom-Tech/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes (backend)
│   │   │   ├── auth/         # Autenticação e reset de senha
│   │   │   ├── users/        # CRUD de usuários
│   │   │   ├── plants/       # Plantas disponíveis
│   │   │   ├── vasos/        # Vasos do usuário
│   │   │   ├── sensor/       # Sensores cadastrados
│   │   │   ├── leituras/     # Ingestão de leituras IoT
│   │   │   └── userPlant/    # Plantios ativos do usuário
│   │   └── pages/            # Páginas da aplicação
│   │       ├── page.tsx      # Landing page
│   │       ├── login/
│   │       ├── register/
│   │       ├── dashbord/     # Dashboard principal
│   │       ├── profile/
│   │       ├── conected/     # Dispositivos conectados
│   │       └── blog/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Charts/           # Gráficos (área, barra, linha)
│   │   ├── Modal/            # Modais de cadastro
│   │   └── ui/               # Componentes base (shadcn/ui)
│   └── lib/
│       ├── auth.ts           # Configuração NextAuth
│       ├── prisma.ts         # Cliente Prisma singleton
│       └── mailer.ts         # Configuração Nodemailer
├── prisma/
│   ├── schema.prisma         # Schema do banco de dados
│   ├── seed.ts               # Script de seed
│   └── migrations/           # Histórico de migrações
└── public/                   # Assets estáticos (imagens de plantas, sensores)
```

---

## API — Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/[...nextauth]` | Login / logout via NextAuth |
| `POST` | `/api/auth/reset-request` | Solicita reset de senha por e-mail |
| `POST` | `/api/auth/reset-password` | Confirma novo password com token |
| `GET/POST` | `/api/users` | Busca ou cria usuário |
| `PUT` | `/api/users` | Atualiza perfil do usuário |
| `GET/POST` | `/api/plants` | Lista ou cadastra plantas |
| `GET/POST` | `/api/vasos` | Lista ou cria vasos |
| `GET` | `/api/vasos/check` | Verifica status de um vaso |
| `GET/POST` | `/api/sensor` | Lista ou registra sensores |
| `POST` | `/api/leituras` | Recebe leitura de sensor (temperatura, umidade) |
| `GET` | `/api/userPlant` | Retorna plantios ativos do usuário |

### Integração IoT — Enviando leituras

O hardware (ESP-32) deve fazer um `POST` para `/api/leituras` com o seguinte payload:

```json
{
  "idSensorVaso": 1,
  "umidade": 65.4,
  "temperatura": 23.1,
  "status": "ok"
}
```

---

## Banco de Dados — Modelos Principais

```
Usuario ──< Vaso ──< SensorVaso ──< Leituras
                 ──< Plantio ──── Planta ──── FamiliaPlanta
                 ──< PlacaVaso ── Placa

Sensor ──────────── SensorVaso
TipoSensor ─────── Sensor
```

**Dados pré-carregados pelo seed:**
- 7 famílias botânicas (Apiaceae, Solanaceae, Fabaceae…)
- 9 plantas com requisitos de cultivo (Coentro, Tomate, Feijão, Alecrim…)

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request

---

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
