import { AlertDialogFooter, AlertDialogHeader } from '@app/components/ui/alert-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import * as React from 'react';

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: React.ReactNode;
    cancelText?: string;
    confirmText?: string;
    isLoading?: boolean;
    onConfirm: () => void;
}

export default function DeleteDialog({
    open,
    onOpenChange,
    title = 'Confirmar ação',
    description = 'Deseja continuar?',
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    isLoading = false,
    onConfirm,
}: DeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg bg-[#0c1220] border border-[#1e2a4a] text-gray-100 sm:max-w-[400px]"
            >
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-semibold text-xl text-red-400">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='mt-3'>
                    <AlertDialogCancel className="px-2 py-1 rounded-sm bg-[#070b14] text-gray-300 hover:bg-[#111827] hover:text-gray-100">
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-2 py-1 rounded-sm bg-red-600 hover:bg-red-700 text-white transition-opacity ${isLoading ? 'pointer-events-none opacity-50' : ''
                            }`}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

