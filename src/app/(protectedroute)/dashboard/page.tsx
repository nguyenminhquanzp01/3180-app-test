'use client'
import React, { useState } from "react";
import { api } from "@/trpc/react";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentPayments } from "@/components/page-component/dashboard/recent-payments";
import ApartmentModal from "@/components/page-component/dashboard/apartment-modal";
import { DollarSign, User, Home, BookX } from "lucide-react";
import { format } from "date-fns";
import { Loading } from "@/components/common/loading";
import { Overview } from "@/components/page-component/dashboard/overview";
import UnpaidFeesModal from "@/components/page-component/dashboard/unpaid-fees-modal";
import BreadCrumb from "@/components/ui/breadcrumb";
import ResidentModal from "@/components/page-component/dashboard/resident-modal";
import { Tabs } from "antd";
import ResidentList from "@/components/page-component/dashboard/table-resident";

const Dashboard = () => {
  const breadcrumbItems = [{ title: "", link: "" }];
  const [isApartmentModalOpen, setIsApartmentModalOpen] = useState(false);
  const [isUnpaidFeesModalOpen, setIsUnpaidFeesModalOpen] = useState(false);
  const [isResidentModalOpen, setIsResidentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("contribution");

  const {
    data: residentCount = 0,
    isLoading: isLoadingResidentCount,
    isError: isErrorResidentCount,
    error: errorResidentCount,
  } = api.resident.getCount.useQuery();

  const {
    data: occupiedApartments,
    isLoading: isLoadingApartments,
    isError: isErrorApartments,
    error: errorApartments,
  } = api.resident.getOccupiedApartments.useQuery();
  const {
    data: totalContributionData,
    isLoading: isLoadingTotalContributionData,
    isError: isErrorTotalContributionData,
    error: errorTotalContributionData,
  } = api.fee.getTotalContributionFee.useQuery();
  const { currentMonthTotal = 0, percentageChange = 0, allTimeTotal = 0 } =
    totalContributionData || {};

  const {
    data: totalUnpaidFees,
    isLoading: isLoadingTotalUnpaidFees,
    isError: isErrorTotalUnpaidFees,
    error: errorTotalUnpaidFees,
  } = api.fee.getTotalUnpaidFees.useQuery();

  const {
    data: apartmentsWithUnpaidFees = [],
  } = api.fee.getUnpaidFees.useQuery();
  const {
    data: recentPayments,
    isLoading: isLoadingRecentPayments,
    isError: isErrorRecentPayments,
    error: errorRecentPayments,
  } = api.fee.getRecentPayments.useQuery();

  const handleViewApartments = () => {
    setIsApartmentModalOpen(true);
  };
  const handleViewUnpaidFees = () => {
    setIsUnpaidFeesModalOpen(true);
  };
  const handleViewResidents = () => {
    setIsResidentModalOpen(true);
  };

  const residents = [
  { id: '1', name: 'Nguyễn Văn A', phoneNumber: '0123456789', apartmentNo: 101, vehicle: 'Xe máy' },
  { id: '2', name: 'Trần Thị B', phoneNumber: '0987654321', apartmentNo: 202, vehicle: 'Ô tô' },
  // Thêm dữ liệu khác...
];

  return (
    <div className="flex h-full flex-col text-gray-800">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        
        <div className="">
          <div className="">

            <Tabs>
              <Tabs.TabPane tab={<div className="flex items-center"><DollarSign className="mr-2" /> Tổng quan </div>} key = "tab 1"> 
                <div>          
              <Card className="shadow-md border border-gray-200 bg-white rounded-lg hover:shadow-lg w-80 mb-10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-500">
                  Phí đóng góp tháng {format(new Date(), "MM/yyyy")}
                </CardTitle>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                {isLoadingTotalContributionData ? (
                  <Loading />
                ) : isErrorTotalContributionData ? (
                  <div className="text-2xl font-bold text-red-500">
                    Error: {errorTotalContributionData.message}
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-gray-800">
                    {currentMonthTotal.toLocaleString("vi-VN")}₫
                    <p className="text-xs font-normal text-gray-500">
                      {percentageChange >= 0 ? "+" : ""}
                      {percentageChange.toFixed(1)}% so với tháng trước
                    </p>
                    <p className="text-xs font-normal text-gray-500">
                      Tổng phí đóng góp: {allTimeTotal.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-md border border-gray-200 bg-white rounded-lg hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-600">Thanh toán gần đây</CardTitle>
                <CardDescription>
                  Chung cư BlueMoon có {recentPayments ? recentPayments.length : [].length} thanh toán mới
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingRecentPayments ? (
                  <Loading />
                ) : isErrorRecentPayments ? (
                  <div className="text-2xl font-bold text-red-500">
                    Error: {errorRecentPayments.message}
                  </div>
                ) : (
                  <RecentPayments payments={recentPayments ? recentPayments : []} />
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-3 shadow-md border border-gray-200 bg-white rounded-lg hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-600">Tổng quan</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
          </div>

        <ApartmentModal
        isOpen={isApartmentModalOpen}
        onClose={() => setIsApartmentModalOpen(false)}
        apartmentList={occupiedApartments?.apartments ?? []}
      />
      <UnpaidFeesModal
        isOpen={isUnpaidFeesModalOpen}
        onClose={() => setIsUnpaidFeesModalOpen(false)}
        apartmentList={apartmentsWithUnpaidFees.map((apartment) => ({
          ...apartment,
          unpaidFees: apartment.unpaidFees || [],
        }))}
      />
      <ResidentModal
        isOpen={isResidentModalOpen}
        onClose={() => setIsResidentModalOpen(false)}
        residentList={
          occupiedApartments?.apartments.flatMap((apartment) => apartment.residents) ?? []
        }
      />
          </Tabs.TabPane>


              <Tabs.TabPane tab={<div className="flex items-center"><BookX className="mr-2" /> Phí chưa thu</div>}  key = "tab 2"> 
                <div>
              <Card className="shadow-md border border-gray-200 bg-white rounded-lg hover:shadow-lg w-80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-500">
                  Phí chưa thu
                </CardTitle>
                <BookX className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {isLoadingTotalUnpaidFees ? (
                    <Loading />
                  ) : isErrorTotalUnpaidFees ? (
                    <div className="text-2xl font-bold text-red-500">
                      Error: {errorTotalUnpaidFees.message}
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-gray-800">
                      {totalUnpaidFees
                        ? totalUnpaidFees.toLocaleString("vi-VN") + "₫"
                        : "Không có phí quá hạn"}
                    </div>
                  )}
                  <Button
                    className="justify-center items-center bg-blue-500 text-white hover:bg-blue-600"
                    size="sm"
                    onClick={handleViewUnpaidFees}
                  >
                    Chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab={<div className="flex items-center"><User className="mr-2" /> Cư dân Bluemoon</div>} key="tab 3">                 
                <div>
                  
              <Card className="shadow-md border border-gray-200 bg-white rounded-lg hover:shadow-lg w-80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-500">
                  Cư dân BlueMoon
                </CardTitle>
                <User className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {isLoadingResidentCount ? (
                    <Loading />
                  ) : isErrorResidentCount ? (
                    <div className="text-2xl font-bold text-red-500">
                      Error: {errorResidentCount.message}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-800">
                      {residentCount}
                    </div>
                  )}
                  {/* <Button
                    className="justify-center items-center bg-blue-500 text-white hover:bg-blue-600"
                    size="sm"
                    onClick={handleViewResidents}
                  >
                    Chi tiết
                  </Button> */}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-10">
            <ResidentList residentList={residents} isOpen={false} onClose={function (): void {
                    throw new Error("Function not implemented.");
                  } }/>
            </Card>
            
                </div> 
              </Tabs.TabPane>

              <Tabs.TabPane tab={<div className="flex items-center"><Home className="mr-2" /> Căn hộ</div>}  key = "tab 4">
              <div>

              <Card className="shadow-md border border-gray-200 bg-white rounded-lg hover:shadow-lg w-80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-500">
                  Số căn hộ đang có cư trú
                </CardTitle>
                <Home className="h-6 w-6 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {isLoadingApartments ? (
                    <Loading />
                  ) : isErrorApartments ? (
                    <div className="text-2xl font-bold text-red-500">
                      Error: {errorApartments.message}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-800">
                      {occupiedApartments?.count ?? 0}
                    </div>
                  )}
                  <Button
                    className="justify-center items-center bg-blue-500 text-white hover:bg-blue-600"
                    size="sm"
                    onClick={handleViewApartments}
                  >
                    Chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>

              </div>
              </Tabs.TabPane>
            </Tabs>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
