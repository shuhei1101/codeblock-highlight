export interface HighlightConfig {
  languages: string;
  backgroundColor: string;
}

export interface CodeBlock {
  range: {
    start: {
      line: number;
      character: number;
    };
    end: {
      line: number;
      character: number;
    };
  };
  language: string;
}
