<p align="center">
  <img src="./assets/hiven_logo_v2.png" alt="Hiven Logo" width="150" style="border-radius: 12px; box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);" />
</p>

<h1 align="center">HIVEN</h1>

<p align="center">
  <strong>Agente Cognitivo Autónomo, Mente Enjambre Multi-Agente & Memoria Colectiva Honeycombs a Coste $0</strong>
</p>

<p align="center">
  <a href="https://amglogicalis.github.io/hiven-repo-public/"><img src="https://img.shields.io/badge/Console-Online%20Web%20Studio-d7ed04?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Console" /></a>
  <a href="https://www.npmjs.com/package/terra-hiven"><img src="https://img.shields.io/badge/npm-terra--hiven-d7ed04?style=for-the-badge&logo=npm&logoColor=black" alt="npm package" /></a>
  <img src="https://img.shields.io/badge/Version-3.0.0-d7ed04?style=for-the-badge" alt="Version 3.0.0" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License MIT" />
  <img src="https://img.shields.io/badge/Architecture-100%25%20Serverless%20$0-blueviolet?style=for-the-badge" alt="Cost $0" />
</p>

<p align="center">
  <a href="#-visión-general-y-arquitectura-0">Visión General</a> •
  <a href="#-instalación-y-puesta-en-marcha">Instalación</a> •
  <a href="#-pipeline-multi-fase-y-robustez-al-99">Pipeline & Robustez</a> •
  <a href="#-hiven-honeycombs-memoria-global">Hiven Honeycombs</a> •
  <a href="#-referencia-del-cli-y-sdk">CLI & SDK</a> •
  <a href="#-preguntas-frecuentes-faq">FAQ</a>
</p>

---

## 🌟 Visión General y Arquitectura $0

**HIVEN** es el primer titán cognitivo del ecosistema **Terra**. Transforma la potencia de cómputo gratuita de los runners de GitHub Actions en un laboratorio de desarrollo neuronal distribuido, capaz de analizar bases de código complejas, diseñar arquitecturas, escribir código mediante diffs quirúrgicos y auto-sanar errores en un sandbox aislado previo a la creación de Pull Requests:

```
                                  🐝 HIVEN ENGINE V3
                         (Autonomous Multi-Agent Swarm)
                                         │
    ┌────────────────────┬───────────────┴───────────────┬────────────────────┐
    ▼                    ▼                               ▼                    ▼
🖥️ HIVEN STUDIO    💻 CLI & SDK (terra-hiven)      🤖 ISSUE BOT GATEWAY  🍯 HIVEN HONEYCOMBS
(Web SPA Pages $0)  (Hiven Swarm API)               (Menciones @hiven)    (Memoria Global K/V)
    │                    │                               │                    │
    └────────────────────┼───────────────────────────────┴────────────────────┘
                         ▼
             ⚡ WORKER SWARM (GitHub Actions)
       [Phase 0] ➔ [Phase 1] ➔ [Phase 2] ➔ [Phase 3] ➔ [🩹 Self-Heal 3-5x] ➔ [🚀 PR]
```

### Principios Fundamentales:
* **🔒 100% Privado y Soberano:** Todo el código se procesa en runners efímeros bajo la cuenta de GitHub del usuario.
* **🍯 Memoria Colectiva Honeycombs:** Subsistema K/V nativo a coste \$0 que acumula patrones (`hive_patterns:{ext}`) de buenas prácticas aprendidas.
* **🩹 Garantía de Robustez del 99%:** Incorpora bucle de auto-corrección (Self-Healing Loop) reinyectando trazas de error de tests hasta lograr compilación limpia (`exit 0`).

---

## 📦 Instalación y Puesta en Marcha

### 1. Instalación Global del CLI:
```bash
# Con NPM:
npm install -g terra-hiven

# Con PNPM:
pnpm add -g terra-hiven

# Con Yarn:
yarn global add terra-hiven
```

### 2. Ejecución Instantánea sin Instalación previa con `npx`:
```bash
# Iniciar la Consola Web local:
npx terra-hiven console

# Despachar una misión:
npx terra-hiven run --repo usuario/mi-app --prompt "Implementar login OAuth"
```

