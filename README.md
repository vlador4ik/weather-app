# Weather app

npm workspace-монорепозиторій: React + Vite + TypeScript у
`apps/client`, Node.js + TypeScript у `apps/server`.
Середовище: Node.js 24.16.0 та npm 11.13.0.

## Встановлення і запуск

Усі наступні команди виконуються з кореня. Після клонування:

```bash
npm ci
```

Запуск у двох терміналах:

```bash
npm run dev:client
```

```bash
npm run dev:server
```

Адреса frontend виводиться Vite (зазвичай http://localhost:5173).
Backend слухає http://127.0.0.1:3000. Перевірка:

```bash
curl http://127.0.0.1:3000/api/health
```

Очікувана відповідь: `{"status":"ok"}`. Невідомі маршрути повертають 404.

## Перевірки та збірка

```bash
npm run typecheck
npm run lint
npm run build
npm run start:server
```

- `typecheck` перевіряє обидва застосунки через `tsc --noEmit`.
- `lint` запускає Oxlint для client; це окрема перевірка від перевірки типів.
- `build` спочатку перевіряє та збирає client у `apps/client/dist`, потім
  компілює server у `apps/server/dist`. Workspaces виконуються послідовно.
- `start:server` запускає вже зібраний `apps/server/dist/index.js`.
- Окремі збірки: `npm run build:client` і `npm run build:server`.

Конфігурації навмисно розділені за середовищами:

- Client: `moduleResolution: Bundler`, `jsx: react-jsx`, типи DOM,
  `noEmit: true`. JavaScript для браузера генерує Vite.
- Server: `module: NodeNext`, `moduleResolution: NodeNext`, типи Node.js,
  `rootDir: src`, `outDir: dist`, `noEmitOnError: true`.
- Усюди увімкнено `strict: true`.

У server під час розробки використовується `node --watch src/index.ts`.
Node.js 24 підтримує видалення типів без стороннього runner, але ігнорує
`tsconfig.json`. Тому `erasableSyntaxOnly: true` забороняє синтаксис, який
потребує додаткової трансформації (наприклад, enum).
