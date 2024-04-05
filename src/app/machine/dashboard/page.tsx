'use client'
import AddButton from "@/component/addbutton";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {

    const [products, setProducts] = useState([]);

    const [machine, setMachine] = useState({} as Machine);

    const router = useRouter();

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
                      router.push("/machine/api/login");
                    }
                  } catch (error) {
                    console.error("Failed to fetch:", error);
                    router.push("/machine/login");
                  }
            }
            fetchData();
        }
    }, [router])


    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await fetch(`/machine/api/${machine.id}/products`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setProducts(data);
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch:", error);
    //         }
    //     }
    //     fetchProducts();
    // }, [machine]) 


    const handleAddProduct = async () => {
    
    }




    return (
        <div>
            <div>
                <button
                    type="button"
                    className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        <AddButton />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        </div>
        </div>
    </div>
    );
}

export default DashboardPage;