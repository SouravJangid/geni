/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ElemBefore: React.ReactNode;
    }
  }
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: Record<string, any>;
  export default content;
}
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
