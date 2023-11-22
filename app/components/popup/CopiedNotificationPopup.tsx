interface Props {
  text: string;
  isPopupVisible: boolean;
}

export default function CopiedNotificationPopup({
  text,
  isPopupVisible,
}: Props) {
  return (
    <div
      className={`fixed z-50 px-3 py-3 bottom-0 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-md transition-transform duration-300 ease-out transform ${
        isPopupVisible && '-translate-y-1/2'
      }`}
    >
      {text}
    </div>
  );
}
