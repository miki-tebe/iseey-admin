"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getRestaurant, updateRestaurant } from "@/app/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const editRestaurantFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255),
  address: z.string().max(255),
  email: z.string().email(),
  phoneNumber: z.string(),
  number_of_tables: z.string(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  logo: z.string().optional(),
  menu: z.string().optional(),
  drink: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

export default function EditRestaurant({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [avatarSrc, setAvatarSrc] = useState("/images/logo4.png");
  const [menuURL, setMenuURL] = useState(true);
  const [drinkURL, setDrinkURL] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof editRestaurantFormSchema>>({
    resolver: zodResolver(editRestaurantFormSchema),
  });

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const data = await getRestaurant({ id: params.id });
        form.reset({
          name: data.name,
          address: data.address,
          email: data.email,
          phoneNumber: data.phoneNumber.original,
          number_of_tables: data.number_of_tables.toString(),
          facebook: data.facebook,
          instagram: data.instagram,
          website: data.website,
        });
        setAvatarSrc(data.image);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRestaurant();
  }, [form, params.id]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleEditClick() {
    fileInputRef.current?.click();
  }

  function onSubmit(values: z.infer<typeof editRestaurantFormSchema>) {
    updateRestaurant(values, params.id).then((result) => {
      toast(result.message);
      if (result.success === 200) {
        router.push("/dashboard/restaurants");
      }
    });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Edit Restaurant</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 lg:pt-32">
            <div className="relative">
              <Avatar className="w-44 h-44">
                <AvatarImage src={avatarSrc} alt="Profile picture" />
                <AvatarFallback>{form.getValues("name")}</AvatarFallback>
              </Avatar>
              <div
                onClick={handleEditClick}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer"
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit profile picture</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-bold">{form.getValues("name")}</h2>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardContent className="space-y-5 pt-5">
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restaurant Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="number_of_tables"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Tables</FormLabel>
                        <FormControl>
                          <Input placeholder="Number of Tables" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="Instagram" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="menu"
                      checked={menuURL}
                      onCheckedChange={setMenuURL}
                    />
                    <Label htmlFor="menu">Menu URL</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {menuURL ? (
                      <FormField
                        control={form.control}
                        name="menu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Menu</FormLabel>
                            <FormControl>
                              <Input placeholder="Menu URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="menu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Menu</FormLabel>
                            <FormControl>
                              <Input type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="drink"
                      checked={drinkURL}
                      onCheckedChange={setDrinkURL}
                    />
                    <Label htmlFor="drink">Drink Menu URL</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {drinkURL ? (
                      <FormField
                        control={form.control}
                        name="drink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Drink Menu</FormLabel>
                            <FormControl>
                              <Input placeholder="Drink Menu URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="drink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Drink Menu</FormLabel>
                            <FormControl>
                              <Input type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
