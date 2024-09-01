import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin-js';

export default [
  {
    files: ['**/*.js'],
    ignores: ['node_modules/'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node, // Para Node.js
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended, // Incluye la configuración recomendada directamente
  {
    plugins: {
      '@stylistic/js': stylistic, // Asegúrate de que el plugin esté correctamente referenciado
    },
    rules: {
      '@stylistic/js/indent': ['error', 2], // Ejemplo: 2 espacios de indentación
      '@stylistic/js/linebreak-style': ['error', 'unix'], // Ejemplo: estilo de salto de línea Unix
      '@stylistic/js/quotes': ['error', 'single'], // Ejemplo: comillas simples
      '@stylistic/js/semi': ['error', 'always'], // Ejemplo: siempre usar punto y coma
    },
  },
];