import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCashflow, GetCashflow } from '../../actions/cashflow.action';
import AddCashFlowModal from '../Modals/AddCashflow';

const Cashflow = () => {
  const dispatch = useDispatch();
  const {
    cashflow,
    customers,
    totalPages,
    totalReceivable,
    totalPayable,
    currentPage,
    vendors,
    noOfCashflow,
    cashflowStats,
    stores,
  } = useSelector((state) => ({
    cashflow: state.cashflow.cashflow,
    customers: state.customers.allCustomers,
    vendors: state.vendors,
    totalPages: state.cashflow.totalPages,
    totalReceivable: state.cashflow.totalReceivable,
    totalPayable: state.cashflow.totalPayable,
    currentPage: state.cashflow.currentPage,
    noOfCashflow: state.cashflow.noOfCashflow,
    cashflowStats: state.cashflow.cashflowStats,
    stores: state.stores,
  }));
  const initialFilters = {
    created_at_gteq: '',
    created_at_lteq: '',
    store: '',
    customer: '',
    vendor: '',
    type: '',
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const [cashflowFilter, setCashflowFilter] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [cashData, setCashData] = useState(null);
  const [cashflowPagination, setCashflowPagination] = useState({ perPage: 10, page: 1 });
  useEffect(() => {
    dispatch(GetCashflow({ query: cashflowFilter }, cashflowPagination));
  }, [dispatch, cashflowFilter, cashflowPagination]);

  const handleCashFlowFilterChange = (e) => {
    const { name, value } = e.target;
    setCashflowFilter((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleExpensePageChange = (page) => {
    setCashflowPagination({ ...cashflowPagination, page });
  };

  const CashUpdateHandler = (data) => {
    setCashData(data);
    setIsOpen(true);
  };

  const CashDeleteHandler = (id) => {
    dispatch(DeleteCashflow(id, { query: cashflowFilter }, cashflowPagination));
  };

  return (
    <div>
      <div className='p-5 border-b flex justify-between flex-wrap'>
        <h1 className='text-2xl text-gray-600 flex items-center'>Cashflow</h1>
        {user.role === 'superAdmin' && (
          <div className='flex flex-col'>
            <label className='mb-1 text-gray-500 font-bold'>Store</label>
            <select className='input-select' name='store' onChange={handleCashFlowFilterChange}>
              <option value='' selected>
                All
              </option>
              {stores &&
                stores.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className={`flex flex-col`}>
          <label className='mb-1 text-gray-500 font-bold'>Type</label>
          <select className='input-field' name='type' onChange={handleCashFlowFilterChange}>
            <option selected value=''>
              Select flow type...
            </option>
            <option value='Payable'>Payable</option>
            <option value='Receivable'>Receivable</option>
          </select>
        </div>
        <div className={`flex flex-col`}>
          <label className='mb-1 text-gray-500 font-bold'>Customer</label>
          <div className='flex'>
            <select className='input-field' name='customer' onChange={handleCashFlowFilterChange}>
              <option selected value=''>
                Select customer...
              </option>
              {customers.map((e) => (
                <option value={e._id}>{e.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={`flex flex-col`}>
          <label className='mb-1 text-gray-500 font-bold'>Vendor</label>
          <div className='flex'>
            <select className='input-field' name='vendor' onChange={handleCashFlowFilterChange}>
              <option selected value=''>
                Select vendor...
              </option>
              {vendors.map((e) => (
                <option value={e._id}>{e.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={`flex flex-col`}>
          <label className='mb-1 text-gray-500 font-bold'>Date</label>
          <div className='flex border bg-white rounded-lg p-2 space-x-3'>
            <input type='date' className='' name='created_at_gteq' onChange={handleCashFlowFilterChange} />
            <span className='text-gray-500 font-bold'>To</span>
            <input type='date' className='' name='created_at_lteq' onChange={handleCashFlowFilterChange} />
          </div>
        </div>
      </div>

      <div className='my-5 grid xl:grid-cols-3 sm:grid-cols-1 gap-4'>
        <div className='border p-3'>
          <div className='h-60v overflow-y-auto my-6'>
            <div className='my-4 h-4/6'>
              <table className='whitespace-nowrap order-table w-full'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total Cashflow</th>
                    <th>Received</th>
                    <th>Remaining</th>
                    <th>No Of Cashflow</th>
                  </tr>
                </thead>
                <tbody>
                  {cashflowStats &&
                    cashflowStats.map((e) => (
                      <tr key={e._id}>
                        <td className=''>{new Date(e._id).toDateString()}</td>
                        <td className=''>{e.totalCashflow}</td>
                        <td className=''>{e.received}</td>
                        <td className=''>{e.remaining}</td>
                        <td className=''>{e.count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='xl:col-span-2'>
          <div className='border-b pb-2 flex justify-between p-2'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Total</h1>
            <div>
              <label className='mr-1 text-gray-500 font-bold'>Display records</label>
              <select
                className='input-select'
                value={cashflowPagination.perPage}
                onChange={(e) => setCashflowPagination({ ...cashflowPagination, perPage: e.target.value })}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className='grid xl:grid-cols-4 sm:grid-cols-1 mt-3'>
            <div className='space-y-3 text-sm font-medium sm:grid sm:grid-cols-2 xl:block my-3'>
              <div className='w-56 h-40 bg-green-100 rounded-md'>
                <div className='text-2xl text-green-900 flex flex-col h-full items-center justify-center'>
                  <h1>Total Receivable</h1>
                  <h1>Rs {Math.round(totalReceivable)}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-red-100 rounded-md'>
                <div className='text-2xl text-red-900 flex flex-col h-full items-center justify-center'>
                  <h1>Total Payable</h1>
                  <h1>Rs {Math.round(totalPayable)}</h1>
                </div>
              </div>
              <div className='w-56 h-40 bg-yellow-100 rounded-md'>
                <div className='text-2xl text-yellow-900 flex flex-col h-full items-center justify-center'>
                  <h1>No of Cashflow</h1>
                  <h1>{noOfCashflow}</h1>
                </div>
              </div>
            </div>
            <div className='col-span-3 my-3'>
              <div className='h-60v overflow-y-auto border'>
                <div className='h-4/6'>
                  <table className='whitespace-nowrap order-table w-full'>
                    <thead>
                      <tr>
                        <th>Payee Name</th>
                        <th>Payee Contact</th>
                        <th>Type</th>
                        <th>Total</th>
                        <th>Received / Paid</th>
                        <th>Remaining</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashflow &&
                        cashflow?.map((e) => (
                          <tr key={e._id}>
                            <td className=''>{e.customer.name || 'N/A'}</td>
                            <td className=''>{e.customer.phoneNo}</td>
                            <td className=''>{e.type}</td>
                            <td className=''>Rs {e.total}</td>
                            <td className=''>Rs {e.received}</td>
                            <td className=''>Rs {e.remaining}</td>
                            <td>{new Date(e.createdAt).toDateString()}</td>
                            <td>
                              {user?.role !== 'superAdmin' && (
                                <>
                                  <button className='btn-sm-green ml-3' onClick={() => CashUpdateHandler(e)}>
                                    <PencilAltIcon className='h-4' />
                                  </button>
                                  <button className='btn-sm-red ml-3' onClick={() => CashDeleteHandler(e._id)}>
                                    <TrashIcon className='h-4' />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {cashflow?.length > 0 && (
                <div className='flex my-3 justify-center'>
                  <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                      <li
                        className='page-item'
                        onClick={() => currentPage !== 1 && handleExpensePageChange(currentPage - 1)}
                      >
                        <button className='page-link'>
                          <span aria-hidden='true'>&laquo;</span>
                        </button>
                      </li>
                      {Array(totalPages)
                        .fill()
                        .map((e, i) => (
                          <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 && 'active'}`}
                            onClick={() => handleExpensePageChange(i + 1)}
                          >
                            <button className='page-link' href='.'>
                              {i + 1}
                            </button>
                          </li>
                        ))}
                      <li
                        className='page-item'
                        onClick={() => currentPage < totalPages && handleExpensePageChange(currentPage + 1)}
                      >
                        <button className='page-link'>
                          <span aria-hidden='true'>&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddCashFlowModal isOpen={isOpen} setIsOpen={setIsOpen} cashflowData={cashData} />
    </div>
  );
};

export default Cashflow;
