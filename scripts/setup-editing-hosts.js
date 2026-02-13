const { execSync } = require("child_process");
const readline = require("readline");

// This script allows you to create multiple editing hosts with a single command and configure environment variables on them.
// To run this script, use: node setup-editing-hosts.js -AuthoringEnvironmentId "<environment-id>"

// ==========================================
// Configuration
// ==========================================

const HOSTS = [
  {
    name: "nextjsstarter",
    variables: {},
  },
  {
    name: "travel",
    variables: {},
  },
  {
    name: "energy",
    variables: {},
  },
  {
    name: "healthcare",
    variables: {},
  },
  {
    name: "luxury-retail",
    variables: {},
  },
];

// ==========================================
// Argument Parsing
// ==========================================

let authoringEnvId = null;

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (
    args[i] === "-AuthoringEnvironmentId" ||
    args[i] === "--authoring-environment-id"
  ) {
    authoringEnvId = args[i + 1];
    i++;
  }
}

if (!authoringEnvId) {
  console.error(
    "\x1b[31mError: AuthoringEnvironmentId parameter is required.\x1b[0m",
  );
  console.log(
    'Usage: node setup-editing-hosts.js -AuthoringEnvironmentId "<environment-id>"',
  );
  process.exit(1);
}

// ==========================================
// UI Helpers
// ==========================================

const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const GRAY = "\x1b[90m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

const CHECKBOX_ON = "\u25c9"; // ◉
const CHECKBOX_OFF = "\u25ef"; // ◯
const ARROW = "\u276f"; // ❯

// Track previous frame line count so we can erase leftover lines
let prevLineCount = 0;
let firstDraw = true;

function renderFrame(lines) {
  const CLR = "\x1b[K"; // Clear from cursor to end of line
  const output = [];

  if (firstDraw) {
    // First render: clear screen, hide cursor, position at top
    output.push("\x1b[2J\x1b[H\x1b[?25l");
    firstDraw = false;
  } else {
    // Subsequent renders: just move cursor to top-left
    output.push("\x1b[H");
  }

  // Write each line, clearing any trailing content from the previous frame
  for (const line of lines) {
    output.push(line + CLR + "\n");
  }

  // If the previous frame had more lines, erase the extras
  if (prevLineCount > lines.length) {
    for (let i = 0; i < prevLineCount - lines.length; i++) {
      output.push(CLR + "\n");
    }
  }

  prevLineCount = lines.length;

  // Single write — no flicker
  process.stdout.write(output.join(""));
}

// ==========================================
// Menu Logic
// ==========================================

function padRight(str, len) {
  return str.length >= len ? str : str + " ".repeat(len - str.length);
}

