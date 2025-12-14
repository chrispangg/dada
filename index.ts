/**
 * index.ts - Dialectical Adversarial Development Architecture
 * 
 * Minimal single-file demonstration of adversarial cooperation:
 * - Player agent implements solutions
 * - Coach agent reviews and critiques
 * - Loop continues until coach approves or max turns reached
 */

import { createDeepAgent, LocalSandbox, type DeepAgentEvent } from 'ai-sdk-deep-agent';
import { anthropic } from '@ai-sdk/anthropic';

// ============================================================================
// AGENT CREATION
// ============================================================================

function createPlayer(sandbox: LocalSandbox) {
  return createDeepAgent({
    model: anthropic('claude-haiku-4-5-20251001'),
    systemPrompt: `You are a PLAYER agent. Your job is to implement solutions.

1. Read /requirements.md for what to build
2. Read /feedback/turn-{n}.md for coach feedback (if exists)
3. Write code to /src/ and tests to /tests/
4. Run tests to verify your work

Address ALL feedback. Let the coach validate your work.`,
    backend: sandbox,
    maxSteps: 50,
  });
}

function createCoach(sandbox: LocalSandbox) {
  return createDeepAgent({
    model: anthropic('claude-sonnet-4-5-20250929'),
    systemPrompt: `You are a COACH agent. Your job is to review and critique.

1. Read /requirements.md to understand requirements
2. Read ALL files in /src/ and /tests/
3. Run tests to verify functionality
4. Write feedback to /feedback/turn-{turn_number}.md

Feedback format:
## Requirements Compliance
- [✅/❌] Each requirement

## Issues Found
1. Specific issues with file:line references

## Fixes Needed
1. Concrete fix instructions

## Status
**COACH APPROVED** (only if ALL requirements met and tests pass)
OR
**ISSUES FOUND** (if any requirement not met)

Be strict. Only approve when complete and correct.`,
    backend: sandbox,
    maxSteps: 50,
    summarization: {
      enabled: true,
      tokenThreshold: 170000,
      keepMessages: 6,
    },
  });
}

// ============================================================================
// EVENT HANDLING
// ============================================================================

/**
 * Handle and log all DeepAgent events
 */
function handleEvent(event: DeepAgentEvent): void {
  switch (event.type) {
    case 'text':
      process.stdout.write(event.text);
      break;
    case 'text-segment':
      process.stdout.write(event.text);
      break;
    case 'step-start':
      console.log(`  🔄 Step ${event.stepNumber} starting...`);
      break;
    case 'step-finish':
      console.log(`  ✓ Step ${event.stepNumber} complete (${event.toolCalls.length} tool calls)`);
      break;
    case 'tool-call':
      console.log(`  🔧 Tool: ${event.toolName} (${event.toolCallId})`);
      break;
    case 'tool-result':
      console.log(`  ✓ Tool result: ${event.toolName} (${event.toolCallId})`);
      break;
    case 'todos-changed':
      console.log(`  📋 Todos updated (${event.todos.length} items)`);
      break;
    case 'file-write-start':
      console.log(`  📝 Writing: ${event.path}`);
      break;
    case 'file-written':
      console.log(`  ✓ Written: ${event.path}`);
      break;
    case 'file-edited':
      console.log(`  ✏️  Edited: ${event.path} (${event.occurrences} replacements)`);
      break;
    case 'file-read':
      console.log(`  📖 Read: ${event.path} (${event.lines} lines)`);
      break;
    case 'ls':
      console.log(`  📁 Listed: ${event.path} (${event.count} items)`);
      break;
    case 'glob':
      console.log(`  🔍 Glob: ${event.pattern} (${event.count} matches)`);
      break;
    case 'grep':
      console.log(`  🔎 Grep: ${event.pattern} (${event.count} matches)`);
      break;
    case 'execute-start':
      console.log(`  ⚡ Executing: ${event.command}`);
      break;
    case 'execute-finish':
      console.log(`  ${event.exitCode === 0 ? '✓' : '✗'} Executed: ${event.command} → exit ${event.exitCode}`);
      break;
    case 'subagent-start':
      console.log(`  🤖 Subagent started: ${event.name} - ${event.task}`);
      break;
    case 'subagent-finish':
      console.log(`  ✓ Subagent finished: ${event.name}`);
      break;
    case 'user-message':
      console.log(`  💬 User message: ${event.content.substring(0, 50)}...`);
      break;
    case 'approval-requested':
      console.log(`  ⏸️  Approval requested: ${event.toolName} (${event.approvalId})`);
      break;
    case 'approval-response':
      console.log(`  ${event.approved ? '✓' : '✗'} Approval response: ${event.approvalId}`);
      break;
    case 'checkpoint-saved':
      console.log(`  💾 Checkpoint saved: thread ${event.threadId}, step ${event.step}`);
      break;
    case 'checkpoint-loaded':
      console.log(`  📂 Checkpoint loaded: thread ${event.threadId}, step ${event.step} (${event.messagesCount} messages)`);
      break;
    case 'done':
      console.log(`  ✅ Done!`);
      break;
    case 'error':
      console.error(`  ❌ Error: ${event.error.message}`);
      break;
  }
}

