import { palette } from './tokens';

type TokenColor = { scope: string[]; settings: { foreground: string; fontStyle?: string } };

export type CodeTheme = {
  name: string;
  type: 'dark';
  colors: Record<string, string>;
  tokenColors: TokenColor[];
};

// Syntax colors from the brand palette only: keywords glow holo, strings are jalapeño, numbers run ripe.
export const holopenoCodeTheme: CodeTheme = {
  name: 'holopeno',
  type: 'dark',
  colors: {
    'editor.background': palette.soot,
    'editor.foreground': palette.bone,
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: palette.ash, fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
      settings: { foreground: palette.holo },
    },
    {
      scope: ['string', 'string.template', 'punctuation.definition.string'],
      settings: { foreground: palette.jalapeno },
    },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.character'],
      settings: { foreground: palette.ripe },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: palette.bone, fontStyle: 'bold' },
    },
    {
      scope: ['entity.name.type', 'support.type', 'entity.name.class'],
      settings: { foreground: palette.holo },
    },
    {
      scope: ['variable', 'variable.other', 'meta.definition.variable'],
      settings: { foreground: palette.bone },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: palette.ash },
    },
  ],
};
