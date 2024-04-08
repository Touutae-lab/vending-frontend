'use client'
import AddButton from "@/components/addbutton";
import PayItem from "@/components/payitem";
import { PhotoIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const DashboardPage: React.FC = () => {

    const [machine, setMachine] = useState<Machine>();

    const router = useRouter();

    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (!id) {
            router.push("/machine/api/login");
        } else {
            const fetchData = async () => 
            {
                try {
                    const response = await fetch(`/machine/api/${id}`);
                    if (response.ok) {
                      const data: Machine = await JSON.parse(await response.text());
                      if (typeof data.StorageDetails === 'string') {
                        data.StorageDetails = JSON.parse(data.StorageDetails);
                      } 
                      setMachine(data);
                    } else {
                      router.push("/machine");
                    }
                  } catch (error) {
                    console.error("Failed to fetch:", error);
                    router.push("/machine/login");
                  }
            }
            fetchData();
        }
    }, [])

    useEffect(() => {
      const fetchData = async (id: number) => {
        try {
            const response = await fetch(`/machine/api/product/${id}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
      }
      const fetchProducts = async (machine: Machine) => {
        const items = await Promise.all(
          machine.StorageDetails.map(async (storage) => {
            const data = await fetchData(storage.product_id);
            return data;
          })
        );
        const filteredItems = items.filter((item): item is Product => item !== undefined);
        setProducts(filteredItems);
      };
      
      console.log(machine);
      if (machine && machine.StorageDetails) {
        fetchProducts(machine);
      }
      }, [machine])


      useEffect(() => {
        console.log(products);
      }, [products])
    


    return (
    <div>
        <nav className="flex items-center justify-end p-6 lg:px-8">
              <AddButton/>
          </nav>
        <div>
            <img 
            className="object-cover max-w-[80%] justify-center mx-auto overflow-hidden"
            src="/machine.jpeg"
            >
            </img>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.map((product) => (
            <div key={product.id} className="group relative">
              <a href="#" onClick={(e) => e.preventDefault()}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.img_url}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              </a>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                  <PayItem product={product} machine={machine}/>

                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}$</p>
              </div>
            </div>
          ))}

            </div>
        </div>
    </div>
    );
}

export default DashboardPage;