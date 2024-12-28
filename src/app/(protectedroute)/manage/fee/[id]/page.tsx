import Fee from "./fee";

export default async function FeeExample({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <Fee id={id} />;
}