### 3. Instalación como Dependencia en tu Proyecto (SDK):
```bash
npm install terra-hiven
```

### 4. Levantar la Consola Web Local (Hiven Studio):
```bash
# Puerto por defecto (7460):
hiven console

# En un puerto y host personalizado:
hiven console --port 8080 --host 0.0.0.0
```

---

## 🧪 Pipeline Multi-Fase y Robustez al 99%

El enjambre de Hiven ejecuta un ciclo estricto y determinista:

1. **Fase 0 (Deterministic Extractor):** Extrae dependencias, scripts de test y firmas AST sin alucinaciones de LLM.
2. **Fase 1 (Swarm Architect):** Descompone la misión en un grafo acíclico de tareas (Task DAG) y selecciona patrones de Honeycombs.
3. **Fase 2 (Parallel Coders):** Nodos Kōmbee concurrentes escriben código aplicando bloques de búsqueda y reemplazo (`SEARCH/REPLACE`) quirúrgicos para evitar truncamiento de archivos.
4. **Fase 3 (Shadow Sandbox):** Ejecuta la suite de pruebas unitarias (`npm test`, `pytest`, `cargo test`) en un contenedor aislado.
5. **🩹 Bucle de Auto-Sanación (Self-Healing Loop):** Si los tests fallan, Hiven reinyecta los stack traces a un sub-enjambre de corrección (hasta 3-5 intentos) hasta que la suite pase en verde.
6. **Fase 4 (Consolidator):** Consolida los cambios ganadores y publica la Pull Request en GitHub.

---

## 🍯 Hiven Honeycombs: Memoria Global Colectiva

**Honeycombs** es el subsistema de almacenamiento K/V nativo de Hiven que sustituye cualquier servicio SaaS externo. Almacena:
* **Patrones Federados (`hive_patterns:{ext}`):** Convenciones, librerías óptimas y directivas *Do's & Don'ts*.
* **Historial & Telemetría:** Tiempos de ejecución, rondas de auto-sanación y enlaces de PRs en `.hiven-storage`.

---

## 💻 Referencia del CLI y SDK

### Uso Programático con TypeScript / ES Modules:
```typescript
import { Hiven } from 'terra-hiven';

const hiven = new Hiven({
  githubToken: process.env.GITHUB_TOKEN
});

await hiven.init();

// Despachar una misión autónoma
const result = await hiven.dispatchSwarm({
  repo: 'mi-organizacion/mi-app',
  instruction: 'Añadir endpoints de autenticación y tests unitarios',
  workerCount: 6,
  testCommand: 'npm test',
  maxSelfHealingRetries: 3
});

console.log(`Swarm despachado con éxito: ${result.swarmId}`);
console.log(`Pull Request: ${result.pullRequestUrl}`);
```

## ⚙️ Referencia Completa de Parámetros del Despachador

Tanto en la Consola Web como en el CLI (`hiven run`), puedes configurar los siguientes parámetros:

| Parámetro CLI | Control Consola | Tipo / Rango | Por Defecto | Descripción & Mejores Prácticas |
| :--- | :--- | :--- | :--- | :--- |
| `--repo` | Repositorio Objetivo | `owner/repo` | *Requerido* | Repositorio de GitHub destino. Requiere permisos de `repo` y `workflow`. |
| `--prompt` | Instrucción / Misión | Texto libre | *Requerido* | Especificación detallada de la tarea. Debe incluir archivos, entradas, salidas y restricciones. |
| `--branch` | Rama de Trabajo | String | `hiven/patch-[id]` | Rama donde se subirá el commit. Si se omite, se genera con timestamp. |
| `--baseBranch` | Rama Base | String | `main` | Rama destino contra la cual se abrirá la Pull Request. |
| `--workers` | Kōmbees Concurrentes | 1 – 10 | `4` | Nodos en paralelo. **2** para utilidades simples, **4** para features estándar, **6-10** para refactors masivos. |
| `--test-cmd` | Comando de Test | String | *Opcional* | Comando que el Shadow Sandbox ejecuta para verificar cambios (ej. `npm test`). **Es la brújula del Self-Healing**. |
| `--retries` | Reintentos Self-Healing | 1, 3, 5 | `3` | Rondas máximas de auto-corrección ante fallos de tests. **3** es el balance óptimo para alcanzar el 99% de éxito. |
| `--dry-run` | Modo de Ejecución | Boolean | `false` | Si se activa, simula la descomposición y valida diffs en local sin tocar GitHub. |

