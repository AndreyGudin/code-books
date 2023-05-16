declare module '*.scss' {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  import type React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

declare module '*.png';
declare const __IS_DEV__: boolean;
declare const __API__: string;