async function showMenu() {
  // State
  const selected = new Set(HOSTS.map((h) => h.name)); // Default all selected
  let currentIndex = 0;
  let showVarsForIndex = -1; // Expanded variable preview
  const selectAllIndex = HOSTS.length;
  const continueIndex = HOSTS.length + 1;
  const cancelIndex = HOSTS.length + 2;

  // Compute the longest host name for alignment
  const maxNameLen = Math.max(...HOSTS.map((h) => h.name.length));

  // Setup Key Listening
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  } else {
    console.warn(
      "Non-interactive terminal detected. Proceeding with all hosts selected.",
    );
    return HOSTS;
  }

  function draw() {
    const lines = [];
    const selectedCount = selected.size;
    const totalCount = HOSTS.length;

    // Header
    lines.push(`${CYAN}${BOLD}${"+".padEnd(46, "\u2500")}+${RESET}`);
    lines.push(
      `${CYAN}${BOLD}|         XM Cloud Editing Host Setup          |${RESET}`,
    );
    lines.push(`${CYAN}${BOLD}${"+".padEnd(46, "\u2500")}+${RESET}`);
    lines.push(
      `${GRAY}  Creates editing hosts and configures env vars.${RESET}`,
    );
    lines.push(
      `${YELLOW}  Duplicate hosts will be created if an editing host with the same name already exists.${RESET}`,
    );
    lines.push("");

    // Key legend
    lines.push(
      `${GRAY}  \u2191/\u2193 Navigate  ${RESET}${BOLD}Space${RESET}${GRAY} Toggle  ${RESET}${BOLD}A${RESET}${GRAY} Select/Deselect All${RESET}`,
    );
    lines.push(
      `${GRAY}  \u2192 Preview vars  ${RESET}${BOLD}Enter${RESET}${GRAY} Confirm     ${RESET}${BOLD}Esc${RESET}${GRAY} Cancel${RESET}`,
    );
    lines.push("");

    // Selection counter
    const counterColor = selectedCount === 0 ? RED : GREEN;
    lines.push(
      `${counterColor}  ${selectedCount}/${totalCount} hosts selected${RESET}`,
    );
    lines.push("");

    // Render Hosts
    HOSTS.forEach((host, index) => {
      const isFocused = index === currentIndex;
      const isChecked = selected.has(host.name);
      const varCount = Object.keys(host.variables).length;

      // Checkbox symbol
      const checkbox = isChecked
        ? `${GREEN}${CHECKBOX_ON}${RESET}`
        : `${GRAY}${CHECKBOX_OFF}${RESET}`;

      // Host name with padding
      const name = padRight(host.name, maxNameLen + 1);

      // Variable badge
      const varBadge =
        varCount > 0
          ? `${DIM}${varCount} var${varCount !== 1 ? "s" : ""}${RESET}`
          : `${DIM}no vars${RESET}`;

      if (isFocused) {
        lines.push(
          `  ${CYAN}${BOLD}${ARROW}${RESET} ${checkbox} ${CYAN}${BOLD}${name}${RESET} ${varBadge}`,
        );
      } else {
        lines.push(`    ${checkbox} ${name} ${varBadge}`);
      }

      // Show expanded variable preview if toggled
      if (showVarsForIndex === index) {
        const keys = Object.keys(host.variables);
        if (keys.length === 0) {
          lines.push(`${GRAY}         (no variables configured)${RESET}`);
        } else {
          keys.forEach((k) => {
            const v = host.variables[k];
            const truncated = v.length > 30 ? v.substring(0, 27) + "..." : v;
            lines.push(
              `${GRAY}         ${DIM}${k}${RESET}${GRAY} = ${truncated}${RESET}`,
            );
          });
        }
      }
    });

    lines.push("");
    lines.push(`${GRAY}  ${"-".repeat(42)}${RESET}`);
    lines.push("");

    // Select All / Deselect All toggle
    const allSelected = selected.size === HOSTS.length;
    const selectAllLabel = allSelected ? "Deselect All" : "Select All  ";
    if (currentIndex === selectAllIndex) {
      lines.push(
        `  ${CYAN}${BOLD}${ARROW}${RESET} ${CYAN}${BOLD}[ ${selectAllLabel} ]${RESET}`,
      );
    } else {
      lines.push(`    ${GRAY}[ ${selectAllLabel} ]${RESET}`);
    }

    lines.push("");

    // Continue Button
    const canContinue = selected.size > 0;
    if (currentIndex === continueIndex) {
      lines.push(
        `  ${CYAN}${BOLD}${ARROW}${RESET} ${canContinue ? `${GREEN}${BOLD}` : `${GRAY}${DIM}`}[ CONTINUE ]${RESET}`,
      );
    } else {
      lines.push(
        `    ${canContinue ? `${GREEN}[ CONTINUE ]` : `${GRAY}${DIM}[ CONTINUE ]`}${RESET}`,
      );
    }

    // Cancel Button
    if (currentIndex === cancelIndex) {
      lines.push(
        `  ${CYAN}${BOLD}${ARROW}${RESET} ${RED}${BOLD}[ CANCEL   ]${RESET}`,
      );
    } else {
      lines.push(`    ${RED}[ CANCEL   ]${RESET}`);
    }

    // Flush entire frame in one write — flicker-free
    renderFrame(lines);
  }

  return new Promise((resolve) => {
    function handleKey(str, key) {
      if (!key) return;

      if (key.name === "c" && key.ctrl) {
        restoreCursor();
        process.exit();
      }

      // Escape = cancel
      if (key.name === "escape") {
        cleanup();
        resolve([]);
        return;
      }

      // Navigation
      if (key.name === "up") {
        showVarsForIndex = -1;
        if (currentIndex > 0) currentIndex--;
      } else if (key.name === "down") {
        showVarsForIndex = -1;
        if (currentIndex < cancelIndex) currentIndex++;
      } else if (key.name === "home") {
        showVarsForIndex = -1;
        currentIndex = 0;
      } else if (key.name === "end") {
        showVarsForIndex = -1;
        currentIndex = cancelIndex;
      } else if (key.name === "tab") {
        // Tab jumps to Continue
        showVarsForIndex = -1;
        currentIndex = continueIndex;
      } else if (key.name === "right") {
        // Toggle variable preview for current host
        if (currentIndex < HOSTS.length) {
          showVarsForIndex =
            showVarsForIndex === currentIndex ? -1 : currentIndex;
        }
      } else if (key.name === "left") {
        showVarsForIndex = -1;
      }
      // Select All / Deselect All shortcut
      else if (str === "a" || str === "A") {
        if (selected.size === HOSTS.length) {
          selected.clear();
        } else {
          HOSTS.forEach((h) => selected.add(h.name));
        }
      }
      // Toggle / Confirm
      else if (
        key.name === "return" ||
        key.name === "enter" ||
        key.name === "space"
      ) {
        if (currentIndex < HOSTS.length) {
          // Toggle selection
          const hostName = HOSTS[currentIndex].name;
          if (selected.has(hostName)) {
            selected.delete(hostName);
          } else {
            selected.add(hostName);
          }
        } else if (currentIndex === selectAllIndex) {
          // Toggle all
          if (selected.size === HOSTS.length) {
            selected.clear();
          } else {
            HOSTS.forEach((h) => selected.add(h.name));
          }
        } else if (currentIndex === continueIndex) {
          if (selected.size === 0) {
            // Don't allow continuing with nothing selected, flash stays
          } else {
            cleanup();
            const result = HOSTS.filter((h) => selected.has(h.name));
            resolve(result);
            return;
          }
        } else if (currentIndex === cancelIndex) {
          cleanup();
          resolve([]);
          return;
        }
      }

      draw();
    }

    function restoreCursor() {
      process.stdout.write("\x1b[?25h"); // Show cursor
    }

    function cleanup() {
      process.stdin.removeListener("keypress", handleKey);
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      restoreCursor();
      console.log("");
    }

    process.stdin.on("keypress", handleKey);
    draw();
  });
}

