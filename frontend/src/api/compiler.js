import { CompilerAPI } from './client';

export const runCode = (code, input, language) => CompilerAPI.post('/run', { code, input, language });

export const submitCode = (code, language, problemId) =>
  CompilerAPI.post('/submit', { code, language, problemId });
