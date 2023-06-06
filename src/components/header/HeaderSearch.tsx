import { FC, useState } from "react";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import Autosuggest from "react-autosuggest";
import { useDispatch } from "react-redux";
import {
  SearchProduct,
  resetSearchState,
  searchProducts,
} from "../../features/search";
import { Link } from "react-router-dom";

interface BoldNameProps {
  suggestion: {
    title: string;
  };
  query: string;
}

const BoldName: FC<BoldNameProps> = ({ suggestion, query }) => {
  const matches = AutosuggestHighlightMatch(suggestion.title, query);
  const parts = AutosuggestHighlightParse(suggestion.title, matches);

  return (
    <div>
      {parts.map((part, index) => {
        const spanClass = part.highlight ? "bg-yellow-200" : "";

        return (
          <span className={spanClass} key={index}>
            {part.text}
          </span>
        );
      })}
    </div>
  );
};

// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = (value: string) => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0
//     ? []
//     : languages.filter(
//         (lang) => lang.title.toLowerCase().slice(0, inputLength) === inputValue
//       );
// };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: SearchProduct) => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = (
  suggestion: SearchProduct,
  { query }: Autosuggest.RenderSuggestionParams
) => {
  const thumb = suggestion.thumbnail?.url
    ? suggestion.thumbnail.url
    : "/images/product-image.png";

  return (
    <>
      <Link
        key={suggestion.slug}
        to={`/product/${suggestion.slug}`}
        className="flex px-2 py-4 border hover:bg-neutral-100">
        <div className="">
          <img src={thumb} alt="#" className="w-12 h-12" />
        </div>
        <div className="flex flex-col pl-2 ">
          <span className="">{BoldName({ suggestion, query })}</span>
          <span className="text-sm">₹ {suggestion.price}</span>
        </div>
      </Link>
    </>
  );
};

const HeaderSearch = () => {
  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.
  const dispatch: any = useDispatch();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<SearchProduct[]>([]);

  // console.log(products);

  const onChange = (
    event: React.FormEvent,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    if (newValue === "xxx") console.log(event);
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({
    value,
  }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const val = value.toLowerCase();
    if (val && val.length % 3 === 0) {
      dispatch(searchProducts(val))
        .then((res: any) => {
          const data = res.payload.products;
          console.log(res.payload);
          if (data && data.length > 0) {
            setSuggestions(data);
          }
        })
        .catch(() => setSuggestions([]));
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    dispatch(resetSearchState());
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps: Autosuggest.InputProps<any> = {
    placeholder: "Search Products",
    value,
    onChange: onChange,
  };

  // Finally, render it!
  return (
    <div className="mx-auto w-80 ">
      <div className="relative flex items-center justify-center w-full text-zinc-800">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            input: `w-full py-2 border pl-10 pr-1 rounded-md focus:outline-none lg:focus:ring-2 focus:ring-1 focus:ring-orange-600  lg:border-none border-neutral-300`,
            suggestionsContainer: `bg-white absolute top-10 z-20 w-full `,
          }}
        />
      </div>
    </div>
  );
};

export default HeaderSearch;
