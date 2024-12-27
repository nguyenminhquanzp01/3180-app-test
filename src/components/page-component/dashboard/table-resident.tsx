import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface ResidentListProps {
    isOpen: boolean;
    onClose: () => void;
  residentList: { id: string; name: string; phoneNumber: string; apartmentNo: number; vehicle: string }[];
}

const ResidentList: React.FC<ResidentListProps> = ({ residentList }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const startIndex = currentPage * itemsPerPage;
  const selectedResidents = residentList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(residentList.length / itemsPerPage);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold">Thông tin cư dân</h1>
      <p className="text-gray-600 mb-4">Danh sách các cư dân trong hệ thống</p>

      <Accordion type="multiple">
        {selectedResidents.map((resident) => (
          <AccordionItem key={resident.id} value={resident.id}>
            <AccordionTrigger>{resident.name}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside">
                <li>Số điện thoại: {resident.phoneNumber}</li>
                <li>Số căn hộ: {resident.apartmentNo}</li>
                <li>Phương tiện: {resident.vehicle}</li>
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

export default ResidentList;