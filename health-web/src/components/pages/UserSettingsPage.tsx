type Props = {
  onSignOut?: () => void;
};

export default function UserSettingsPage({ onSignOut }: Props) {
  return (
    <div className="w-full h-full p-3 space-y-2">
      <button
        className="bg-red-950 w-full h-13 rounded-md text-lg font-bold text-primary-a40
        shadow-inner shadow-red-900/50"
        onClick={onSignOut}
      >
        SIGN OUT
      </button>
    </div>
  );
}
