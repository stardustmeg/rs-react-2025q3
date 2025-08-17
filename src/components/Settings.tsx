import LanguageSwitch from '@/components/LanguageSwitch';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';

const Settings: React.FC = () => {
  return (
    <div className="flex place-items-center gap-2">
      <ThemeSwitch />
      <LanguageSwitch />
    </div>
  );
};

export default Settings;
