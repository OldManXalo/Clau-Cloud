import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
Config.setConcurrency(3);
// En la nube de Claude Code hay un Chromium ya instalado; en tu PC, borra esta línea
// (o deja que Remotion descargue el suyo) si esa ruta no existe.
if (process.env.REMOTION_CHROME) Config.setBrowserExecutable(process.env.REMOTION_CHROME);
