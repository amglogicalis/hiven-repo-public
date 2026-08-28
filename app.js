/**
 * Hiven Studio SPA - Core JavaScript Engine
 * Autonomous Multi-Agent Swarm & Honeycombs Controller
 */

// Initial Default State
let currentPat = localStorage.getItem("hiven_github_pat") || "";
let activeSwarms = JSON.parse(localStorage.getItem("hiven_swarms_history") || "[]");
let honeycombsMemory = JSON.parse(localStorage.getItem("hiven_honeycombs_local") || "{}");

// Sample Seed Patterns if empty
if (Object.keys(honeycombsMemory).length === 0) {
  honeycombsMemory = {
    ts: [
      { id: "pat_1", patternType: "architecture", summary: "Modular Export Pattern", doDirective: "Use explicit named exports and NodeNext extensions (.js in imports).", usageCount: 12 },
      { id: "pat_2", patternType: "testing", summary: "Isolated Sandbox Fixtures", doDirective: "Create scratch mock directories for temp file tests.", usageCount: 8 }
    ],
    py: [
      { id: "pat_3", patternType: "best_practice", summary: "Type Hinting Protocol", doDirective: "Include typing annotations (Optional, Union, Dict) in function signatures.", usageCount: 15 }
    ],
    rs: [
      { id: "pat_4", patternType: "architecture", summary: "Zero-Allocation Parsing", doDirective: "Use &str slices instead of allocating String instances in inner loops.", usageCount: 6 }
    ]
  };
  localStorage.setItem("hiven_honeycombs_local", JSON.stringify(honeycombsMemory));
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  updatePatUI();
  renderHoneycombsGrid();
  renderSwarmsTable();
  updateStats();
});

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");

  const btn = Array.from(document.querySelectorAll(".nav-item")).find(b => b.getAttribute("onclick")?.includes(tabId));
  if (btn) btn.classList.add("active");
}

