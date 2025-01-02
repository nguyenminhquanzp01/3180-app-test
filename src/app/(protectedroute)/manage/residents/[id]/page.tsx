import Resident from "./res"

export default async function ResidentExample({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    return (
        <Resident id={id}/>
    )
  }