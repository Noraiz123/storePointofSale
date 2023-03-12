import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import ModalTemplate from '.';
import { CreateCashflow, UpdateCashflow } from '../../actions/cashflow.action';

const AddCashFlowModal = ({ isOpen, setIsOpen, cashflowData }) => {
  const initState = {
    customer: '',
    vendor: '',
    details: '',
    type: '',
    total: '',
    received: '',
  };
  const { customers, vendors } = useSelector((state) => ({
    customers: state.customers.allCustomers,
    vendors: state.vendors,
  }));
  const dispatch = useDispatch();
  const [cashflowDetails, setCashflowDetails] = useState(initState);

  const handleCashflowFields = (e) => {
    const { name, value } = e.target;
    setCashflowDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (cashflowData) {
      const { customer } = cashflowData;
      setCashflowDetails({ ...cashflowData, customer: customer._id });
    }
  }, [cashflowData]);

  let remaining = Number(cashflowDetails.total) - Number(cashflowDetails.received);

  const handleCreateCashflow = () => {
    if (cashflowData) {
      const { _id } = cashflowDetails;
      dispatch(UpdateCashflow(_id, { ...cashflowDetails, remaining })).then(() => {
        setIsOpen(false);
        setCashflowDetails(initState);
      });
    } else {
      dispatch(CreateCashflow({ ...cashflowDetails, remaining })).then(() => {
        setIsOpen(false);
        setCashflowDetails(initState);
      });
    }
  };
  const customerOptions = customers.map((e) => ({ label: e.name, value: e._id }));
  const vendorOptions = vendors.map((e) => ({ label: e.name, value: e._id }));

  const handleCustomerChange = (e) => {
    if (e?.value) {
      setCashflowDetails((pre) => ({
        ...pre,
        customer: e.value,
      }));
    }
  };

  return (
    <div>
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='inline-block w-96 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl p-6'>
          <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 border-b pb-2'>
            {cashflowData ? 'Update' : 'Add'} Cash Flow
          </Dialog.Title>
          <div className='mt-10'>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Cash Type</label>
              <select className='input-field' name='type' value={cashflowDetails.type} onChange={handleCashflowFields}>
                <option selected value=''>
                  Select flow type...
                </option>
                <option value='Payable'>Payable</option>
                <option value='Receivable'>Receivable</option>
              </select>
            </div>
            <div className='flex my-2'>
              <Select
                options={customerOptions}
                placeholder='Select Customer...'
                value={
                  cashflowDetails.customer !== ''
                    ? customerOptions.find((e) => e.value === cashflowDetails.customer)
                    : null
                }
                isClearable
                onChange={handleCustomerChange}
              />
            </div>
            <div className='flex my-2'>
              <Select
                options={vendorOptions}
                placeholder='Select Vendor...'
                value={
                  cashflowDetails.vendor !== '' ? customerOptions.find((e) => e.value === cashflowDetails.vendor) : null
                }
                isClearable
                onChange={handleCustomerChange}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Details</label>
              <textarea
                className='input-field'
                type=''
                name='details'
                value={cashflowDetails.details}
                onChange={handleCashflowFields}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Total Amount</label>
              <input
                className='input-field'
                type='text'
                name='total'
                onChange={handleCashflowFields}
                value={cashflowDetails.total}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Received / Paid Amount</label>
              <input
                className='input-field'
                type='text'
                name='received'
                onChange={handleCashflowFields}
                value={cashflowDetails.received}
              />
            </div>
            <div className='flex flex-col my-2'>
              <label className='mb-1 text-gray-500 font-bold'>Remaining Amount</label>
              <input className='input-field' type='text' name='remaining' disabled value={remaining} />
            </div>
          </div>
          <div className='mt-4'>
            <button
              type='button'
              onClick={handleCreateCashflow}
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
            >
              Submit
            </button>
            <button
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ml-3'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default AddCashFlowModal;
