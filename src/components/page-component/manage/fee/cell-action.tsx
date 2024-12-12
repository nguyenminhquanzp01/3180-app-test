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

import { Pencil, Trash2 } from "lucide-react";
import { AlertModal } from "@/components/common/alert-modal";
import {type FeeColumn} from "@/lib/validators";

interface CellActionProps {
  data: FeeColumn;
}
//cap nhat, chinh sua thong tin khoan phi
export function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const { refetch } = api.fee.getAll.useQuery(undefined, {
    enabled: false,
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
        name={"khoản phí: " + data.totalAmount.toString() +  " của căn hộ số " + data.apartmentNo.toString()}

        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={() => deleteFee(data.id)}
        loading={deleteFeeIsLoading}
      />
    </div>
  );
}
