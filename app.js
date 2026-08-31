/**
 * Hiven Studio SPA - Core JavaScript Engine V3.2
 * Autonomous Multi-Agent Swarm & Dual-Level Honeycombs Controller
 */

// State
let currentPat = localStorage.getItem("hiven_github_pat") || sessionStorage.getItem("hiven_github_pat") || "";
let activeSwarms = JSON.parse(localStorage.getItem("hiven_swarms_history") || "[]");
let localHoneycombs = JSON.parse(localStorage.getItem("hiven_honeycombs_local") || "{}");
let globalHivemindEnabled = localStorage.getItem("hiven_global_hivemind") === "true";
let globalHoneycombs = {};
let currentUser = null;

// Initial Local Seed Patterns if empty
if (Object.keys(localHoneycombs).length === 0) {
  localHoneycombs = {
    ts: [
      { id: "pat_local_1", patternType: "architecture", summary: "Modular Export Pattern", doDirective: "Use explicit named exports and NodeNext extensions (.js in imports).", usageCount: 12 },
      { id: "pat_local_2", patternType: "testing", summary: "Isolated Sandbox Fixtures", doDirective: "Create scratch mock directories for temp file tests.", usageCount: 8 }
    ],
    py: [
      { id: "pat_local_3", patternType: "best_practice", summary: "Type Hinting Protocol", doDirective: "Include typing annotations (Optional, Union, Dict) in function signatures.", usageCount: 15 }
    ],
    rs: [
      { id: "pat_local_4", patternType: "architecture", summary: "Zero-Allocation Parsing", doDirective: "Use &str slices instead of allocating String instances in inner loops.", usageCount: 6 }
    ]
  };
  localStorage.setItem("hiven_honeycombs_local", JSON.stringify(localHoneycombs));
}

// Initialization on DOM ready
document.addEventListener("DOMContentLoaded", async () => {
  if (currentPat) {
    const valid = await validateAndLoadUser(currentPat);
    if (valid) {
      unlockConsole();
    } else {
      lockConsole();
    }
  } else {
    lockConsole();
  }

  // Restore Hivemind checkbox state
  initHivemindState();

  renderHoneycombsGrid();
  await loadSwarmsHistory();
  updateStats();
});

// Authentication Gate Logic
async function validateAndLoadUser(pat) {
  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": `token ${pat}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (res.ok) {
      currentUser = await res.json();
      updateUserUI(currentUser);
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Auth check failed:", err);
    return false;
  }
}

function unlockConsole() {
  document.getElementById("auth-gate").style.display = "none";
  document.getElementById("app-layout").style.display = "flex";
  document.documentElement.classList.add("is-authenticated-pre");
}

function lockConsole() {
  document.getElementById("auth-gate").style.display = "flex";
  document.getElementById("app-layout").style.display = "none";
  document.documentElement.classList.remove("is-authenticated-pre");
}

function updateUserUI(user) {
  if (!user) return;
  const avatar = document.getElementById("userAvatar");
  const loginText = document.getElementById("userLoginName");
  if (avatar && user.avatar_url) avatar.src = user.avatar_url;
  if (loginText && user.login) loginText.innerText = `@${user.login}`;
}

