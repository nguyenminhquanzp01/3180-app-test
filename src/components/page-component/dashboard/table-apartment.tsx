import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

interface ApartmentListProps {
  apartmentList: { apartmentNo: number; residents: { id: string; name: string; }[] }[];
}

const ApartmentList: React.FC<ApartmentListProps> = ({ apartmentList }) => {
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Thông tin căn hộ</h1>
      <p className="mb-6">Danh sách cư dân trong căn hộ</p>
      <Accordion type="multiple">
        {selectedApartments.map((apartment) => (
          <AccordionItem key={apartment.apartmentNo} value={`${apartment.apartmentNo}`}>
            <AccordionTrigger>Căn hộ số: {apartment.apartmentNo}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside">
                {apartment.residents.map((resident) => (
                  <li key={resident.id}>{resident.name}</li>
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
          <ChevronRightIcon className="h-4 w-4" />
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

export default ApartmentList;
