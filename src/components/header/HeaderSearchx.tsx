import { HiOutlineSearch } from "react-icons/hi";

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: "C",
    year: 1972,
  },
  {
    name: "Elm",
    year: 2012,
  },
];

const HeaderSearchx = () => {
  return (
    <div className="mx-auto w-80 ">
      <div className="relative flex items-center justify-center w-full text-zinc-800">
        <input
          type="search"
          className="w-full py-2 pl-10 pr-1 border rounded-md focus:outline-none lg:focus:ring-2 focus:ring-1 focus:ring-orange-600 lg:border-none border-neutral-300"
          placeholder="Search..."
        />
        <span className="absolute left-2 ">
          <HiOutlineSearch size={20} />
        </span>
      </div>
    </div>
  );
};

export default HeaderSearchx;