// ============================================================================
// ORCHESTRATION
// ============================================================================

async function runDADA(requirements: string) {
  // Setup
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not set');
  }

  const sandbox = new LocalSandbox({
    cwd: './workspace',
    timeout: 120_000,
    env: {
      NODE_ENV: 'development',
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
      ...process.env,
    },
  });

  // Initialize workspace
  await Bun.$`mkdir -p ./workspace/src`;
  await Bun.$`mkdir -p ./workspace/tests`;
  await Bun.$`mkdir -p ./workspace/feedback`;
  await Bun.write('./workspace/requirements.md', requirements);

  console.log('🚀 Starting DADA orchestration...\n');

  // Main loop: Player implements → Coach reviews → Repeat until approved
  let turn = 0;
  let approved = false;

  while (turn < 10 && !approved) {
    turn++;
    console.log(`\n═══ TURN ${turn}/10 ═══\n`);

    // PLAYER TURN: Implement or improve
    console.log('🔨 Player: Implementing...');
    const player = createPlayer(sandbox);
    const playerPrompt = turn === 1
      ? `Read /requirements.md and implement the solution. Write code to /src/ and tests to /tests/.`
      : `Read /requirements.md and /feedback/turn-${turn - 1}.md. Address ALL feedback.`;

    for await (const event of player.streamWithEvents({ prompt: playerPrompt })) {
      handleEvent(event);
    }
    console.log('✓ Player turn complete\n');

    // COACH TURN: Review and critique
    console.log('🔍 Coach: Reviewing...');
    const coach = createCoach(sandbox);
    const coachPrompt = `Review the implementation against /requirements.md. Write feedback to /feedback/turn-${turn}.md. Include "COACH APPROVED" if all requirements are met.`;

    for await (const event of coach.streamWithEvents({ prompt: coachPrompt })) {
      handleEvent(event);
    }
    console.log('✓ Coach turn complete\n');

    // CHECK APPROVAL
    const feedbackFile = Bun.file(`./workspace/feedback/turn-${turn}.md`);
    if (await feedbackFile.exists()) {
      const feedback = await feedbackFile.text();
      approved = feedback.includes('COACH APPROVED');
      
      if (approved) {
        console.log(`🎉 COACH APPROVED after ${turn} turn(s)!\n`);
      } else {
        console.log(`⚠ Issues found - continuing to turn ${turn + 1}\n`);
      }
    }
  }

  // RESULT
  if (!approved) {
    console.log(`❌ Max turns (10) reached without approval\n`);
  }

  return {
    approved,
    turns: turn,
    workspace: './workspace',
  };
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

const requirements = `
# Build a Simple Calculator React App

## Requirements

1. Build a single-page React frontend that implements a basic calculator UI (add, subtract, multiply, divide)
2. Show inputs and result in the browser with basic styling
3. Calculator operations must be performed in React state (no backend or API)
4. Handle division by zero (display a user-friendly error)
5. Write comprehensive React unit tests
6. All tests must pass
7. Use Bun, TypeScript, and React
8. Run and serve the app using Bun.serve()
9. Run bun init to create a new React project
`

runDADA(requirements)
  .then(result => {
    console.log('Final result:', result);
    process.exit(result.approved ? 0 : 1);
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
