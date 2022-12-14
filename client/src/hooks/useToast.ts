import Toast from "react-native-root-toast";

type ToastManager = (
  message: string,
  type?: "success" | "error" | "alert"
) => void;

export const useToast: ToastManager = (message, type = "success") => {
  const colors = {
    background: {
      success: "#4caf50",
      error: "#f44336",
      alert: "#ff9800",
    },
    text: {
      success: "#ffffff",
      error: "#ffffff",
      alert: "#ffffff",
    },
  };

  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: colors.background[type],
    textColor: colors.text[type],
  });
};
