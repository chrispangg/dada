# Dialectical Autocoding with DeepAgent AI SDK

A demonstration of **adversarial cooperation** in code synthesis—a novel approach to AI-assisted software development that transcends the limitations of traditional "vibe coding" tools through a structured coach-player feedback loop.

## What is Dialectical Autocoding?

Dialectical autocoding implements a **bounded, adversarial process** between two cooperating AI agents:

- **Player Agent**: Focuses on implementation, creativity, and problem-solving
  - Reads requirements and implements solutions
  - Writes code, creates tests, and executes commands
  - Responds to specific feedback with targeted improvements
  - Optimized for code production and execution

- **Coach Agent**: Focuses on analysis, critique, and validation
  - Validates implementations against requirements
  - Tests compilation and functionality
  - Provides specific, actionable feedback
  - Optimized for evaluation and guidance

Both agents begin with the same comprehensive requirements document, then engage in a structured dialogue until the coach approves the implementation or maximum turns are reached.

## Why Adversarial Cooperation?

Traditional AI coding assistants operate in a "vibe coding" model—chat-style interactions that struggle with:

- **Anchoring**: Limited ability to maintain coherency on larger tasks
- **Refinement**: Systematic improvement is patchy; edge-case handling is uneven
- **Completion**: Success states are open-ended and require human instruction
- **Complexity**: Weak ability to systematically approach multi-faceted problems

Adversarial autocoding addresses these limitations by:

✅ **Maintaining focus** across extended development sessions  
✅ **Systematically iterating** and improving implementations  
✅ **Providing built-in quality assurance** through structured validation  
✅ **Handling complex, multi-step tasks** autonomously  
✅ **Overcoming context window limitations** through fresh agent instances each turn

## How It Works

The adversarial process operates within carefully defined bounds:

1. **Turn Limits**: Maximum number of turns between player and coach (typically 10)
2. **Context Windows**: Each turn starts with fresh agents to prevent context pollution
3. **Requirements**: Shared requirements doc provides consistent evaluation criteria
4. **Approval Gates**: Explicit approval from the coach terminates successful runs

```
┌─────────────────────────────────────────────────────────┐
│                    Requirements Document                 │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │         TURN 1                       │
        ├─────────────────────────────────────┤
        │  Player: Implements solution         │
        │  Coach: Reviews → Issues found       │
        └─────────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │         TURN 2                       │
        ├─────────────────────────────────────┤
        │  Player: Addresses feedback         │
        │  Coach: Reviews → Issues found       │
        └─────────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │         TURN N                       │
        ├─────────────────────────────────────┤
        │  Player: Final improvements         │
        │  Coach: Reviews → COACH APPROVED ✅ │
        └─────────────────────────────────────┘
```

## Implementation

This project implements dialectical autocoding using the [deepagent-ai-sdk](https://github.com/vercel/ai/tree/main/packages/ai-sdk-deep-agent) framework.

### Architecture

The implementation (`dada.ts`) orchestrates the coach-player dyad:

- **Player Agent**: Uses `claude-haiku-4-5` for fast iteration
- **Coach Agent**: Uses `claude-sonnet-4-5` for thorough review
- **Local Sandbox**: Provides isolated execution environment
- **Workspace Structure**: Organized directories for code, tests, and feedback

### Key Features

- 🔄 **Autonomous Iteration**: Runs up to 10 turns without human intervention
- 📝 **Structured Feedback**: Coach writes detailed feedback files with requirements compliance checks
- ✅ **Automatic Validation**: Coach runs tests and validates functionality
- 🎯 **Requirement-Driven**: Both agents reference the same requirements document
- 🔍 **Fresh Context**: Each turn uses new agent instances to avoid context pollution

## Installation

```bash
bun install
```

## Usage

Set your Anthropic API key:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

Run the dialectical autocoding process:

```bash
bun run dada.ts
```

Or use the npm script:

```bash
bun start
```

### Customizing Requirements

Edit the `requirements` constant in `dada.ts` to specify what you want to build:

```typescript
const requirements = `
# Build Your Application

## Requirements

1. Your requirement here
2. Another requirement
...
`
```

## Example Output

```
🚀 Starting DADA orchestration...

═══ TURN 1/10 ═══

🔨 Player: Implementing...
  📝 /workspace/src/calculator.tsx
  📝 /workspace/tests/calculator.test.tsx
  ⚡ bun test → exit 0
✓ Player turn complete

🔍 Coach: Reviewing...
  📝 /workspace/feedback/turn-1.md
  ⚡ bun test → exit 0
✓ Coach turn complete

⚠ Issues found - continuing to turn 2

═══ TURN 2/10 ═══
...

🎉 COACH APPROVED after 3 turn(s)!
```

## Case Studies

The adversarial cooperation approach has been successfully demonstrated in various scenarios:

- **Calculator API**: Complete REST API with authentication, error handling, and comprehensive tests
- **Diff Viewer**: Native SwiftUI desktop application for visualizing git diffs
- **Mobile App Client**: iOS application built from API specifications
- **Git Repo Explorer**: Terminal UI application with branch diff viewing

In comparative studies, adversarial autocoding consistently outperformed single-turn approaches, achieving:

- ✅ Complete requirement compliance
- ✅ Comprehensive test coverage
- ✅ Autonomous operation (no human intervention)
- ✅ Better edge-case handling

## Benefits Over Traditional Approaches

| Feature | Vibe Coding | Adversarial Autocoding |
|---------|-------------|------------------------|
| **Autonomy** | Requires human review each turn | Runs autonomously for multiple turns |
| **Focus** | Context accumulates, focus drifts | Fresh context each turn maintains focus |
| **Validation** | Human must verify | Built-in coach validation |
| **Completeness** | Often misses requirements | Coach enforces requirement compliance |
| **Edge Cases** | Inconsistent handling | Systematic detection and fixing |
| **Time Efficiency** | Blocks on human availability | Runs continuously, nights/weekends |

## Research & References

This implementation is based on the research paper:

**"Adversarial Cooperation in Code Synthesis: A New Paradigm For AI-Assisted Software Development"**

Key concepts:

- Dialectical reasoning through structured agent dialogue
- Context window management through fresh agent instances
- Model utilization diversity (different models for player vs coach)
- Bounded adversarial process with explicit approval gates

See `adversarial-cooperation-in-code-synthesis.md` for the full paper.

## Framework

Built with:

- **[ai-sdk-deep-agent](https://github.com/chrispangg/ai-sdk-deepagent)**: A DeepAgent Harness built using Vercel's ai-sdk
- **[Bun](https://bun.sh)**: Fast JavaScript runtime
- **[Anthropic Claude](https://www.anthropic.com)**: AI models (Haiku for player, Sonnet for coach)

## License

This project demonstrates a research concept. See the original paper for academic references and citations.

## Contributing

This is a demonstration project. For production implementations, consider:

- Optimizing agent prompts for specific domains
- Implementing parallel experiment clusters
- Adding support for multiple model providers
- Enhancing feedback structure and validation criteria
