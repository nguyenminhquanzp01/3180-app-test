'use client'
import { Loading } from "@/components/common/loading";
import { ResidentForm } from "@/components/page-component/manage/resident/resident-form";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import BreadCrumb from "@/components/ui/breadcrumb";

const Resident = ({id}: {id: string}) => {
  const router = useRouter();
//   const { id } = router.query;
    const searchParams = useSearchParams();
    // const id = searchParams.get('id')
    // console.log(id)
  if (typeof id !== "string") {
    return <Loading />;
  }

  const { data: resident, isLoading } = api.resident.getById.useQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  const breadcrumbItems = resident
    ? [
      { title: 'Quản lý cư dân', link: '/manage/residents' },
      { title: 'Sửa thông tin', link: `/manage/residents/${resident.id}` }
    ]
    : [
      { title: 'Quản lý cư dân', link: '/manage/residents' },
      { title: 'Tạo mới', link: '/manage/residents/new' }
    ];

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ResidentForm initialData={resident} />
      </div>
    </div>
  );
};

export default Resident;
