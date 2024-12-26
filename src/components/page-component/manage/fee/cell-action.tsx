"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Pencil, Trash2, Check, X } from "lucide-react";
import { AlertModal } from "@/components/common/alert-modal";
import { type FeeColumn } from "@/lib/validators";

interface CellActionProps {
  data: FeeColumn;
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(data.isPaid=="Đã thanh toán"?true:false); // Declare the state for isPaid
    console.log(data.isPaid=="Đã thanh toán")
  const { refetch } = api.fee.getAll.useQuery(undefined, {
    enabled: false,
  });

  const handleTogglePayment = () => {
    // Tách riêng việc thay đổi trạng thái và gọi hàm toast
    const newState = !isPaid;
    setIsPaid(newState);


    // Gọi toast sau khi trạng thái đã được cập nhật
    if (newState) {
      toast.success("Thanh toán thành công!");
    } else {
      toast.error("Hủy thanh toán!");
    }
  };
  const { mutate: updatePay, isPending: updatePayIsLoading } =
    api.fee.updatePay.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: async (data) => {
        setIsPaid((isPaid) => !isPaid)
        toast.success("Thành công!");
        await refetch();
      },
    });

  const { mutate: deleteFee, isPending: deleteFeeIsLoading } =
    api.fee.delete.useMutation({
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: async (data) => {
        toast.success("Xóa thành công");
        await refetch();
      },
    });

  return (
    <div className="flex justify-center space-x-2">
      {/* Nút Thanh Toán */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="justify-center items-center hover:bg-secondary"
              onClick={() => updatePay(data.id)}
            >
              {isPaid ? (
                <X className="h-4 w-4 text-foreground" /> // Icon hủy thanh toán
              ) : (
                <Check className="h-4 w-4 text-foreground" /> // Icon thanh toán
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isPaid ? "Hủy thanh toán" : "Thanh toán"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="justify-center items-center hover:bg-secondary"
              onClick={() => {
                router.push(`/manage/fee/${data.id}`);
              }}
            >
              <Pencil className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cập nhật cước phí</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="justify-center items-center hover:bg-secondary"
              onClick={() => {
                setAlertModalOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 text-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xóa</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertModal
        title="Xóa khoản phí này?"
        description="Không thể khôi phục."
        name={
          "khoản phí: " +
          data.totalAmount.toString() +
          " của căn hộ số " +
          data.apartmentNo.toString()
        }
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteFee(data.id)}
        loading={deleteFeeIsLoading}
      />
    </div>
  );
}
