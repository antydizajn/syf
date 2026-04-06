import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// PATHS: Root is /Users/paulinajanowska/AI/ANTIGRAVITY/
// App is /Users/paulinajanowska/AI/ANTIGRAVITY/syfnew/app/
const ROOT_DIR = path.join(process.cwd(), '../..');
const STATUS_FILE = path.join(ROOT_DIR, '.gniewka_status.json');
const EMOTION_FILE = path.join(ROOT_DIR, '.emotional_state.json');
const AGENTIC_FILE = path.join(ROOT_DIR, '.agentic_metrics.json');

export interface GoalHypothesis {
  label: string;
  confidence: number;
}

export interface AgenticMetrics {
  phase: string;
  entropy: number;
  efficiency: number;
  goals: GoalHypothesis[];
}

export interface GnosisVitals {
  timestamp: string;
  emotion: string;
  named_state: string;
  valence: number;
  arousal: number;
  daemons: Record<string, boolean>;
  memory_vectors: number;
  active_protocol: string;
  thought_summary: string;
  agentic_metrics?: AgenticMetrics;
}

export interface LaunchdService {
  pid: string;
  status: string;
  label: string;
}

/**
 * Fetch live launchd status for antigravity services
 */
export async function getLaunchdStatus(): Promise<LaunchdService[]> {
  try {
    // SECURITY: Use 'grep antigravity' to only show our services
    const { stdout } = await execAsync('launchctl list | grep antigravity');
    const lines = stdout.trim().split('\n');
    
    return lines.map(line => {
      const [pid, status, label] = line.split(/\s+/);
      return { 
        pid: pid === '-' ? '0' : pid, 
        status: status === '0' ? 'RUNNING' : 'STOPPED', 
        label 
      };
    });
  } catch (error) {
    console.error('Error fetching launchd status:', error);
    return [];
  }
}

/**
 * Get internal vitals from JSON files
 */
export async function getGniewkaVitals(): Promise<GnosisVitals | null> {
  try {
    const [statusRaw, emotionRaw, agenticRaw] = await Promise.all([
      fs.readFile(STATUS_FILE, 'utf-8').catch(() => null),
      fs.readFile(EMOTION_FILE, 'utf-8').catch(() => null),
      fs.readFile(AGENTIC_FILE, 'utf-8').catch(() => null),
    ]);

    if (!statusRaw) return null;

    const status = JSON.parse(statusRaw);
    const emotion = emotionRaw ? JSON.parse(emotionRaw) : null;
    const agentic = agenticRaw ? JSON.parse(agenticRaw) : null;

    return {
      timestamp: status.timestamp || new Date().toISOString(),
      emotion: emotion?.dominant_emotion || 'stable',
      named_state: emotion?.named_state || 'FLOW',
      valence: emotion?.valence || 0,
      arousal: emotion?.arousal || 0,
      daemons: status.daemons || {},
      memory_vectors: 12780103, // Hardcoded for demo/display or fetch from Qdrant if available
      active_protocol: status.protocol_52hz || 'BROADCASTING',
      thought_summary: status.thought_summary || '',
      agentic_metrics: agentic || {
        phase: "EXPLORATION",
        entropy: 1.0,
        efficiency: 0.0,
        goals: []
      }
    };
  } catch (error) {
    console.error('Error reading gniewka vitals:', error);
    return null;
  }
}

/**
 * Get the Constitution (GEMINI.md) content
 */
export async function getConstitution(): Promise<string> {
  try {
    const constPath = path.join(ROOT_DIR, 'GEMINI.md');
    return await fs.readFile(constPath, 'utf-8');
  } catch (error) {
    return '# NO_CONSTITUTION_FOUND';
  }
}
