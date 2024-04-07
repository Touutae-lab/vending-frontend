'use client'
import AddButton from "@/components/addbutton";
import { PhotoIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {

    // const [products, setProducts] = useState([]);

    const [machine, setMachine] = useState({} as Machine);

    const router = useRouter();

    const products = [
        {
          id: 1,
          name: 'Basic Tee',
          href: '#',
          imageSrc: '/cass-fresh-lager-cans-korea-355.jpg',
          imageAlt: "Front of men's Basic Tee in black.",
          price: '$35',
          color: 'Black',
        },
      ]

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
                      const data: Machine = await response.json();
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
    }, [router])




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
            {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}

            </div>
        </div>
    </div>
    );
}

export default DashboardPage;