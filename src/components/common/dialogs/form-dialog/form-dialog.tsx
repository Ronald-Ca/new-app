import * as React from 'react';
import { IoClose } from 'react-icons/io5';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@radix-ui/react-dialog';
import { DialogHeader } from '@app/components/ui/dialog';

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  icon,
  children,
  contentClassName = '',
  overlayClassName = '',
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className={`fixed inset-0 bg-black/50 ${overlayClassName}`} />
      <DialogContent
        className={`
            fixed top-1/2 left-1/2 
            transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg 
            bg-[#0c1220] border border-[#1e2a4a] text-gray-100 
            w-full max-w-md max-h-[90vh] overflow-y-auto ${contentClassName}`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-cyan-400 flex items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              {icon}
              {title}
            </div>
            <DialogClose asChild>
              <IoClose className="cursor-pointer" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
