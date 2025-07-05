import {
  GeneralSettings,
  PersonalitySettings,
  AdminDashboard,
  PrivacySecurity,
  AppearanceInterface,
} from "./components";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#121212] px-4 py-12">
      <div className="w-full max-w-3xl space-y-10">
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-semibold text-white">
          <span>⚙️</span>
          Configurações do Assistente
        </h1>
        <p className="mb-6 text-sm text-neutral-400">
          Personalize seu assistente virtual de acordo com suas preferências
        </p>
        <GeneralSettings />
        <PersonalitySettings />
        <AdminDashboard />
        <PrivacySecurity />
        <AppearanceInterface />
      </div>
    </div>
  );
}
