# 🐝 HIVEN

<p align="center">
  <img src="hiven_banner.png" alt="Hiven Banner" width="100%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.5);" />
</p>

<p align="center">
  <a href="https://github.com/hiven-core/hiven">
    <img src="https://img.shields.io/badge/Compute-Zero--Cost-brightgreen?style=for-the-badge&logo=github&logoColor=white&labelColor=11111b" alt="Compute: Zero Cost" />
  </a>
  <a href="https://github.com/hiven-core/hiven">
    <img src="https://img.shields.io/badge/Architecture-K%C5%8Dmb-blueviolet?style=for-the-badge&logo=docker&logoColor=white&labelColor=11111b" alt="Architecture: Kōmb" />
  </a>
  <a href="https://github.com/hiven-core/hiven">
    <img src="https://img.shields.io/badge/LLM-Local%20%2F%20SLM-orange?style=for-the-badge&logo=cpu&logoColor=white&labelColor=11111b" alt="LLMs: SLM / GGUF" />
  </a>
</p>

<p align="center">
  <strong>Un asistente de software autónomo y multi-agente que transforma la infraestructura de CI/CD en un laboratorio neuronal descentralizado y gratuito.</strong>
</p>

---

## ⚡ Simulación de Ejecución del Enjambre (Swarm Flow)

*Haz clic en las barras inferiores para expandir la telemetría en tiempo real de los agentes operando en paralelo:*

<details open>
  <summary style="font-weight: bold; color: #f9e2af; cursor: pointer; padding: 10px; background-color: #1e1e2e; border-radius: 6px; margin-bottom: 5px; list-style: none; border: 1px solid #313244;">
    🔍 FASE 1: CONTEXTO (2 Nodos Kōmbees)
  </summary>
  <blockquote style="border-left: 4px solid #f9e2af; padding-left: 15px; margin-left: 10px; color: #a6adc8;">
    <p><strong>[Hiven-Reader]</strong> Leyendo estructura del repositorio y analizando dependencias del sistema... Done.<br>
    <strong>[Hiven-Architect]</strong> Formulando plan de refactorización detallado para inyectar métodos asíncronos...</p>
    <pre><code>⚙️ Plan:
1. Modificar math.js para añadir control de límites.
2. Crear suite de pruebas unitarias en math.test.js.</code></pre>
  </blockquote>
</details>

<details>
  <summary style="font-weight: bold; color: #a6e3a1; cursor: pointer; padding: 10px; background-color: #1e1e2e; border-radius: 6px; margin-bottom: 5px; list-style: none; border: 1px solid #313244;">
    💻 FASE 2: EJECUCIÓN COMPETITIVA (10 Nodos Kōmbees)
  </summary>
  <blockquote style="border-left: 4px solid #a6e3a1; padding-left: 15px; margin-left: 10px; color: #a6adc8;">
    <p>Generación paralela de código con variación de temperatura en Ollama (SLM: Qwen2.5-Coder:1.5b):</p>
    <ul>
      <li>Node 01 (Temp 0.1) -> <em>Código generado (Exitoso)</em></li>
      <li>Node 02 (Temp 0.3) -> <em>Código generado (Exitoso)</em></li>
      <li>Node 03 (Temp 0.5) -> <em>Código generado (Advertencia de sintaxis)</em></li>
      <li>... [7 nodos ejecutando en paralelo en GitHub Actions Matrix]</li>
    </ul>
  </blockquote>
</details>

<details>
  <summary style="font-weight: bold; color: #89b4fa; cursor: pointer; padding: 10px; background-color: #1e1e2e; border-radius: 6px; margin-bottom: 5px; list-style: none; border: 1px solid #313244;">
    🛡️ FASE 3: VALIDACIÓN Y CORRECCIÓN (6 Nodos Kōmbees)
  </summary>
  <blockquote style="border-left: 4px solid #89b4fa; padding-left: 15px; margin-left: 10px; color: #a6adc8;">
    <p><strong>[Hiven-Tester]</strong> Ejecutando suite de pruebas unitarias en máquina virtual...<br>
    ❌ <em>Fallo en test: Caso factorial(-5) no lanza excepción.</em><br>
    <strong>[Hiven-Reviewer]</strong> Enviando traza de error de compilación de regreso a Coder para autocorrección...<br>
    🔄 <em>Ciclo de corrección 1... Pruebas pasadas con éxito! [100% OK]</em></p>
  </blockquote>
