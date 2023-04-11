import type webpack from 'webpack';

import { buildCssLoader } from './loaders/buildCssLoader';
import type { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const pngLoader = {
    test: /\.png/,
    type: 'asset/resource'
  };
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  };
  const cssLoader = buildCssLoader(isDev);
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  };
  return [typescriptLoader, cssLoader, svgLoader, pngLoader];
}
