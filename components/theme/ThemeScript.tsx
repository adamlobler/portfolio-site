import {
  AXES,
  AXIS_COOKIE,
  AXIS_DEFAULTS,
  AXIS_NAMES,
  SYSTEM_PREFERENCE,
} from "../../lib/theme/axes";

/**
 * The whole reason every route can still be statically generated.
 *
 * Reading the cookie on the server (`cookies()`) would render correct `data-*`
 * into the HTML, but it also opts the root layout — and therefore every page —
 * into dynamic rendering. Instead the HTML ships with no axis attributes at
 * all and falls back to the `:root` block the token build already emits, and
 * this script applies the visitor's choice synchronously in `<head>`, before
 * the first paint. No flash, no `mounted` gate, no per-request render.
 *
 * The manifest below is serialised from `tokens/generated/tokens.ts`, so the
 * script cannot drift from the CSS: add an axis and this grows a field.
 */

type Entry = {
  a: string;
  v: readonly string[];
  d: string;
  m?: { q: string; v: string };
};

const MANIFEST: Entry[] = AXIS_NAMES.map((axis) => {
  const preference = SYSTEM_PREFERENCE[axis];
  return {
    a: AXES[axis].attribute,
    v: AXES[axis].values,
    d: AXIS_DEFAULTS[axis] as string,
    ...(preference ? { m: { q: preference.query, v: preference.value } } : {}),
  };
});

/**
 * Hand-minified on purpose: it is inlined into every document and runs on the
 * critical path, so it stays a few hundred bytes and never parses JSON it
 * does not need. Wrapped in try/catch because a failure here must degrade to
 * the `:root` default theme rather than to a blank page.
 */
const SCRIPT = `(function(){try{var M=${JSON.stringify(
  MANIFEST
)},r=document.documentElement,c=document.cookie.match(/(?:^|; )${AXIS_COOKIE}=([^;]*)/),p=c?decodeURIComponent(c[1]).split("."):[];for(var i=0;i<M.length;i++){var e=M[i],v=p[i];if(e.v.indexOf(v)<0){v=e.m&&window.matchMedia(e.m.q).matches?e.m.v:e.d}r.setAttribute(e.a,v)}}catch(_){}})()`;

export default function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}
