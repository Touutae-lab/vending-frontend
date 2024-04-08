import { PhotoIcon } from "@heroicons/react/16/solid";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

type PayItemProps = {
    product: Product;
    machine: Machine;
    fetchMachine: () => void;
}

const PayItem: React.FC<PayItemProps> = (
    {
        fetchMachine,
        product,
        machine
    }
) => {
    const [quantity, setQuantity] = useState(machine.StorageDetails.find((storage) => storage.product_id === product.id));
    const [total, setTotal] = useState(1);
    const [currentMoney, setCurrentMoney] = useState(0);
    const [loading, setLoading] = useState(false);
    const accept_payment = [
        5,
        10,
        20,
        50,
        100,
        500,
        1000
    ]

    const makePayment = async () => {
        setLoading(true);
        const payment = {
            machine_id: machine.UUID,
            product_id: product.id,
            quantity: total,
            amount: product.price * total,
            payment: currentMoney
        }

        const response = await fetch(`/machine/api/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payment)
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message)
            fetchMachine();
            setLoading(false);
            // @ts-ignore
            document.getElementById('my_modal_1').close();
        } else {
            if (response.status === 401) {
                window.location.href = '/machine/'
            }
            alert(response)
            setLoading(false);
        }
    }

    return (
        <>
        <a onClick={() => {
            // @ts-ignore
            document.getElementById('my_modal_1').showModal()
        }}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
        </a>
        <dialog id="my_modal_1" className="modal">
            <div className="bg-white lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-center">
                <img
                    src={product.img_url}
                    className=""/>
                <div className="flex flex-col justify-center space-y-8 mx-auto my-auto py-10 px-10">
                    <div className="border-b border-gray-900/10 pb-4">
                        <h2 className="text-2xl font-semibold leading-9 text-gray-900">Check out</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <div className="flex justify-between items-center">
                                    <span className="block text-lg font-medium leading-6 text-gray-900">
                                        {product.name}
                                    </span>
                                    <span className="text-lg text-gray-900">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-full sm:col-span-full lg:col-span-full xl:col-span-full">
                                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                    Quantity
                                </label>
                                <select
                                    id="quantity"
                                    name="quantity"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={total}
                                    onChange={(e) => setTotal(parseInt(e.target.value, 10))}>
                                    {quantity &&
                                        Array.from({length: quantity.quantity}, (_, i) => i + 1).map((i) => (
                                            <option key={i} value={i}>{i}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="col-span-full sm:col-span-full lg:col-span-full xl:col-span-full flex justify-between items-center mt-4 sm:mt-0">
                                <span className="text-sm font-medium leading-6 text-gray-900">Total</span>
                                <span className="text-lg font-semibold text-gray-900">
                                    ${(product.price * total).toFixed(2)}
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="grid col-auto">
                        <div className="flex justify-between my-4 mx-4">
                            <div className="font-bold">
                                Inserted Coin
                            </div>
                            <h1 className="font-bold">
                                ${currentMoney}
                            </h1>
                        </div>
                        <div>
                        {accept_payment.map((payment) => (
                            <button key={payment} className=" inline-block px-4 mx-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => {
                                setCurrentMoney(currentMoney + payment)
                                console.log(currentMoney)
                                console.log(quantity?.quantity)
                            }}>
                                {payment}
                            </button>
                        ))    
                        }
                        </div>
                        <div className="flex justify-between">
                        <button className="mt-4 w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" onClick={() => {
                            // @ts-ignore
                            document.getElementById('my_modal_1').close()
                            setCurrentMoney(0)
                        }}>
                            Cancel
                        </button>
                        {!loading ? 
                            <button onClick={makePayment} disabled={!(quantity && quantity.quantity > 0 && currentMoney >= total * product.price)} className="mt-4 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-slate-400">
                                        Confirm Purchase
                            </button>
                            : <span className="loading loading-spinner loading-lg"></span>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
        </>
    );
};

export default PayItem;