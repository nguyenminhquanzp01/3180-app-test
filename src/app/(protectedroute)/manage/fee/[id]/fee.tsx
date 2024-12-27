"use client";
import { Loading } from "@/components/common/loading";
// import { ResidentForm } from "@/components/page-component/manage/resident/resident-form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React from "react";
import PaymentForm from "@/components/page-component/manage/fee/payment/payment-form";

const Fee = ({ id }: { id: string }) => {
  //   const router = useRouter();

  if (typeof id !== "string") {
    return <Loading />;
  }

  const { data: fee, isLoading } = api.fee.getById.useQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <PaymentForm initialData={fee} />
      </div>
    </div>
  );
};

export default Fee;
