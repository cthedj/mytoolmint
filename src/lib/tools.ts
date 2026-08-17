export interface ToolEntry {
  name: string;
  description: string;
  path: string;
  category: 'Word tools' | 'Calculators' | 'Converters';
  icon: string;
}

export const tools: ToolEntry[] = [
  { name: 'Word Unscrambler', description: 'Find every word you can make from a set of letters.', path: 'word-unscrambler', category: 'Word tools', icon: 'Aa' },
  { name: 'Exact Anagram Solver', description: 'Rearrange every supplied letter into exact anagrams.', path: 'anagram-solver', category: 'Word tools', icon: '⇄' },
  { name: 'Word Finder', description: 'Search a letter rack with blanks and position patterns.', path: 'word-finder', category: 'Word tools', icon: '?' },
  { name: 'Word Counter', description: 'Count words, characters, sentences and reading time.', path: 'word-counter', category: 'Word tools', icon: '#' },
  { name: 'Percentage Calculator', description: 'Solve common percentage questions in three useful modes.', path: 'percentage-calculator', category: 'Calculators', icon: '%' },
  { name: 'Age Calculator', description: 'Calculate calendar age between any two dates.', path: 'age-calculator', category: 'Calculators', icon: '◷' },
  { name: 'VAT Calculator', description: 'Add or remove VAT using any rate.', path: 'vat-calculator', category: 'Calculators', icon: '+' },
  { name: 'Budget Calculator', description: 'Compare monthly income and expenses at a glance.', path: 'budget-calculator', category: 'Calculators', icon: '¤' },
  { name: 'Savings Calculator', description: 'Project savings with interest and monthly contributions.', path: 'savings-calculator', category: 'Calculators', icon: '↗' },
  { name: 'Length Converter', description: 'Convert metric and imperial length units instantly.', path: 'length-converter', category: 'Converters', icon: '↔' },
  { name: 'Weight Converter', description: 'Convert kilograms, pounds, ounces and more.', path: 'weight-converter', category: 'Converters', icon: '⚖' },
  { name: 'Temperature Converter', description: 'Convert Celsius, Fahrenheit and Kelvin.', path: 'temperature-converter', category: 'Converters', icon: '°' },
  { name: 'Data Storage Converter', description: 'Compare decimal and binary digital storage units.', path: 'data-storage-converter', category: 'Converters', icon: '01' },
  { name: 'Time Converter', description: 'Convert seconds, minutes, hours, days and weeks.', path: 'time-converter', category: 'Converters', icon: '⌛' },
];

export const toolCategories = ['Word tools', 'Calculators', 'Converters'] as const;
