'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

const MachineAuthchentication: React.FC = () => {

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const uuid = form.elements.namedItem("uuid") as HTMLInputElement;
    const request: LoginRequest = {
      id: uuid.value,
    }
    try {
    const response = await fetch("/machine/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (response.ok) {
      sessionStorage.setItem("id", uuid.value)
      router.push("/machine/dashboard");
    } else {
      alert(JSON.stringify(await response.json()))
    }
  } catch (error) {
    alert("There is Internal Server Error")
  }
  }

    return (
        <div className="flex flex-col h-full justify-between">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Vening machine</span>
                            <img
                                className="h-8 w-auto"
                                src="https://www.vectorlogo.zone/logos/redpoint/redpoint-icon.svg"
                                alt=""
                            />
                        </Link>
                    </div>
                </nav>
            </header>

        <div  className="flex min-h-full flex-1 flex-row justify-center px-6 py-12 lg:px-8">

            
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.vectorlogo.zone/logos/redpoint/redpoint-icon.svg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-50">
            Sign in to your Selling Page
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="uuid" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50">
                Virtual Key
              </label>
              <div className="text-sm">
                  <a href="#" className="font-semibold text-red-600 hover:text-red-500">
                    How to get ?
                  </a>
              </div>
              </div>
              <div className="mt-2">
                <input
                  id="uuid"
                  name="uuid"
                  type="uuid"
                  autoComplete="uuid"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        </div>

      </div>

      
    </div>
    );
}

export default MachineAuthchentication;