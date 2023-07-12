export default function HeaderLogo() {
  return (
    <div className="ml-4 flex lg:ml-0">
      <a href="#">
        <span className="sr-only">Your Company</span>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt=""
        />
      </a>
    </div>
  );
}
