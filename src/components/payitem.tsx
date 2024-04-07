
type PayItemProps = {
    product: Product;
    machine: Machine;
}

const PayItem: React.FC<PayItemProps> = (
    {
        machine,
        product
    }
) => {

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
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
        </>
    );
};

export default PayItem;