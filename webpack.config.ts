import path from 'path';
import type webpack from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv): webpack.Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales')
  };

  const mode = env.mode ?? 'development';
  const isDev = mode === 'development';
  const PORT = env.port ?? 3000;
  const analyze = env.analyze ?? false;
  const apiUrl = env.apiUrl || 'http://localhost:8000';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    analyze,
    apiUrl,
    project: 'frontend'
  });

  return config;
};
