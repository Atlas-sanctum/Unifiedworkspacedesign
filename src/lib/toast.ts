import { toast } from "sonner@2.0.3";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    className: "bg-emerald-900 border-emerald-500 text-white",
    style: {
      border: '1px solid rgb(16 185 129 / 0.5)',
      background: 'rgb(6 78 59 / 0.95)',
      backdropFilter: 'blur(12px)',
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    className: "bg-red-900 border-red-500 text-white",
    style: {
      border: '1px solid rgb(239 68 68 / 0.5)',
      background: 'rgb(127 29 29 / 0.95)',
      backdropFilter: 'blur(12px)',
    },
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    className: "bg-slate-900 border-purple-500 text-white",
    style: {
      border: '1px solid rgb(168 85 247 / 0.5)',
      background: 'rgb(15 23 42 / 0.95)',
      backdropFilter: 'blur(12px)',
    },
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    duration: 3000,
    className: "bg-blue-900 border-blue-500 text-white",
    style: {
      border: '1px solid rgb(59 130 246 / 0.5)',
      background: 'rgb(30 58 138 / 0.95)',
      backdropFilter: 'blur(12px)',
    },
  });
};