---

## 🎯 Manual de Buen Prompting para Enjambres

Hiven no es un chatbot conversacional; es un enjambre de síntesis determinista. **Los agentes prosperan cuando les proporcionas criterios de éxito verificables, no intenciones difusas.**

### La Fórmula en 4 Pasos:
1. **Ubicación & Módulo Objetivo:** Especifica el archivo o directorio a crear o editar (ej. `src/utils/math.ts`).
2. **Contrato de la Interfaz:** Nombres de funciones, parámetros, tipos esperados y estructura del retorno.
3. **Casos Límite & Restricciones:** Manejo de excepciones, timeouts, nulos o compatibilidad ESM.
4. **Criterio de Verificación:** Comando de test unitario o aserciones que deben validarse en el Shadow Sandbox.

### Ejemplos Comparativos:

#### ❌ Mal Prompt (Vago & Ambiguo)
```text
Crea un validador de emails y ponle pruebas.
```
> *Problema:* No define archivo, estándar regex, si lanza error o retorna boolean, ni casos edge.

#### ✅ Buen Prompt (Específico & Determinista)
```text
Crear en src/validators/email.js la función isWorkEmail(email).
- Debe validar formato RFC 5322 y rechazar dominios gratuitos (gmail, yahoo, hotmail).
- Retornar { valid: boolean, domain: string, reason?: string }.
- Si el input no es string, lanzar TypeError.
- Exportar en ESM y crear suite de tests con al menos 6 casos límite.
```

---

## 🔌 Hiven Swarm REST API (Compatibilidad con Sphexn)

Al ejecutar `hiven console` o `hiven serve`, se inicia un servidor HTTP con endpoints REST estándar en `http://localhost:7460`:

* **`POST /api/v1/swarm/dispatch`**: Despacha un enjambre autónomo.
  ```json
  {
    "repo": "amglogicalis/mi-app",
    "instruction": "Implementar módulo de pagos con Stripe",
    "workers": 4,
    "testCommand": "npm test",
    "retries": 3
  }
  ```
* **`GET /api/v1/swarm/:id`**: Consulta en tiempo real el estado, logs de actividad y URL de la Pull Request.
* **`GET /api/v1/honeycombs/patterns?lang=ts`**: Recupera las directivas heurísticas Do's & Don'ts aprendidas.
* **`POST /api/v1/honeycombs/patterns`**: Alimenta la memoria colectiva con nuevos patrones validados.
* **`GET /api/v1/health`**: Estado operativo del motor Hiven y Honeycombs.

---

## ❓ Preguntas Frecuentes (FAQ)

<details>
<summary><strong>Q: ¿Cómo invoco a Hiven directamente en mis Issues de GitHub?</strong></summary>
<p>
Puedes instalar la GitHub App de Hiven en tu repositorio y simplemente comentar <code>@hiven /fix corrige el error de validación en auth.ts</code>. Hiven despertará automáticamente un runner efímero y abrirá una PR resolviendo el issue.
</p>
</details>

<details>
<summary><strong>Q: ¿Requiere una cuenta o suscripción externa?</strong></summary>
<p>
No. Hiven está construido bajo la estricta filosofía de <strong>Coste Marginal Cero ($0)</strong> de Terra. Todo el cómputo y persistencia se ejecutan en tu propia infraestructura gratuita de GitHub.
</p>
</details>

---

<p align="center">
  <strong>HIVEN — Terra Ecosystem</strong><br>
  Mente Enjambre & Agente Cognitivo Autónomo a Coste $0.<br>
  <a href="https://amglogicalis.github.io/hiven-repo-public/">🌐 Abrir Consola Web Online</a> • <a href="https://github.com/amglogicalis/hiven-repo-public">Repositorio Público en GitHub</a>
</p>
