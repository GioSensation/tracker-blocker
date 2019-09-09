const COLOR_MAP = {
  green: '#6cb74c',
  red: '#c73739',
  orange: '#db702e'
};

// Use the Intl API to determine plural rules for translations (we use the default browser language)
const PLURAL_RULES = new Intl.PluralRules();

export {
  COLOR_MAP,
  PLURAL_RULES
}
