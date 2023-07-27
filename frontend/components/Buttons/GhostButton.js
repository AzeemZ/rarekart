// eslint-disable-next-line react/display-name
export default function GhostButton({
  onClick,
  size,
  extraClass,
  noBorder = false,
  inverted = true,
  children,
}) {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 sm:py-1 px-5";
  } else if (size === "lg") {
    btnSize = "py-4 sm:py-3 px-7  text-xl";
  } else {
    btnSize = "py-3 sm:py-2 px-6";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-white text-center cursor-pointer text-xl sm:text-base tracking-widest text-stone-500 ${
        !noBorder && "border border-stone-500"
      } ${
        inverted
          ? "hover:bg-stone-800 hover:text-stone-100"
          : "hover:text-stone-400"
      } ${btnSize} ${extraClass}`}
    >
      {children}
    </button>
  );
}