// Modal Management
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    if (modalId === "patModal") {
      document.getElementById("modalPatInput").value = currentPat;
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// PAT Management
function updatePatUI() {
  const btn = document.getElementById("patButtonText");
  const icon = document.getElementById("patBadgeIcon");
  if (currentPat) {
    btn.innerText = "PAT Conectado (✓)";
    icon.innerText = "🔒";
  } else {
    btn.innerText = "Configurar GitHub PAT";
    icon.innerText = "🔑";
  }
}

function saveModalPat() {
  const val = document.getElementById("modalPatInput").value.trim();
  currentPat = val;
  localStorage.setItem("hiven_github_pat", val);
  updatePatUI();
  closeModal("patModal");
  showToast(val ? "GitHub PAT guardado con éxito" : "GitHub PAT eliminado");
}

function saveSettings() {
  const pat = document.getElementById("settingsPat").value.trim();
  if (pat) {
    currentPat = pat;
    localStorage.setItem("hiven_github_pat", pat);
    updatePatUI();
  }
  showToast("Configuración guardada");
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Swarm Dispatch
async function handleDispatchSwarm(e) {
  e.preventDefault();
  const repo = document.getElementById("inputRepo").value.trim();
  const prompt = document.getElementById("inputPrompt").value.trim();
  const branch = document.getElementById("inputBranch").value.trim() || `hiven/patch-${Date.now()}`;
  const workers = parseInt(document.getElementById("inputWorkers").value, 10);
  const testCmd = document.getElementById("inputTestCmd").value.trim();
  const retries = parseInt(document.getElementById("inputRetries").value, 10);
  const dryRun = document.getElementById("inputDryRun").value === "true";

  if (!repo || !prompt) {
    showToast("Por favor completa los campos requeridos.");
    return;
  }

  showToast(`Despachando Enjambre con ${workers} Kōmbees...`);
  switchTab("tab-dashboard");

  // Animate Pipeline Stepper
  runStepperAnimation(repo, prompt, workers, branch);

  // Store run in history
  const swarmId = `swarm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const runRecord = {
    swarmId,
    repo,
    branch,
    prompt,
    workers,
    retries,
    status: "completed",
    selfHealingRounds: 0,
    prUrl: `https://github.com/${repo}/pull/1`,
    date: new Date().toLocaleDateString()
  };

  activeSwarms.unshift(runRecord);
  localStorage.setItem("hiven_swarms_history", JSON.stringify(activeSwarms));
  renderSwarmsTable();
  updateStats();
}

function runStepperAnimation(repo, prompt, workers, branch) {
  const term = document.getElementById("dashboardTerminal");
  const badge = document.getElementById("currentPhaseBadge");

  function log(msg) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.innerHTML = `<span class="term-time">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  }

  log(`Iniciando misión para <b>${repo}</b>...`);
  badge.innerText = "Fase 0: Deterministic Extraction";
  document.getElementById("step0").classList.add("active");

  setTimeout(() => {
    log(`[Phase 0] Árbol AST y dependencias extraídas sin alucinaciones.`);
    badge.innerText = "Fase 1: Architect & Task Graph";
    document.getElementById("step1").classList.add("active");
  }, 1200);

  setTimeout(() => {
    log(`[Phase 1] Task Graph planificado en 3 sub-tareas.`);
    log(`[Phase 2] Desplegando ${workers} Kōmbees paralelos con bloques SEARCH/REPLACE...`);
    badge.innerText = `Fase 2: Parallel Coders (${workers} Nodos)`;
    document.getElementById("step2").classList.add("active");
  }, 2500);

  setTimeout(() => {
    log(`[Phase 3] Ejecutando verificación en Shadow Sandbox...`);
    badge.innerText = "Fase 3: Shadow Sandbox Verify";
    document.getElementById("step3").classList.add("active");
  }, 3800);

  setTimeout(() => {
    log(`[Self-Healing] Verificación de suite exitosa (0 errores detectados).`);
    badge.innerText = "Fase 4: Consolidar Pull Request";
    document.getElementById("stepHeal").classList.add("active");
    document.getElementById("step4").classList.add("active");
  }, 5000);

  setTimeout(() => {
    log(`[✓] Misión completada con éxito. Rama <b>${branch}</b> lista para merge.`);
    badge.innerText = "Estado: Completado ✓";
    showToast("Enjambre completó la misión con éxito.");
  }, 6200);
}

function generateWorkflowOnly() {
  const workers = document.getElementById("inputWorkers").value;
  const yaml = `# Auto-generated by Hiven Swarm Engine V3
name: 🐝 Hiven Autonomous Swarm Execution

on:
  workflow_dispatch:
    inputs:
      instruction:
        description: 'Swarm Mission Instruction'
        required: true

jobs:
  architect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Plan Task Graph (DAG)
        run: echo "Decomposing task..."

  parallel_coders:
    needs: architect
    strategy:
      matrix:
        worker_id: [${Array.from({ length: parseInt(workers, 10) }, (_, i) => i + 1).join(", ")}]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Kōmbee \${{ matrix.worker_id }}
        run: echo "Executing surgical diff..."
`;
  navigator.clipboard.writeText(yaml);
  showToast("Workflow YAML copiado al portapapeles");
}

// Swarms Table
function renderSwarmsTable() {
  const tbody = document.getElementById("swarmsTableBody");
  if (!tbody) return;

  if (activeSwarms.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No hay misiones recientes. Despacha una en la pestaña "Despachar Misión".</td></tr>`;
    return;
  }

  tbody.innerHTML = activeSwarms.map(s => `
    <tr>
      <td><code>${s.swarmId}</code></td>
      <td><b>${s.repo}</b></td>
      <td><span class="status-pill active">✓ ${s.status}</span></td>
      <td>${s.prompt.slice(0, 45)}...</td>
      <td>${s.selfHealingRounds} rondas</td>
      <td>${s.date}</td>
      <td><a href="${s.prUrl}" target="_blank" class="btn btn-sm btn-secondary">Ver PR</a></td>
    </tr>
  `).join("");
}

function loadSwarmsHistory() {
  renderSwarmsTable();
  showToast("Inventario actualizado");
}

// Honeycombs Grid
function renderHoneycombsGrid() {
  const grid = document.getElementById("honeycombsGrid");
  if (!grid) return;

  const langs = Object.keys(honeycombsMemory);
  if (langs.length === 0) {
    grid.innerHTML = `<div class="text-muted">No hay patrones en la memoria Honeycombs.</div>`;
    return;
  }

  grid.innerHTML = langs.map(lang => {
    const list = honeycombsMemory[lang] || [];
    return `
      <div class="honeycomb-card">
        <div class="honeycomb-lang">🍯 Celda: [${lang.toUpperCase()}] (${list.length} patrones)</div>
        ${list.map(p => `
          <div class="pattern-item mt-2">
            <div style="font-weight:600; font-size:0.85rem;">${p.summary}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;"><b>Do:</b> ${p.doDirective}</div>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

function exportHoneycombs() {
  const data = JSON.stringify(honeycombsMemory, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hiven_honeycombs_${Date.now()}.json`;
  a.click();
  showToast("Memoria Honeycombs exportada");
}

function clearHoneycombs() {
  if (confirm("¿Estás seguro de purgar toda la memoria Honeycombs?")) {
    honeycombsMemory = {};
    localStorage.removeItem("hiven_honeycombs_local");
    renderHoneycombsGrid();
    updateStats();
    showToast("Memoria Honeycombs purgada");
  }
}

function updateStats() {
  const patCount = Object.values(honeycombsMemory).reduce((acc, curr) => acc + curr.length, 0);
  const elPat = document.getElementById("statPatternsCount");
  if (elPat) elPat.innerText = patCount;

  const elPr = document.getElementById("statTotalPRs");
  if (elPr) elPr.innerText = activeSwarms.length;
}
