// Runs the text-to-speech container. Usage: node scripts/audio/docker.mjs setup | generate [options of generate.py]
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE = 'sejong-audio';
const VOLUME = 'sejong-audio-model';
const MODEL = 'Supertone/supertonic-3';
const REVISION = '3cadd1ee6394adea1bd021217a0e650ede09a323';

const scripts = fileURLToPath(new URL('./', import.meta.url));
const work = resolve(scripts, 'work');
const audio = resolve(scripts, '../../public/audio');

function docker(args, { allowFailure = false } = {}) {
  const { status, error } = spawnSync('docker', args, { stdio: allowFailure ? 'ignore' : 'inherit' });
  if (error) throw new Error(`Docker could not be started: ${error.message}`);
  if (status !== 0 && !allowFailure) process.exit(status ?? 1);
  return status === 0;
}

const modelVolume = `${VOLUME}:/model`;

function setup() {
  docker(['build', '-t', IMAGE, scripts]);
  docker(['volume', 'create', VOLUME]);
  const modelFiles = ['onnx/vector_estimator.onnx', 'onnx/vocoder.onnx', 'voice_styles/F1.json', 'LICENSE'];
  const check = modelFiles.map(file => `test -s /model/${file}`).join(' && ');
  if (
    docker(['run', '--rm', '--network', 'none', '-v', modelVolume, IMAGE, 'sh', '-c', check], { allowFailure: true })
  ) {
    console.log('The model is already downloaded.');
    return;
  }
  console.log('Downloading the model (about 400 MB) …');
  const download = `from huggingface_hub import snapshot_download
snapshot_download('${MODEL}', revision='${REVISION}', local_dir='/model', allow_patterns=['onnx/*', 'voice_styles/*', 'config.json', 'LICENSE'])`;
  docker(['run', '--rm', '-v', modelVolume, IMAGE, 'python', '-c', download]);
}

function generate(options) {
  if (!existsSync(work)) throw new Error('No collected texts: run "npm run audio:collect" first.');
  mkdirSync(audio, { recursive: true });
  // On Linux the files would belong to root without this.
  const user = process.getuid ? ['--user', `${process.getuid()}:${process.getgid()}`] : [];
  // No network: the texts and the model are local.
  docker([
    ...['run', '--rm', '--init', '--network', 'none', ...user],
    ...['-v', `${modelVolume}:ro`, '-v', `${scripts}:/scripts:ro`],
    ...['-v', `${work}:/work:ro`, '-v', `${audio}:/audio`],
    ...[IMAGE, 'python', '/scripts/generate.py', ...options],
  ]);
}

const [command, ...options] = process.argv.slice(2);
if (command === 'setup') setup();
else if (command === 'generate') generate(options);
else throw new Error('Usage: docker.mjs setup | generate [options]');
