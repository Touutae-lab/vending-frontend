'use client'
import AddButton from "@/component/addbutton";
import { PhotoIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/16/solid";
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
            className="object-contain max-w-[80%] justify-center mx-auto overflow-hidden"
            src="/machine.jpeg"
            >
            </img>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

                
        </div>
        </div>
    </div>
    );
}

export default DashboardPage;