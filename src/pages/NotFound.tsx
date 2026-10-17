import { Link } from 'react-router-dom';
import { useLanguage } from '../state/LanguageProvider';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <h1 className="text-3xl font-bold">{t('nf.title')}</h1>
      <p className="mt-2 text-gray-600">{t('nf.body')}</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {t('nf.back')}
      </Link>
    </div>
  );
}
