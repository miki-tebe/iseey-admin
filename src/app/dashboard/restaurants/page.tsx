import { getRestaurants } from "@/app/actions";
import RestaurantTable from "@/components/restaurant-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Restaurants() {
  const data = await getRestaurants();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Restaurants</h1>
      </div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>All Restaurants</CardTitle>
        </CardHeader>
        <CardContent>
          <RestaurantTable restaurants={data} />
        </CardContent>
      </Card>
    </main>
  );
}
