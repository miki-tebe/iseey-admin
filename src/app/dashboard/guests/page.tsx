import { getGuests } from "@/app/actions";
import GuestTable from "@/components/guest-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Guests() {
  const data = await getGuests();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Gäste</CardTitle>
        </CardHeader>
        <CardContent>
          <GuestTable guests={data ?? []} />
        </CardContent>
      </Card>
    </main>
  );
}
