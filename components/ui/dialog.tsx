"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

function useDialog() {
  const ctx = React.useContext(DialogContext)
  if (!ctx) throw new Error("useDialog must be used within <Dialog>")
  return ctx
}

function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  return <DialogContext.Provider value={React.useMemo(() => ({ open, onOpenChange }), [open, onOpenChange])}>{children}</DialogContext.Provider>
}

function DialogTrigger(props: React.ComponentPropsWithoutRef<"button">) {
  const { onOpenChange } = useDialog()
  return <button type="button" onClick={() => onOpenChange(true)} {...props} />
}

function DialogClose({
  children,
  render,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { render?: React.ReactElement<{ onClick?: () => void }> }) {
  const { onOpenChange } = useDialog()
  if (render) return React.cloneElement(render, { onClick: () => onOpenChange(false) }, children)
  return <button type="button" onClick={() => onOpenChange(false)} {...props}>{children}</button>
}

function DialogContent({ className, children, showCloseButton = true, ...props }: React.HTMLAttributes<HTMLDivElement> & { showCloseButton?: boolean }) {
  const { open, onOpenChange } = useDialog()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => { setMounted(true) }, [])
  React.useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false) }
    document.addEventListener("keydown", handler)
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", handler) }
  }, [open, onOpenChange])
  if (!mounted) return null
  return createPortal(
    open ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 supports-backdrop-filter:backdrop-blur-sm" onClick={() => onOpenChange(false)} />
        <div data-slot="dialog-content" className={cn("relative z-50 w-full max-w-lg rounded-xl border bg-popover p-6 text-sm text-popover-foreground shadow-xl", className)} {...props}>
          {children}
          {showCloseButton && (
            <button type="button" onClick={() => onOpenChange(false)} className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-md bg-secondary text-muted-foreground hover:bg-secondary/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="sr-only">Fermer</span>
            </button>
          )}
        </div>
      </div>
    ) : null,
    document.body
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col gap-2", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 data-slot="dialog-title" className={cn("text-base font-medium text-foreground", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p data-slot="dialog-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription }
