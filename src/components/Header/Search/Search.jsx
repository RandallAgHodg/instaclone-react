import { useQuery } from "@apollo/client";
import { identity } from "lodash";
import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchUI, Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
import { SEARCH } from "../../../gql/user.js";
import "./Search.scss";
function Search() {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading, error } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const handleResultReset = () => {
    setSearch(null);
    setResults([]);
  };

  return (
    <SearchUI
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      value={search || ""}
      results={results}
      resultRenderer={(e) => <ResultSearch data={e} />}
      onResultSelect={handleResultReset}
      onSearchChange={(e) =>
        e.target.value ? setSearch(e.target.value) : setSearch(null)
      }
    />
  );
}

function ResultSearch({ data }) {
  return (
    <Link className="search-users__item" to={`user/${data.username}`}>
      <Image src={data.avatar || ImageNoFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
}

export default Search;
