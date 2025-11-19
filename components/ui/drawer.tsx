"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "left" | "right";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
}: DrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        {/* Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed inset-y-0 flex max-w-full ${
                position === "right" ? "right-0 pl-10" : "left-0 pr-10"
              }`}
            >
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={
                  position === "right"
                    ? "translate-x-full"
                    : "-translate-x-full"
                }
              >
                <DialogPanel className="w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {title && (
                      <div className="flex items-center justify-between px-4 py-6 border-b">
                        <DialogTitle className="text-lg font-semibold">
                          {title}
                        </DialogTitle>
                        <button
                          onClick={onClose}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                    <div className="flex-1 overflow-y-auto">{children}</div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
