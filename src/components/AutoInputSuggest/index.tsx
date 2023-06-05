import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import {
  onSearch,
  onSuggestionsClearRequested,
  onSuggestionsFetchRequested,
  selectSearchState,
} from "../../features/search";
import { Link } from "react-router-dom";

const AutoInputSuggest = () => {
  const dispatch: any = useDispatch();
  const searchState = useSelector(selectSearchState);

  const searchValue = searchState.searchValue;
  const searchSuggestions = searchState.searchSuggestions;

  const inputProps = {
    placeholder: "Search Products",
    value: searchValue,
    onChange: (_, { newValue }) => {
      console.log("input:", newValue);
      onSearch(newValue);
    },
  };

  const getSuggestionValue = (suggestions) => {
    return suggestions.title;
  };

  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.title, query);
      const parts = AutosuggestHighlightParse(suggestion.title, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const spanClass = part.highlight
              ? "react-autosuggest__suggestion-match"
              : "";

            return (
              <span className={spanClass} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    const thumb = suggestion?.thumbnail?.url
      ? suggestion.thumbnail.url
      : "/images/product-image.png";

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className="">
          <img src={thumb} alt="product" className="item-image" />
          <div className="">{BoldName(suggestion, query)}</div>
          <div className=""> {suggestion.price} </div>
        </div>
      </Link>
    );
  };

  const dispatchFunction = (func, val) => {
    dispatch(func(val));
  };

  return (
    <>
      <Autosuggest
        suggestions={searchSuggestions}
        onSuggestionsFetchRequested={(val) =>
          dispatchFunction(onSuggestionsFetchRequested, val)
        }
        onSuggestionsClearRequested={() =>
          dispatchFunction(onSuggestionsClearRequested, "")
        }
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={(_, item) => {
          console.log("suggestion selected." + item);
        }}
        // onSuggestionSelected={(_, item) => {
        //   history.push(`/product/${item.suggestion.slug}`);
        // }}
      />
    </>
  );
};

export default AutoInputSuggest;
