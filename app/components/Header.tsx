export default function Header({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="my-8">
      <h1 className="text-center text-2xl mb-2">{title}</h1>
      {description && <p className="mx-4">{description}</p>}
    </div>
  );
}
