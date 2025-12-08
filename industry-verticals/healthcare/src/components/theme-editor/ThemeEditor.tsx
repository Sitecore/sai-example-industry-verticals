import React, { JSX, useMemo } from 'react';
import Head from 'next/head';
import { Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

// The type of the obj kept in the FontOptions field
type FontOptions = {
  label: string;
  suffix: string;
  fonts: {
    name: string;
    link: string;
  }[];
}[];

interface Fields {
  CustomCSS: Field<string>;
  ThemeDefaults: Field<string>;
  FontOptions: Field<string>;
}

export type ThemeEditorProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

// Helper: parse "--var: value;" into key/value pairs
const parseCssVariables = (css: string) => {
  const vars: Record<string, string> = {};
  if (!css) return vars;

  const regex = /(--[\w-]+)\s*:\s*([^;]+);?/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    vars[match[1].trim()] = match[2].trim();
  }
  return vars;
};

// Extract names from --font-* variables
const getSelectedFontNames = (vars: Record<string, string>) => {
  const names: string[] = [];
  for (const [key, value] of Object.entries(vars)) {
    if (key.includes('font')) {
      const match = value.match(/['"]?([^,'"]+)['"]?/);
      if (match) names.push(match[1]);
    }
  }
  return names;
};

// Find matching Google Font links
const findFontLinks = (fontData: FontOptions, selectedNames: string[]) => {
  const links: string[] = [];
  for (const group of fontData) {
    for (const font of group.fonts) {
      if (selectedNames.includes(font.name)) {
        links.push(font.link);
      }
    }
  }
  return links;
};

export const Default = (props: ThemeEditorProps): JSX.Element => {
  const customCssValue = props.fields.CustomCSS?.value || '';
  const fontOptionsValue = props.fields.FontOptions?.value || '';

  const varMap = parseCssVariables(customCssValue);

  const fonts = useMemo(() => {
    try {
      return fontOptionsValue ? JSON.parse(fontOptionsValue) : ([] as FontOptions);
    } catch (e) {
      console.error('Invalid JSON in FontOptions:', e);
      return [];
    }
  }, [fontOptionsValue]);

  const selectedFontNames = getSelectedFontNames(varMap);
  const selectedFontLinks = findFontLinks(fonts, selectedFontNames);

  return (
    <>
      {/* Early application on initial load */}
      <Head>
        {/* Load Google Fonts based on selected theme */}
        {selectedFontLinks.length > 0 && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {selectedFontLinks.map((href) => (
              <link key={href} rel="stylesheet" href={href} />
            ))}
          </>
        )}

        {/* Early variable injection to avoid FOUC */}
        <script
          id="apply-theme-vars"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var vars = ${JSON.stringify(varMap)};
                  for (var name in vars) {
                    if (Object.prototype.hasOwnProperty.call(vars, name)) {
                      document.documentElement.style.setProperty(name, vars[name]);
                    }
                  }
                } catch(e) {
                  console.error('Dynamic theme injection failed', e);
                }
              })();
            `,
          }}
        />
      </Head>
    </>
  );
};
