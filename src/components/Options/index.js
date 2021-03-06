import React from "react";
import LocalizedStrings from "react-localization";
import {
  MdFavorite,
  MdSearch,
  MdPets,
  MdCancel,
  MdErrorOutline,
} from "react-icons/md";
import { GiWhiteCat, GiNestedHearts } from "react-icons/gi";
import Fade from "react-reveal/Fade";
import ReactPaginate from "react-paginate";
import AutoComplete from "react-autocomplete";
import Tile from "./../Tile";
import Loading from "./../Loading";
import { getBreeds } from "./../../controllers/cat";
import "./styles.css";

import langFile from "./../../lang.json";

const lang = new LocalizedStrings(langFile);

let view = localStorage.getItem("view");

if (!view) {
  localStorage.setItem("view", "breeds");
  view = "breeds";
}

let favoriteBreeds = JSON.parse(localStorage.getItem("favoriteBreeds"));

if (!favoriteBreeds) {
  localStorage.setItem("favoriteBreeds", JSON.stringify([]));
  favoriteBreeds = [];
}

const TEMPERAMENT_LIST = [
  "Affectionate",
  "Agile",
  "Clever",
  "Demanding",
  "Easy Going",
  "Gentle",
  "Curious",
  "Intelligent",
  "Interactive",
  "Loyal",
  "Lively",
  "Mischievous",
  "Playful",
  "Quiet",
  "Social",
  "Sedate",
  "Sensible",
  "Sweet",
  "Tenacious",
];

