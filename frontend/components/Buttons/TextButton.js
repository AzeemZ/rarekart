export default function TextButton({ value, addtionalClass }) {
  return (
    <div
      className={`group transition-all flex justify-center w-28 ${
        addtionalClass?.includes("absolute") ? addtionalClass : "relative"
      }`}
    >
      <button
        type="button"
        className={`text-base inline-block no-underline text-gray-600 p-2 duration-500 group-hover:tracking-widest`}
      >
        {value}
      </button>
      <div className="border-b-2 border-transparent absolute bottom-2 w-2.5 duration-500 group-hover:w-3/4 group-hover:border-gray-500 group-hover:duration-500"></div>
    </div>
  );
}
