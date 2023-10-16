import type webpack from 'webpack';

import { buildCssLoader } from './loaders/buildCssLoader';
import type { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const pngLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    type: 'asset/resource'
  };
  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plusins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  };
  const cssLoader = buildCssLoader(options.isDev);
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  return [codeBabelLoader, tsxCodeBabelLoader, cssLoader, svgLoader, pngLoader];
}
