import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import ModalTemplate from '.';

const CreateOrderModal = ({ isOpen, setIsOpen, submitOrder }) => {
  const initState = { single: true, quantity: 1, carton: false };
  const [productDetails, setProductDetails] = useState(initState);

  const handleOrder = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'quantity') {
      setProductDetails((pre) => ({ ...pre, [name]: value }));
    } else {
      const otherValue = name === 'single' ? 'carton' : 'single';
      setProductDetails((pre) => ({ ...pre, [name]: checked, [otherValue]: false }));
    }
  };

  const submitCurrentOrder = () => {
    if (productDetails.single) {
      submitOrder('single', productDetails.quantity);
    } else {
      submitOrder('carton', productDetails.quantity);
    }
    setProductDetails(initState);
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
            Add Order
          </Dialog.Title>
          <div className='mt-10'>
            <div className='flex my-2 justify-around'>
              <div>
                <label className='mr-1 text-gray-500 font-bold'>Single</label>
                <input
                  type='checkbox'
                  className='input-field'
                  name='single'
                  checked={productDetails.single}
                  onChange={handleOrder}
                />
              </div>
              <div>
                <label className='mr-1 text-gray-500 font-bold'>Carton</label>
                <input
                  type='checkbox'
                  className='input-field'
                  name='carton'
                  checked={productDetails.carton}
                  onChange={handleOrder}
                />
              </div>
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Quantity</label>
              <input
                className='input-field'
                name='quantity'
                type='number'
                value={productDetails.quantity}
                onChange={handleOrder}
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={submitCurrentOrder}
            >
              Submit
            </button>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-3'
              onClick={() => {
                setIsOpen(false);
                setProductDetails(initState);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default CreateOrderModal;