// ==========================================
// Execution Logic
// ==========================================

function runCommand(command) {
  try {
    const stdout = execSync(command, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { stdout, stderr: "", status: 0 };
  } catch (err) {
    return {
      stdout: err.stdout || "",
      stderr: err.stderr || "",
      status: err.status,
    };
  }
}

(async () => {
  runCommand("dotnet sitecore cloud login");

  const hostsToProcess = await showMenu();

  if (hostsToProcess.length === 0) {
    console.log("No hosts selected or operation cancelled. Exiting.");
    process.exit(0);
  }

  console.log("");
  console.log(
    `${GREEN}Proceeding with: ${hostsToProcess.map((h) => h.name).join(", ")}${RESET}`,
  );
  console.log("----------------------------------------");

  for (const host of hostsToProcess) {
    console.log(`${YELLOW}Processing host: ${host.name}${RESET}`);
    console.log(`Creating editing host '${host.name}'...`);

    // Run Create Command
    const createResult = runCommand(
      `dotnet sitecore cloud editinghost create -n ${host.name} -cm ${authoringEnvId}`,
    );

    // Print output
    console.log(createResult.stdout);
    if (createResult.stderr) {
      console.error(createResult.stderr);
    }

    // Parse ID
    // Look for "Environment Id    : <ID>"
    const match = createResult.stdout.match(
      /Environment Id\s+:\s+([a-zA-Z0-9]+)/,
    );

    if (match && match[1]) {
      const hostId = match[1];
      console.log(`${GREEN}Successfully created host. ID: ${hostId}${RESET}`);

      // Upsert Variables
      const keys = Object.keys(host.variables);
      if (keys.length > 0) {
        console.log("Configuring environment variables...");
        for (const key of keys) {
          const val = host.variables[key];
          console.log(`  Setting ${key}...`);
          runCommand(
            `dotnet sitecore cloud environment variable upsert -id ${hostId} -n ${key} -val ${val}`,
          );
        }
      } else {
        console.log(`No variables to configure for ${host.name}.`);
      }
    } else {
      console.error(
        `${RED}Failed to parse Environment ID from creation output. Skipping variables.${RESET}`,
      );
    }

    console.log("----------------------------------------");
  }

  console.log(
    `${CYAN}All operations completed. From the Sitecore Deploy portal edit the environment details for each host as needed and then Build and deploy${RESET}`,
  );
  process.exit(0);
})();
