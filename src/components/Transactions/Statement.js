import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GetStatement} from "../../actions/statement.action";

const Statement = () => {
    const initialFilters = {
        created_at_gteq: '',
        created_at_lteq: '',
    };
    const dispatch = useDispatch();
    const [statementFilters, setStatementFilters] = useState(initialFilters);
    const {sales, costOfGoodsSold, expenses, grossProfit, netProfit} = useSelector((state) => ({
        sales: state.statement.sales,
        costOfGoodsSold: state.statement.costOfGoodsSold,
        expenses: state.statement.expense,
        grossProfit: state.statement.grossProfit,
        netProfit: state.statement.netProfit,
    }))

    const formatCurrency = (number) => {
        const formatter = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PKR'
        });

        return formatter.format(number);
    }

    const handleFilterChange = (e) => {
        const {name, value} = e.target;

        setStatementFilters((preState) => ({
            ...preState,
            [name]: value,
        }))
    }

    useEffect(() => {
        dispatch(GetStatement(statementFilters))
    }, [statementFilters])

    return (<div className='p-5'>
        <div className='grid grid-cols-2'>
            <h1 className='text-2xl text-gray-600 flex items-center'>Profit Loss Statement</h1>
            <div className='flex space-x-3 items-center'>
                <label className='mb-1 text-gray-500 font-bold'>Date</label>
                <div className='flex border bg-white rounded-lg p-2 space-x-3 w-auto'>
                    <input type='date' className=''
                           name='created_at_gteq'
                           onChange={handleFilterChange}/>
                    <span className='text-gray-500 font-bold'>To</span>
                    <input type='date' className='' name='created_at_lteq' onChange={handleFilterChange}/>
                </div>
            </div>
        </div>
        <div className='flex mt-20 flex-col space-y-3 w-full items-center justify-center'>
            <div className='flex w-2/4 bg-gray-100 py-2 px-6 rounded-lg  justify-between'>
                <p className='font-extrabold'>Sales</p>
                <p className={'font-bold text-gray-500'}>{formatCurrency(sales)}</p>
            </div>
            <div className='flex w-2/4 bg-gray-50 py-2 px-6 rounded-lg  justify-between'>
                <p className='font-extrabold'>Cost of goods sold</p>
                <p className={'font-bold text-gray-500'}>{formatCurrency(costOfGoodsSold)}</p>
            </div>
            <div className='flex w-2/4 bg-gray-100 py-2 px-6 rounded-lg  justify-between'>
                <p className='font-extrabold'>Gross profit</p>
                <p className={'font-bold text-gray-500'}>{formatCurrency(grossProfit)}</p>
            </div>
            <div className='flex w-2/4 bg-gray-50 py-2 px-6 rounded-lg  justify-between'>
                <p className='font-extrabold'>Expenses</p>
                <p className={'font-bold text-gray-500'}>{formatCurrency(expenses)}</p>
            </div>
            <div className='flex w-2/4 bg-gray-100 py-2 px-6 rounded-lg  justify-between'>
                <p className='font-extrabold'>Net profit / Loss</p>
                <p className={'font-bold text-gray-500'}>{formatCurrency(netProfit)}</p>
            </div>
        </div>
    </div>);
};

export default Statement;