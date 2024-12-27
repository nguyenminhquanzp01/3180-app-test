"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {api} from "@/trpc/react";
import {Heading} from "@/components/common/heading";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table/data-table";
import {type FeeColumn} from "@/lib/validators";
import {columns} from "@/components/page-component/manage/fee/columns";
import {SelectWithConfirm} from "@/components/ui/select-with-confirm";
import {Loading} from "@/components/common/loading";

interface FeeClientProps {
  data: FeeColumn[];
}

export const FeeList = ({data}: FeeClientProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const {data: apartments = [], isLoading} = api.apartment.getApartmentsWithResidents.useQuery();

  const handleConfirm = () => {
    if (selected) {
      router.push(`/manage/fee/payment/create?apartmentNo=${selected}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div>
          <Heading
            title="Thông tin thu phí"
            description="Danh sách phí cần thu trong hệ thống"
          />
        </div>
        <div className="flex flex-col items-end">
          <Heading
            title="Tạo khoản thu mới"
            description="Tạo khoản thu mới cho căn hộ"
          />
          <div className="mt-2 w-64">
            <SelectWithConfirm
              options={apartments.map(apartment => ({ value: String(apartment.apartmentNo), label: `Căn hộ: ${apartment.apartmentNo}` }))}
              onConfirm={handleConfirm}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>
      </div>
      <Separator className="mb-4"/>
      <div>
        <DataTable columns={columns} data={data}/>
      </div>
    </>
  );
};
