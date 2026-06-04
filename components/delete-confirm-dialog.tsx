"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Delete01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface DeleteConfirmDialogProps {
  action: (formData: FormData) => void | Promise<void>
  entityLabel: string
  entityDescription?: string
  children?: React.ReactNode
}

export function DeleteConfirmDialog({
  action,
  entityLabel,
  entityDescription,
  children,
}: DeleteConfirmDialogProps) {
  const [open, onOpenChange] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          children && React.isValidElement(children)
            ? children
            : (
              <Button variant="ghost" size="icon" className="text-destructive">
                <HugeiconsIcon icon={Delete01Icon} strokeWidth={2} className="size-4" />
              </Button>
            )
        }
      />
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer {entityLabel}&nbsp;?
            {entityDescription && (
              <>
                <br />
                <span className="font-medium">{entityDescription}</span>
              </>
            )}
            <br />
            Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>

        <form
          action={action}
          onSubmit={() => onOpenChange(false)}
        >
          <div className="flex justify-end gap-2">
            <DialogClose render={<Button variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit" variant="destructive">
              Supprimer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