</details>

<details>
  <summary style="font-weight: bold; color: #fab387; cursor: pointer; padding: 10px; background-color: #1e1e2e; border-radius: 6px; margin-bottom: 5px; list-style: none; border: 1px solid #313244;">
    🚀 FASE 4: CONSOLIDACIÓN Y TELEMETRÍA (2 Nodos Kōmbees)
  </summary>
  <blockquote style="border-left: 4px solid #fab387; padding-left: 15px; margin-left: 10px; color: #a6adc8;">
    <p><strong>[Hiven-Committer]</strong> Fusionando cambios en la rama <code>hiven/patch-a8f1</code>.<br>
    <strong>[Hiven-Uplink]</strong> Creando Pull Request en el repositorio origen del usuario.<br>
    <strong>[Hiven-Uplink]</strong> Enviando reporte de telemetría anonimizado al Drone de balanceo... Done.</p>
  </blockquote>
</details>

---

## 🏗️ Topología del Ecosistema (Kōmb Architecture)

```mermaid
graph TD
    %% Queen Definition
    Queen[👑 Hiven Queen - Central Routing Ledger]
    
    %% Drone Definition
    subgraph Drones [🛰️ Drones de Telemetría e Hilos de Actualización]
        Drone1[Drone 01 - Usuarios 1 a 1000]
        Drone2[Drone 02 - Usuarios 1001 a 2000]
    end
    
    %% Worker Definition
    subgraph Workers [👤 Repositorios Ejecutores de los Usuarios]
        direction LR
        Worker1[🐜 Worker A - Stealth Mode]
        Worker2[🐜 Worker B - Overdrive Mode]
    end

    %% Flow Relationships
    Queen -. Provisionamiento .-> Drones
    Drone1 -->|CDN Releases - Pull Update| Worker1
    Drone2 -->|CDN Releases - Pull Update| Worker2
    
    Worker1 -->|Métricas de Rendimiento Cifradas| Drone1
    Worker2 -->|Métricas de Rendimiento Cifradas| Drone2
    
    Drone1 -. Registros Consolidados .-> Queen
    Drone2 -. Registros Consolidados .-> Queen

    style Queen fill:#1e1e2e,stroke:#f9e2af,stroke-width:2px,color:#cdd6f4
    style Drone1 fill:#313244,stroke:#a6e3a1,stroke-width:1px,color:#cdd6f4
    style Drone2 fill:#313244,stroke:#a6e3a1,stroke-width:1px,color:#cdd6f4
    style Worker1 fill:#11111b,stroke:#fab387,stroke-width:1px,color:#cdd6f4
    style Worker2 fill:#11111b,stroke:#fab387,stroke-width:1px,color:#cdd6f4
```

---

## 🥷 Modos de Operación: Privacidad vs Cómputo Ilimitado

Controla las cuotas del enjambre según los requerimientos de tu proyecto:

```
        MODO STEALTH (Privado)                  MODO OVERDRIVE (Público)
  ┌─────────────────────────────────┐     ┌─────────────────────────────────┐
  │  • Repositorio .worker privado  │     │  • Repositorio .worker público  │
  │  • Consumo de minutos gratis    │     │  • Minutos de Actions INFINITOS │
  │  • 2,000 mins/mes por usuario   │     │  • Cómputo ilimitado a coste $0 │
  │  • Máxima privacidad de código  │     │  • honey.db compartida          │
  └─────────────────────────────────┘     └─────────────────────────────────┘
```

---

## 🧠 Optimización de Memoria (honey.db)

El Worker mantiene una caché ligera cifrada llamada `honey.db` para retener directivas estilísticas y firmas de errores históricos.
* **Privacidad Perimetral:** El código fuente jamás se guarda en la base de datos.
* **Anti-Envenenamiento (Anti-Poisoning):** Sanitización activa para evitar inyección de directivas condicionales maliciosas.

---

## 🚀 Integración e Instalación en 3 Pasos

```bash
# 1. Instala el CLI de Hiven
npm install -g hiven-cli

# 2. Registra tu cuenta y vincula el token
hiven auth login

# 3. Despierta el enjambre en cualquier repositorio
hiven run "Añade un middleware de JWT en express"
```

*También puedes invocar al enjambre directamente en GitHub comentando en cualquier Issue o Pull Request:* `/hiven refactor: optimiza la consulta SQL`.
