/**
 * One labelled fact in a case study's header strip (duration, role, client).
 * Renamed from `Metadata` so it stops colliding with Next's `Metadata` type,
 * which the pages that use it now import. The old prop types were `String`
 * (the boxed object, not the primitive) and declared a required `role` that
 * no caller ever passed.
 */
interface MetaItemProps {
  title: string;
  data: string;
}

export default function MetaItem({ title, data }: MetaItemProps) {
  return (
    <div className="border-l border-border-default pl-4 md:pl-8 py-1 md:py-2 my-3 pr-16">
      <p className="text-caption text-content-muted md:mb-3">{title}</p>
      <p className="text-subtitle1 md:text-h6">{data}</p>
    </div>
  );
}