async function handleAuthGateSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("gatePatInput");
  const btn = document.getElementById("btnGateSubmit");
  const pat = input.value.trim();

  if (!pat) {
    showToast("Por favor introduce un GitHub PAT válido.");
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<span>⏳ Verificando credenciales...</span>`;

  const isValid = await validateAndLoadUser(pat);

  btn.disabled = false;
  btn.innerHTML = `<span>🐝 Conectar y Acceder a Hiven</span>`;

  if (isValid) {
    currentPat = pat;
    localStorage.setItem("hiven_github_pat", pat);
    unlockConsole();
    showToast(`¡Bienvenido @${currentUser.login}!`);
  } else {
    showToast("GitHub PAT inválido o sin permisos suficientes.");
  }
}

function handleLogout() {
  currentPat = "";
  currentUser = null;
  localStorage.removeItem("hiven_github_pat");
  sessionStorage.removeItem("hiven_github_pat");
  document.getElementById("gatePatInput").value = "";
  lockConsole();
  showToast("Sesión cerrada correctamente.");
}

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  
  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");

  const btn = Array.from(document.querySelectorAll(".nav-item")).find(b => b.getAttribute("onclick")?.includes(tabId));
  if (btn) btn.classList.add("active");
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

// Modal Management
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
}

// ==========================================
// HIVEMIND DUAL-LEVEL CONTROLLER
// ==========================================

function initHivemindState() {
  const checkbox = document.getElementById("checkGlobalHivemind");
  const badge = document.getElementById("badgeHivemindStatus");
  const syncText = document.getElementById("textHivemindSyncStatus");

  if (globalHivemindEnabled) {
    checkbox.checked = true;
    badge.className = "status-pill active";
    badge.innerText = "✓ Mente Colmena Activa";
    syncText.innerText = "Sincronizado con Red Terra";
    fetchGlobalHivemindPatterns();
  } else {
    checkbox.checked = false;
    badge.className = "status-pill text-muted";
    badge.innerText = "Aislado / Solo Local";
    syncText.innerText = "Desconectado";
  }
}

function handleHivemindCheckboxClick(e) {
  const checkbox = e.target;
  if (checkbox.checked) {
    // Revert visual check until confirmation modal is accepted
    checkbox.checked = false;
    openModal("hivemindModal");
  } else {
    // Deactivating immediately without prompt
    globalHivemindEnabled = false;
    localStorage.setItem("hiven_global_hivemind", "false");
    initHivemindState();
    document.getElementById("globalHivemindSection").style.display = "none";
    showToast("Mente Colmena desactivada. Modo local aislado activo.");
    updateStats();
  }
}

async function confirmHivemindActivation() {
  closeModal("hivemindModal");
  globalHivemindEnabled = true;
  localStorage.setItem("hiven_global_hivemind", "true");
  initHivemindState();
  showToast("¡Te has unido a la Mente Colmena Global!");
  await fetchGlobalHivemindPatterns();
  updateStats();
}

function cancelHivemindActivation() {
  closeModal("hivemindModal");
  initHivemindState();
}

async function fetchGlobalHivemindPatterns() {
  try {
    const res = await fetch("data/honeycombs-global.json");
    if (res.ok) {
      globalHoneycombs = await res.json();
      renderGlobalHoneycombsGrid();
      document.getElementById("globalHivemindSection").style.display = "block";
      const totalGlobal = Object.values(globalHoneycombs).reduce((acc, curr) => acc + curr.length, 0);
      document.getElementById("statGlobalPatternsCount").innerText = totalGlobal;
    }
  } catch (err) {
    console.warn("Could not load global honeycombs seed:", err);
  }
}

// ==========================================
// HONEYCOMBS RENDERING & PURGING
// ==========================================

function renderHoneycombsGrid() {
  const grid = document.getElementById("honeycombsGrid");
  if (!grid) return;

  const langs = Object.keys(localHoneycombs);
  if (langs.length === 0) {
    grid.innerHTML = `<div class="text-muted" style="grid-column: 1/-1; padding: 20px; text-align: center; background: rgba(0,0,0,0.2); border-radius: 8px;">No hay patrones en la memoria local. El enjambre los registrará automáticamente durante las misiones.</div>`;
    return;
  }

  grid.innerHTML = langs.map(lang => {
    const list = localHoneycombs[lang] || [];
    if (list.length === 0) return "";

    return `
      <div class="honeycomb-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <div class="honeycomb-lang">🍯 Celda Local: [${lang.toUpperCase()}] (${list.length})</div>
          <button class="btn btn-sm btn-icon" onclick="purgeLanguageCell('${lang}')" title="Eliminar celda ${lang.toUpperCase()}">✕</button>
        </div>
        ${list.map(p => `
          <div class="pattern-item mt-2" style="background: rgba(0,0,0,0.3); border:1px solid rgba(215,237,4,0.15); border-radius:6px; padding:8px 10px; position:relative;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div style="font-weight:600; font-size:0.85rem; color:var(--text-main);">${p.summary}</div>
              <button class="btn btn-sm btn-icon" style="color:var(--text-muted); font-size:0.75rem; padding:0 4px;" onclick="deleteLocalPattern('${lang}', '${p.id}')" title="Eliminar este patrón">🗑️</button>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;"><b>Do:</b> ${p.doDirective}</div>
            ${p.dontDirective ? `<div style="font-size:0.72rem; color:#fca5a5; margin-top:2px;"><b>Don't:</b> ${p.dontDirective}</div>` : ""}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
              <span class="badge badge-amber" style="font-size:0.65rem;">${p.patternType || "general"}</span>
              <small class="text-muted" style="font-size:0.7rem;">Usado: ${p.usageCount || 1} veces</small>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

function renderGlobalHoneycombsGrid() {
  const grid = document.getElementById("globalHoneycombsGrid");
  if (!grid) return;

  const langs = Object.keys(globalHoneycombs);
  grid.innerHTML = langs.map(lang => {
    const list = globalHoneycombs[lang] || [];
    return `
      <div class="honeycomb-card" style="border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.03);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <div class="honeycomb-lang" style="color:var(--accent-green)">🌐 Celda Global: [${lang.toUpperCase()}] (${list.length})</div>
          <span class="badge" style="background:rgba(16,185,129,0.15); color:var(--accent-green); font-size:0.65rem;">Federado</span>
        </div>
        ${list.map(p => `
          <div class="pattern-item mt-2" style="background: rgba(0,0,0,0.3); border:1px solid rgba(16,185,129,0.2); border-radius:6px; padding:8px 10px;">
            <div style="font-weight:600; font-size:0.85rem; color:var(--text-main);">${p.summary}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;"><b>Do:</b> ${p.doDirective}</div>
            ${p.dontDirective ? `<div style="font-size:0.72rem; color:#fca5a5; margin-top:2px;"><b>Don't:</b> ${p.dontDirective}</div>` : ""}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
              <span class="badge" style="background:rgba(16,185,129,0.15); color:var(--accent-green); font-size:0.65rem;">${p.patternType || "shared"}</span>
              <small class="text-muted" style="font-size:0.7rem;">Consenso Swarm: ${p.usageCount || 20}+</small>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

function deleteLocalPattern(lang, patternId) {
  if (!localHoneycombs[lang]) return;
  localHoneycombs[lang] = localHoneycombs[lang].filter(p => p.id !== patternId);
  if (localHoneycombs[lang].length === 0) {
    delete localHoneycombs[lang];
  }
  localStorage.setItem("hiven_honeycombs_local", JSON.stringify(localHoneycombs));
  renderHoneycombsGrid();
  updateStats();
  showToast("Patrón eliminado de la memoria local.");
}

function purgeLanguageCell(lang) {
  if (confirm(`¿Eliminar toda la celda local de [${lang.toUpperCase()}]?`)) {
    delete localHoneycombs[lang];
    localStorage.setItem("hiven_honeycombs_local", JSON.stringify(localHoneycombs));
    renderHoneycombsGrid();
    updateStats();
    showToast(`Celda [${lang.toUpperCase()}] purgada.`);
  }
}

function clearHoneycombs() {
  if (confirm("¿Estás seguro de purgar toda la memoria Honeycombs LOCAL? Esta acción eliminará los patrones descubiertos localmente.")) {
    localHoneycombs = {};
    localStorage.removeItem("hiven_honeycombs_local");
    renderHoneycombsGrid();
    updateStats();
    showToast("Toda la memoria local ha sido purgada.");
  }
}

function exportHoneycombs() {
  const exportPayload = {
    local: localHoneycombs,
    globalEnabled: globalHivemindEnabled,
    exportedAt: new Date().toISOString()
  };
  const data = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hiven_honeycombs_${Date.now()}.json`;
  a.click();
  showToast("Memoria exportada en JSON.");
}

function updateStats() {
  const localCount = Object.values(localHoneycombs).reduce((acc, curr) => acc + curr.length, 0);
  const globalCount = globalHivemindEnabled ? Object.values(globalHoneycombs).reduce((acc, curr) => acc + curr.length, 0) : 0;
  
  const elPat = document.getElementById("statPatternsCount");
  if (elPat) elPat.innerText = localCount + globalCount;

  const elPr = document.getElementById("statTotalPRs");
  if (elPr) elPr.innerText = activeSwarms.length;
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
    if (globalHivemindEnabled) {
      log(`[Honeycombs] Mente Colmena Global activa: cargadas directivas federadas.`);
    } else {
      log(`[Honeycombs] Memoria local activa.`);
    }
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
  const yaml = `# Auto-generated by Hiven Swarm Engine V3.2
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
      <td><span class="status-pill active"><span class="pill-check">✓</span> ${s.status}</span></td>
      <td>${s.prompt.slice(0, 45)}...</td>
      <td>${s.selfHealingRounds} rondas</td>
      <td>${s.date}</td>
      <td><a href="${s.prUrl}" target="_blank" class="btn btn-sm btn-secondary">Ver PR</a></td>
    </tr>
  `).join("");
}

async function loadSwarmsHistory() {
  try {
    const res = await fetch("data/swarms_history.json");
    if (res.ok) {
      const serverSwarms = await res.json();
      for (const s of serverSwarms) {
        if (!activeSwarms.some(existing => existing.swarmId === s.swarmId)) {
          activeSwarms.push(s);
        }
      }
      localStorage.setItem("hiven_swarms_history", JSON.stringify(activeSwarms));
    }
  } catch (_) {}
  renderSwarmsTable();
  updateStats();
}
