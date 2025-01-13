interface MetadataProps {
  title: String;
  data: String;
  role: String;
}

export default function Metadata({ title, data }: MetadataProps) {
  return (
    <div className="border-l pl-4 md:pl-8 py-1 md:py-2 my-3 pr-16">
      <p className="text-caption text-gray-400 md:mb-3">{title}</p>
      <p className="text-subtitle1 md:text-h6">{data}</p>
    </div>
  );
}
