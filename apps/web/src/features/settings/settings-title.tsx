type Props = {
  title: string;
  description: string;
};

export const SettingsTitle = ({ title, description }: Props) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg mb-1 font-semibold">{title}</h2>
      <p className="text-muted-foreground text-left text-xs/relaxed [&>a:hover]:text-primary line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4">
        {description}
      </p>
    </div>
  );
};
