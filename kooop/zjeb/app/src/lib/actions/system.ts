'use server';

import os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';
import { SystemMetrics } from '../RitualVex';

const execAsync = promisify(exec);

export async function getSystemStats(): Promise<SystemMetrics> {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const ram = (totalMem - freeMem) / totalMem;
  
  const load = os.loadavg()[0]; // 1 min load
  const cpus = os.cpus().length;
  const cpu = Math.min(1, load / cpus);

  let disk = 0.5; // fallback
  try {
    const { stdout } = await execAsync('df -h / | tail -1 | awk \'{print $5}\'');
    disk = parseInt(stdout.replace('%', '')) / 100;
  } catch (e) {
    console.error('Failed to get disk stats:', e);
  }

  return {
    ram,
    cpu,
    disk,
    uptime: os.uptime()
  };
}
