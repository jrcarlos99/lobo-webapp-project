import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { CircleAlert } from "lucide-react";

import { useLogout } from "@/hooks/useLogout";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutForm({ isOpen, onClose }: LogoutModalProps) {
  const logout = useLogout();

  const handleConfirmLogout = () => {
    logout.mutate();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <DialogContent className="max-w-sm w-full ">
          <DialogHeader className="flex flex-col items-center justify-center ">
            <div className="text-[#86222f] mb-4">
              <CircleAlert size={100} />
            </div>
            <DialogTitle className="text-xl font-bold text-center">
              Você está se desconectando da L.O.B.O.
            </DialogTitle>
            <DialogDescription className="font-bold text-center">
              Você tem certeza?
            </DialogDescription>
            <Button
              type="button"
              onClick={handleConfirmLogout}
              color="#86222f"
              className="w-full max-w-xs h-12 bg-[#86222f] hover:bg-[#a03040]"
            >
              Sair
            </Button>
          </DialogHeader>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
