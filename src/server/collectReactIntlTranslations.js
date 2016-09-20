import { chalk }            from 'storyboard';

export default function collectReactIntlTranslations({
  lang,
  keys,
  translations,
  story,
}) {
  const logPrefix = `Lang ${chalk.magenta.bold(lang)}`;

  story.info('compiler', `${logPrefix} Preparing translations for React Intl...`);
  const finalTranslations = {};
  // We must always include those keys using curly braces, even if there is no translation
  Object.keys(keys).forEach((keyId) => {
    const key = keys[keyId];
    const { reactIntlId } = key;
    if (!reactIntlId) return;
    if (key.text.indexOf('{') >= 0) {
      finalTranslations[reactIntlId] = key.text;
    }
  });
  translations.forEach((translation) => {
    const key = keys[translation.keyId];
    if (!key) return;
    const { reactIntlId } = key;
    if (!reactIntlId) return;
    finalTranslations[reactIntlId] = translation.translation;
  });
  return finalTranslations;
}
