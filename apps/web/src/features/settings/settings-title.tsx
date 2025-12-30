type Props = {
  title: string;
  description: string;
};

export const SettingsTitle = ({ title, description }: Props) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl mb-1 font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
