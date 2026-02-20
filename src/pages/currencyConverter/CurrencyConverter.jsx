import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { convertCurrency } from "../../store/currency/conversionSlice"
import { fetchCurrencies } from "../../store/currency/currencySlice"

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const { data, status: currencyStatus } = useSelector(state => state.data);
  const { result, status: conversionStatus, error: conversionError } = useSelector(state => state.conversion);
  const currencyList = data ? Object.entries(data) : [];
  const handleConvert = () => {
    if (!selectedCurrency || !selectedBaseCurrency || !amount) return;
    dispatch(convertCurrency({
      from: selectedCurrency,
      to: selectedBaseCurrency,
      amount: Number(amount)
    }));
  };
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);
  return (
    <div className="h-screen w-full relative">
      <div className="absolute inset-0 z-0 bg-[#1f293a]" />

      <div className="relative flex items-center justify-center w-full h-full">

        <div className=' flex flex-col items-center justify-center h-100 w-auto sm:w-150 border bg-white border-black rounded-3xl'>
          <div className='flex-1 border border-secondary rounded-3xl w-full p-7 flex flex-col items-center justify-center'>
            <h1 className='font-Poppins text-2xl mb-6'>Currency Converter</h1>
            <div className='flex flex-col sm:flex-row w-full sm:w-100 gap-3 items-center justify-between pb-5'>

              <div className='flex flex-row items-center justify-center gap-4 w-full'>
                <label className='font-bold w-9'>From</label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency} >
                  <SelectTrigger className="w-full sm:w-[180.01px] ">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {currencyStatus === "loading" && (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      )}

                      {currencyStatus === "succeeded" && currencyList.map(([code]) => (
                        <SelectItem key={code} value={code} >{code} </SelectItem>
                      ))}

                      {currencyStatus === "failed" && (
                        <SelectItem value="error" disabled>Failed to load</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-row items-center justify-center gap-8 sm:gap-4 w-full'>
                <label className='font-bold '>To</label>
                <Select value={selectedBaseCurrency} onValueChange={setSelectedBaseCurrency}>
                  <SelectTrigger className="w-full sm:w-[180.01px]">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {currencyStatus === "loading" && (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      )}

                      {currencyStatus === "succeeded" && currencyList.map(([code]) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}

                      {currencyStatus === "failed" && (
                        <SelectItem value="error" disabled>Failed to load</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex flex-row items-center justify-center gap-4 w-full'>
              <label className='font-bold'>Amount</label>
              <Input
                type="number"
                className="w-full sm:w-50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          </div>


          <div className="mt-9 sm:mt-2 absolute top-5/9 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <Button
              onClick={handleConvert}
              disabled={conversionStatus === "loading"}
            >
              {conversionStatus === "loading" ? "Converting..." : "Convert"}
            </Button>
          </div>

          <div className='mt-6 sm:mt-0 flex-1 border-t-2  border-gray-400  rounded-3xl w-full p-7 flex items-center justify-center'>

            {conversionStatus === "idle" && (
              <p className="text-gray-400">Select currencies and amount</p>
            )}

            {conversionStatus === "loading" && <p>Loading...</p>}

            {conversionStatus === "succeeded" && (
              <p className="text-lg font-bold">
                {amount} {selectedCurrency} = {result} {selectedBaseCurrency}
              </p>
            )}

            {conversionStatus === "failed" && (
              <p className="text-red-500">{conversionError}</p>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter;
