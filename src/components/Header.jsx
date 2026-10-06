function Header({ language, setLanguage, t }) {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };
  
  return (
    <header className="header">
      <h1>{t('appTitle')}</h1>
      <button 
        className="btn btn-secondary language-toggle" 
        onClick={toggleLanguage}
        aria-label="Switch language"
      >
        {t('languageSwitch')}
      </button>
    </header>
  );
}

export default Header;
