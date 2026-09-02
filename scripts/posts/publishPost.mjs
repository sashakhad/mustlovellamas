import { execSync } from 'child_process';
import { logError, logInfo, logSuccess } from '../../lib/utils/logging.mjs';

try {
  execSync('git add posts/', { stdio: 'inherit' });

  try {
    execSync('git diff --cached --exit-code', { stdio: 'pipe' });
    logInfo('No post changes to commit.');
    process.exit(0);
  } catch {
    // staged changes exist
  }

  const today = new Date().toISOString().split('T')[0];
  execSync(`git commit -m "Publish blog posts ${today}"`, { stdio: 'inherit' });
  logSuccess('Posts committed.');
  logInfo('Push to main when you want Vercel to publish.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  logError(`Failed to publish post: ${message}`);
  process.exit(1);
}
