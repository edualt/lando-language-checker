export const tokenizer = {
  root: [
    [/func\s+main\s*\(/, "keyword"],
    [/\bfunc\b/, "keyword"],
    [/\bif\b/, 'keyword'],
    [/\bwhile\b/, 'keyword'],
    [/\breturn\b/, 'keyword'],
    [/\btrue\b|\bfalse\b/, 'constant.language'],
    [/\bprint\b/, 'keyword'],
    [/[a-zA-Z_]\w*/, 'variable'],
    [/"(\\.|[^"\\])*"/, 'string'],
    [/\d+\.\d+|\d+/, 'number'],
    [/[{}]/, 'delimiter'],
  ]
}

export const landoCompletion = {
  provideCompletionItems: (model, position) => {
    var suggestions = [
      {
        label: "print",
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: "print(${1:});",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
    ];
    return { suggestions: suggestions };
  },
};

// landoTheme.js
export const landoTheme = {
  base: "vs",
  inherit: false,
  rules: [
    { token: "keyword", foreground: "808080" },
  ],
  colors: {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#D4D4D4",
    "editor.selectionBackground": "#264F78",
    "editor.lineHighlightBackground": "#2A2A2A",
    "editorCursor.foreground": "#569CD6",
    "editorWhitespace.foreground": "#3B3B3B",
  },
  // fontsize 22
  
};
