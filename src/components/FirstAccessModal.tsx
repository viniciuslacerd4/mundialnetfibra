import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FirstAccessModalProps {
  open: boolean;
  onClose: () => void;
  onClient: () => void;
}

export const FirstAccessModal = ({ open, onClose, onClient }: FirstAccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Bem-vindo!</DialogTitle>
          <DialogDescription>
            Para continuar, selecione uma opção:
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="default"
            className="h-12"
            onClick={onClient}
          >
            Já sou cliente
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={onClose}
          >
            Ainda não sou cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