const ORIGIN_LIST = [
  "Australia",
  "Burma",
  "Canada",
  "China",
  "Cyprus",
  "Egypt",
  "France",
  "Greece",
  "Japan",
  "Norway",
  "Russia",
  "Somalia",
  "Singapore",
  "Thailand",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      page: 0,
      limit: 10,
      search: "",
      neighbours: 2,
      pageRange: 5,
      breedId: "",
      breeds: [],
      error: false,
      errorMessage: "",
      results: [],
      loadingResults: false,
      view,
      favoriteBreeds,
      originList: ORIGIN_LIST,
      origin: "",
      temperamentsList: TEMPERAMENT_LIST,
      temperaments: [],
      temperament: "",
      breedsTotal: 0,
      searchCloseIcon: false,
    };

    lang.setLanguage(props.language);

    this.setup = this.setup.bind(this);
    this.addFavoriteBreed = this.addFavoriteBreed.bind(this);
    this.removeFavoriteBreed = this.removeFavoriteBreed.bind(this);
    this.handleOrigin = this.handleOrigin.bind(this);
    this.handleTemperament = this.handleTemperament.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderBreeds = this.renderBreeds.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
    this.handleFavoriteBreed = this.handleFavoriteBreed.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleRemoveTemperament = this.handleRemoveTemperament.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      lang.setLanguage(this.props.language);
      this.forceUpdate();
    }
  }

  async handleRandom() {
    this.setState({ loadingResults: true });
    try {
      const data = await getBreeds(this.props.breed);
      const randomInt = Math.floor(Math.random() * data.length);

      this.setState({
        breedsTotal: data.length,
        breeds: data,
        loadingResults: false,
        results: [data[randomInt]],
        pageCount: 0,
        page: 0,
        origin: "",
        temperaments: [],
        temperament: "",
        search: data[randomInt].name,
        searchCloseIcon: true,
      });
    } catch (e) {
      console.log("Handle Random Breed Error: ", e);
      this.setState({ error: true, errorMessage: e.message });
    }
  }

  async setup() {
    try {
      const data = await getBreeds(this.props.breed);
      this.setState({
        breedsTotal: data.length,
        breeds: data,
        loadingResults: true,
      });

      const breeds = await getBreeds(this.state.page, this.state.limit);

      try {
        this.setState({
          results: breeds,
          loadingResults: false,
          pageCount: Math.ceil(this.state.breedsTotal / this.state.limit),
        });
      } catch (e) {
        console.log("getBreeds error: ", e);
        this.setState({ error: true, errorMessage: e.message });
      }
    } catch (e) {
      console.log("getBreedsTotal error: ", e);
      this.setState({ error: true, errorMessage: e.message });
    }
  }

  handleRemoveTemperament(temperament) {
    const temps = this.state.temperaments.filter((breed) => {
      return breed !== temperament;
    });

    if (temps.length < 1) {
      this.setState({ temperament: "" });
    }
    this.setState({ temperaments: temps }, () => {
      this.doSearch();
    });
  }

  handleViewClick(view) {
    this.setState({ view });
    localStorage.setItem("view", view);
  }

  handleSearch(value) {
    this.setState(
      {
        search: value,
        searchCloseIcon: true,
      },
      () => {
        if (value && value.length > 0) {
          this.doSearch();
        } else {
          this.setState({
            search: value,
            searchCloseIcon: false,
          });
        }
      }
    );
  }

  handleOnSelect(val) {
    this.setState(
      {
        search: val,
        searchCloseIcon: true,
        origin: "",
        temperaments: [],
        temperament: "",
        page: 0,
      },
      () => {
        this.doSearch();
      }
    );
  }

  filterBreeds() {
    if (this.state.breeds) {
      const breeds0 = this.state.breeds.filter((breed) => {
        const regex = new RegExp(`${this.state.search.toLowerCase()}`, "i");
        return regex.test(breed.name.toLowerCase());
      });

      let breeds = breeds0;
      if (this.state.origin) {
        breeds = breeds0.filter((breed) => {
          return this.state.origin === breed.origin;
        });
      }

      let breeds2 = breeds;

      if (this.state.temperaments.length > 0) {
        breeds2 = breeds.filter((brd) => {
          const temps = brd.temperament.split(", ");
          let gotIt = true;
          this.state.temperaments.forEach((temp) => {
            if (!temps.includes(temp)) {
              gotIt = false;
            }
          });

          return gotIt;
        });
      }

      return breeds2;
    } else {
      return [];
    }
  }

  doSearch() {
    const results = this.filterBreeds();

    const res = results.slice(
      this.state.page * this.state.limit,
      (this.state.page + 1) * this.state.limit
    );

    this.setState({
      results: res,
      breedsTotal: results.length,
      loadingResults: false,
      pageCount: Math.ceil(results.length / this.state.limit),
    });
  }

  handleFavoriteBreed(breed) {
    const index = this.state.favoriteBreeds.findIndex((obj) => {
      return obj.id === breed.id;
    });

    if (index < 0) {
      this.addFavoriteBreed(breed);
    } else {
      this.removeFavoriteBreed(breed);
    }
  }

  removeFavoriteBreed(breed) {
    const breeds = this.state.favoriteBreeds.filter((obj) => {
      return obj.id !== breed.id;
    });

    this.setState(
      {
        favoriteBreeds: breeds,
      },
      () => {
        this.forceUpdate();
        localStorage.setItem(
          "favoriteBreeds",
          JSON.stringify(this.state.favoriteBreeds)
        );
      }
    );
  }

  addFavoriteBreed(breed) {
    const breeds = this.state.favoriteBreeds.map((a) => ({ ...a }));
    breeds.push(breed);

    this.setState(
      {
        favoriteBreeds: breeds,
      },
      () => {
        localStorage.setItem(
          "favoriteBreeds",
          JSON.stringify(this.state.favoriteBreeds)
        );
      }
    );
  }

  handleOrigin(origin) {
    this.setState(
      {
        origin: origin,
        page: 0,
      },
      () => {
        this.doSearch();
      }
    );
  }

  handleTemperament(temperament) {
    const temperaments = this.state.temperaments;
    temperaments.push(temperament);

    this.setState(
      {
        temperaments,
        temperament,
        page: 0,
      },
      () => {
        this.doSearch();
      }
    );
  }

  handlePageClick(page) {
    this.setState(
      {
        page: page.selected,
      },
      () => {
        this.doSearch();
        const scrollToElement = document.getElementById("results");
        window.scrollTo({
          top: scrollToElement.offsetTop - 140,
          behavior: "smooth",
        });
      }
    );
  }

  renderBreeds() {
    const originOptions = [
      <option key="origin-option" value="" defaultValue>
        {lang.inputs.chooseOrigin}
      </option>,
    ];

    this.state.originList.map((origin, index) => {
      originOptions.push(
        <option key={`${origin}_${index}`} data-origin={origin}>
          {origin}
        </option>
      );

      return null;
    });

    const temperamentOptions = [
      <option key="temperament-option" value={[]} defaultValue disabled>
        {lang.inputs.addTemperamentFilter}
      </option>,
    ];

    this.state.temperamentsList.map((temperament, index) => {
      temperamentOptions.push(
        <option key={`${temperament}_${index}`} data-temperament={temperament}>
          {temperament}
        </option>
      );
      return null;
    });

    const temperamentChips = [];

    if (this.state.temperaments) {
      this.state.temperaments.map((temperament, index) => {
        temperamentChips.push(
          <span
            key={`${temperament}_${index}`}
            className="chip"
            data-temperament={temperament}
            style={{
              background: "#3f3d56",
              color: "#ffd4d4",
              margin: "0.3rem",
            }}
          >
            {temperament}
            <MdCancel
              style={{
                color: "#ffd4d4",
                width: "1rem",
                height: "1rem",
                cursor: "pointer",
                margin: "0.3rem",
                marginRight: "0.05rem",
              }}
              onClick={() => this.handleRemoveTemperament(temperament)}
            />
          </span>
        );

        return null;
      });
    }

    this.state.temperamentsList.map((temperament) => {
      temperamentOptions.push(
        <option key={temperament} data-temperament={temperament}>
          {temperament}
        </option>
      );
      return null;
    });

    const tiles = [];

    if (this.state.results) {
      this.state.results.map((data) => {
        tiles.push(
          <Tile
            key={data.id}
            favorited={this.state.favoriteBreeds.find(
              (breed) => breed.id === data.id
            )}
            breed={data.id}
            handleFavoriteClick={this.handleFavoriteBreed}
            imageUrl={data.url}
            data={data}
            language={this.props.language}
          />
        );
        return null;
      });
    }

    const tabIconStyleLogo = {
      height: "3rem",
      width: "3rem",
      marginBottom: "2rem",
      color: "#ff072a",
    };

    const mainInputStyle = {
      width: "100%",
    };

    let mainInputWrapperStyle = {
      display: "block",
      position: "relative",
      width: "100%",
    };

    const myMenuStyle = {
      borderRadius: "3px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 0",
      fontSize: "90%",
      position: "absolute",
      top: "-8.2rem",
      height: "8rem",
      left: "0.5rem",
      overflowY: "auto",
      zIndex: 999999,
    };

    const myMenuStyleNotFound = {
      borderRadius: "3px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 0",
      fontSize: "90%",
      position: "absolute",
      top: "-8.2rem",
      height: "8rem",
      left: "0.5rem",
      overflowY: "auto",
      zIndex: 999999,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
    };

    const noResultsIconStyle = {
      width: "1.5rem",
      height: "1.5rem",
      marginTop: "0.5rem",
    };

    const filtered = this.state.breeds.filter((breed) => {
      const regex = new RegExp(`${this.state.search.toLowerCase()}`, "i");
      return regex.test(breed.name.toLowerCase());
    });

    return (
      <Fade bottom cascade>
        <div className="options-wrapper">
          <div className="">
            <div
              className="tooltip cursorPointer"
              data-tooltip={`${lang.random.clickMe}`}
              onClick={this.handleRandom}
            >
              <GiWhiteCat style={tabIconStyleLogo} />
            </div>
          </div>
          <div className="options-top">
            <div className="form-group options-search">
              <label className="form-label" htmlFor="input-search">
                {lang.search.search}
              </label>
              <div className="input-group">
                <AutoComplete
                  inputProps={{
                    className: "form-input",
                    placeholder: `${lang.search.search}...`,
                    type: "text",
                    style: mainInputStyle,
                  }}
                  wrapperStyle={mainInputWrapperStyle}
                  getItemValue={(item) => item.name}
                  items={filtered}
                  renderMenu={(items, value, style) => {
                    return filtered && filtered.length > 0 ? (
                      <div
                        style={{ ...style, ...myMenuStyle }}
                        children={items}
                      />
                    ) : (
                      <div style={{ ...style, ...myMenuStyleNotFound }}>
                        <span className="h4">{lang.search.noResultsFound}</span>
                        <span className="no-results-icon">
                          <MdErrorOutline style={noResultsIconStyle} />
                        </span>
                      </div>
                    );
                  }}
                  renderItem={(item, isHighlighted) => (
                    <div
                      key={item.id}
                      style={{
                        background: isHighlighted ? "lightgray" : "white",
                        zIndex: 1000,
                      }}
                      className="form-item"
                    >
                      {item.name}
                    </div>
                  )}
                  value={this.state.search}
                  onChange={(e) => this.handleSearch(e.target.value)}
                  onSelect={(val) => {
                    this.handleOnSelect(val);
                  }}
                />
                <button
                  className="btn btn-primary input-group-btn"
                  onClick={() => {
                    if (this.state.searchCloseIcon) {
                      this.setState(
                        {
                          search: "",
                          searchCloseIcon: false,
                          origin: "",
                          temperaments: [],
                          temperament: "",
                        },
                        () => this.setup()
                      );
                    }
                  }}
                >
                  {this.state.searchCloseIcon ? (
                    <MdCancel className="cursorPointer search-input-icon" />
                  ) : (
                    <MdSearch className="cursorPointer search-input-icon" />
                  )}
                </button>
              </div>
            </div>
            <div className="options-option">
              <div className="form-group">
                <label className="form-label" htmlFor="input-origin">
                  {lang.search.origin}
                </label>
                <div className="form-group">
                  <select
                    className="form-select"
                    id="input-origin"
                    onChange={(event) => this.handleOrigin(event.target.value)}
                    value={this.state.origin}
                  >
                    {originOptions}
                  </select>
                </div>
              </div>
            </div>
            <div className="options-option">
              <div className="form-group">
                <label className="form-label" htmlFor="input-temperament">
                  {lang.search.temperament}
                </label>
                <div className="form-group">
                  <select
                    className="form-select"
                    id="input-temperament"
                    onChange={(event) =>
                      this.handleTemperament(event.target.value)
                    }
                    value={this.state.temperament}
                  >
                    {temperamentOptions}
                  </select>

                  <div className="temperaments-wrapper">{temperamentChips}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="options-results" id="results">
          {this.state.loadingResults ? (
            <div className="options-wide">
              <Loading />
            </div>
          ) : (
            tiles
          )}
        </div>
        <div className="options-wide">
          <div className="panel-footer">
            {this.state.results && this.state.results.length > 1 && (
              <ReactPaginate
                previousLabel={lang.pagination.previous}
                nextLabel={lang.pagination.next}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                forcePage={this.state.page}
                disableInitialCallback
                marginPagesDisplayed={this.state.neighgbours}
                pageRangeDisplayed={this.state.pageRange}
                onPageChange={this.handlePageClick}
                initialPage={this.state.page}
                containerClassName={"pagination center-pagination"}
                pageClassName={"page-item"}
                nextClassName={"page-item"}
                pageLinkClassName={"page-item-pointer"}
                activeClassName={"page-item active"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-item-pointer"}
                nextLinkClassName={"page-item-pointer"}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }

  renderFavorites() {
    const tiles = [];

    if (this.state.favoriteBreeds) {
      this.state.favoriteBreeds.map((data) => {
        tiles.push(
          <Tile
            key={data.id}
            favorited={this.state.favoriteBreeds.find(
              (breed) => breed.id === data.id
            )}
            breed={data.id}
            handleFavoriteClick={this.handleFavoriteBreed}
            imageUrl={data.url}
            data={data}
            language={this.props.language}
          />
        );
        return null;
      });
    }

    const tabIconStyleLogo = {
      height: "3rem",
      width: "3rem",
      color: "#ff072a",
      marginBottom: "2rem",
    };

    return (
      <Fade cascade>
        <div className="options-heart">
          <GiNestedHearts style={tabIconStyleLogo} />
        </div>
        <div className="options-favorites">
          {tiles && tiles.length > 0 ? (
            tiles
          ) : (
            <div className="options-no-favorites">
              <span className="h3">{lang.favorites.noFavoritesYet}</span>
            </div>
          )}
        </div>
      </Fade>
    );
  }

  render() {
    const tabIconStyle = {
      marginRight: "0.4rem",
    };
    return (
      <>
        <ul className="tab tab-block" data-testid="tab-wrapper">
          <li
            className={
              this.state.view === "breeds" ? "tab-item active" : "tab-item"
            }
            onClick={() => {
              this.handleViewClick("breeds");
            }}
          >
            <a>
              <MdPets
                style={tabIconStyle}
                className={
                  this.state.view === "breeds" ? "tab-item active" : "tab-item"
                }
              />
              {lang.tabs.breeds}
            </a>
          </li>
          <li
            className={
              this.state.view === "favorites" ? "tab-item active" : "tab-item"
            }
            onClick={() => {
              this.handleViewClick("favorites");
            }}
          >
            <a>
              <MdFavorite
                style={tabIconStyle}
                className={
                  this.state.view === "favorites"
                    ? "tab-item active"
                    : "tab-item"
                }
              />
              {lang.tabs.favorites}
            </a>
          </li>
        </ul>
        <div className="options-container" data-testid="options-container">
          {this.state.view === "breeds"
            ? this.renderBreeds()
            : this.renderFavorites()}
        </div>
      </>
    );
  }
}

export default Options;
