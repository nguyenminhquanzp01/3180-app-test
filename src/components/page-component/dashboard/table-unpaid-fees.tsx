import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface UnFeeListProps {
  apartmentList: { apartmentNo: number; unpaidFees: { id: string; totalAmount: number; dueDate: Date }[] }[];
}

const UnFeeList: React.FC<UnFeeListProps> = ({ apartmentList }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const startIndex = currentPage * itemsPerPage;
  const selectedApartments = apartmentList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(apartmentList.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  return (
    <div className="p-4 rounded-md shadow-sm">
      <h2 className="font-bold text-2xl mb-4">Thông tin các khoản phí chưa được thanh toán</h2>
      <p className="mb-4">Danh sách căn hộ chưa thanh toán phí:</p>

      <Accordion type="multiple">
        {selectedApartments.map((apartment) => (
          <AccordionItem
            key={apartment.apartmentNo}
            value={`${apartment.apartmentNo}`}
            className="mb-3 border rounded-lg overflow-hidden shadow-sm"
          >
            <AccordionTrigger className="p-3 bg-white border-b hover:bg-gray-100">
              Căn hộ số: {apartment.apartmentNo}
            </AccordionTrigger>
            <AccordionContent className="p-3 bg-gray-50">
              <ul className="list-disc list-inside space-y-2">
                {apartment.unpaidFees.map((fee) => (
                  <li key={fee.id}>
                    <span className="font-medium">{fee.totalAmount.toLocaleString('vi-VN')}₫</span> - Hạn thanh toán{' '}
                    <span className="text-red-500">{new Date(fee.dueDate).toLocaleDateString('vi-VN')}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-end items-center pt-6 space-x-2">
        <Button
          variant="outline"
          className="items-center justify-center h-8 w-8 p-0"
          onClick={handleFirstPage}
          disabled={currentPage === 0}
        >
          <DoubleArrowLeftIcon className="items-center justify-center h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="items-center justify-center h-8 w-8 p-0"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon className="items-center justify-center h-4 w-4" />
        </Button>
        <span>
          {currentPage + 1}/{totalPages}
        </span>
        <Button
          variant="outline"
          className="items-center justify-center h-8 w-8 p-0"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          <ChevronRightIcon className="items-center justify-center h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="items-center justify-center h-8 w-8 p-0"
          onClick={handleLastPage}
          disabled={currentPage === totalPages - 1}
        >
          <DoubleArrowRightIcon className="items-center justify-center h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UnFeeList;
