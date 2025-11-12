// Usage: node merge-sarif.js input.sarif output.sarif
const fs = require('fs');

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error('Usage: node merge-sarif.js input.sarif output.sarif');
  process.exit(2);
}
const sarif = JSON.parse(fs.readFileSync(input, 'utf8'));

if (!sarif.runs || !Array.isArray(sarif.runs) || sarif.runs.length <= 1) {
  fs.writeFileSync(output, JSON.stringify(sarif, null, 2));
  process.exit(0);
}

// Group runs by tool.driver.name
const grouped = new Map();
for (const run of sarif.runs) {
  const name = (run.tool && run.tool.driver && run.tool.driver.name) || 'unknown';
  if (!grouped.has(name)) {
    // shallow copy of run
    grouped.set(name, {
      tool: run.tool,
      columnKind: run.columnKind,
      originalRuns: [run],
    });
  } else {
    grouped.get(name).originalRuns.push(run);
  }
}

// Build merged runs array
const mergedRuns = [];
for (const [name, entry] of grouped.entries()) {
  const merged = {
    tool: entry.tool,
    columnKind: entry.columnKind,
    results: [],
    artifacts: [],
    invocations: [],
    properties: {},
  };

  const ruleMap = new Map(); // keep unique rules by id if tool.driver.rules present
  for (const run of entry.originalRuns) {
    if (Array.isArray(run.results)) {
      merged.results.push(...run.results);
    }
    if (Array.isArray(run.artifacts)) {
      merged.artifacts.push(...run.artifacts);
    }
    if (Array.isArray(run.invocations)) {
      merged.invocations.push(...run.invocations);
    }
    if (run.tool && run.tool.driver && Array.isArray(run.tool.driver.rules)) {
      for (const r of run.tool.driver.rules) {
        if (r.id && !ruleMap.has(r.id)) ruleMap.set(r.id, r);
      }
    }
  }
  if (ruleMap.size) {
    merged.tool = merged.tool || { driver: {} };
    merged.tool.driver = merged.tool.driver || {};
    merged.tool.driver.rules = Array.from(ruleMap.values());
  }

  mergedRuns.push(merged);
}

sarif.runs = mergedRuns;
fs.writeFileSync(output, JSON.stringify(sarif, null, 2));
console.log('Merged SARIF runs:', mergedRuns.length);
