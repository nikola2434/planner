declare module '*.module.css';
declare module '*.module.scss';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

type JSONValue = string | number | boolean | null | JSONArray | JSONObject;

interface JSONArray extends Array<JSONValue> {}

interface JSONObject {
  [key: string]: JSONValue;
}

interface Window {
  version?: string;
}
