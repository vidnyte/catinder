import React from "react";
import LocalizedStrings from "react-localization";
import { DebounceInput } from "react-debounce-input";
import { MdFavorite, MdPets } from "react-icons/md";
import { GiWhiteCat, GiNestedHearts } from "react-icons/gi";
import Fade from "react-reveal/Fade";
import ReactPaginate from "react-paginate";
import AutoSuggestInput from "./../AutoSuggestInput";
import Tile from "./../Tile";
import Loading from "./../Loading";
import {
  searchBreeds,
  getBreeds,
  getCategories,
} from "./../../controllers/cat";
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
      categoryIds: [],
      categories: [],
      error: false,
      errorMessage: "",
      results: [],
      loadingResults: false,
      view,
      favoriteBreeds,
    };

    this.setup = this.setup.bind(this);
    this.addFavoriteBreed = this.addFavoriteBreed.bind(this);
    this.removeFavoriteBreed = this.removeFavoriteBreed.bind(this);
    this.handleBreed = this.handleBreed.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.renderBreeds = this.renderBreeds.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
    this.handleFavoriteBreed = this.handleFavoriteBreed.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    getBreeds()
      .then((breeds) => {
        console.log("getBreeds: ", breeds);
        this.setState({ breeds });
      })
      .catch((e) => {
        console.log("getBreeds error: ", e);
        this.setState({ error: true, errorMessage: e.message });
      });

    getCategories()
      .then((categories) => {
        console.log("getCategories res: ", categories);
        this.setState({ categories });
      })
      .catch((e) => {
        console.log("getCategories error: ", e);
        this.setState({ error: true, errorMessage: e.message });
      });
  }

  handleViewClick(view) {
    this.setState({ view });
    localStorage.setItem("view", view);
  }

  handleSearch(value) {
    console.log("value: ", value);
    this.setState({
      search: value,
    });

    if (value && value.length > 2) {
      this.doSearch();
    }
  }

  doSearch() {
    this.setState(
      {
        loadingResults: true,
      },
      () => {
        searchBreeds(this.state.search)
          .then((results) => {
            console.log("doSearch results: ", results);
            this.setState({
              results,
              loadingResults: false,
              pageCount: Math.ceil(results.length / 5),
            });
          })
          .catch((e) => {
            console.log("error: ", e);
            this.setState({
              loadingResults: false,
              error: true,
              errorMessage: e.message,
            });
          });
      }
    );
  }

  handleFavoriteBreed(breed) {
    const index = this.state.favoriteBreeds.findIndex((obj) => {
      return obj.id === breed.id;
    });

    console.log("index: ", index);

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
    console.log("add favorite breed: ", breed);

    console.log("this.state.favoriteBreeds: ", this.state.favoriteBreeds);

    const breeds = this.state.favoriteBreeds.map((a) => ({ ...a }));
    breeds.push(breed);

    console.log("breeds: ", breeds);

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

  addFavoriteImage(image) {
    console.log("add favorite image: ", image);

    const images = this.state.favoriteImages.map((a) => ({ ...a }));

    images.push(image);

    console.log("images: ", images);

    this.setState(
      {
        favoriteImages: images,
      },
      () => {
        localStorage.setItem(
          "favoriteImages",
          JSON.stringify(this.state.favoriteImages)
        );
      }
    );
  }

  handleBreed(breed) {
    console.log("breed clicked: ", breed);

    this.setState(
      {
        breedId: breed.id,
      },
      () => {
        this.doSearch();
      }
    );
  }

  handleCategory(category) {
    console.log("category clicked: ", category);

    const categoryIdList = this.state.categoryIds;

    categoryIdList.push(category.id);

    this.setState(
      {
        categoryIds: categoryIdList,
      },
      () => {
        this.doSearch();
      }
    );
  }

  handlePageClick(page) {
    console.log("selected: ", page.selected);
    this.setState(
      {
        page: page.selected,
      },
      () => {
        this.doSearch();
      }
    );
  }

  renderBreeds() {
    const breedOptions = [
      <option key="breed-option" disabled>
        Choose an option
      </option>,
    ];

    if (this.state.breeds) {
      this.state.breeds.map((breed) => {
        breedOptions.push(
          <option key={breed.id} data-breed={breed}>
            {breed.name}
          </option>
        );
      });
    }

    const categoryOptions = [
      <option key="category-option" disabled>
        Choose an option
      </option>,
    ];

    if (this.state.categories) {
      this.state.categories.map((category) => {
        categoryOptions.push(
          <option key={category.id} data-category={category}>
            {category.name}
          </option>
        );
      });
    }

    const tiles = [];

    if (this.state.results) {
      this.state.results.map((data) => {
        tiles.push(
          <Tile
            key={data.id}
            favorited={this.state.favoriteBreeds.findIndex(
              (breed) => breed.id === data.id
            )}
            breed={data.id}
            handleFavoriteClick={this.handleFavoriteBreed}
            imageUrl={data.url}
            data={data}
          />
        );
      });
    }

    const tabIconStyleLogo = {
      marginRight: "0.4rem",
      height: "3rem",
      width: "3rem",
      color: "#ff072a",
    };

    return (
      <Fade bottom>
        <div className="row options-wrapper">
          <div className="col-12">
            <GiWhiteCat style={tabIconStyleLogo} />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label className="form-label" htmlFor="input-search">
                Search
              </label>
              <div className="has-icon-right">
                <AutoSuggestInput
                  myInput={{
                    className: "form-input",
                    type: "text",
                    placeholder: "Search...",
                    value: this.state.search,
                  }}
                  onSuggestionClick={(suggestion) =>
                    this.handleSearch(suggestion)
                  }
                  myOnChange={(e) => this.handleSearch(e.target.value)}
                  breeds={this.state.breeds}
                />
                {/*
                      <DebounceInput
                      className="form-input"
                      type="text"
                      placeholder="Search..."
                      value={this.state.search}
                      minLength={2}
                      debounceTimeout={300}
                      onChange={this.handleSearch}
                    />*/}

                <i className="form-icon icon icon-search" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="form-group">
              <label className="form-label" htmlFor="input-breed">
                Breed
              </label>
              <div className="form-group">
                <select
                  className="form-select"
                  id="input-breed"
                  onChange={(event) => this.handleBreed(event.target.value)}
                >
                  {breedOptions}
                </select>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="form-group">
              <label className="form-label" htmlFor="input-category">
                Category
              </label>
              <div className="form-group">
                <select
                  className="form-select"
                  id="input-category"
                  onChange={(event) => this.handleCategory(event.target.value)}
                >
                  {categoryOptions}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.loadingResults ? (
            <div className="col-12">
              {" "}
              <Loading />{" "}
            </div>
          ) : (
            tiles
          )}
          <div className="col-12">
            <div className="panel-footer">
              <ReactPaginate
                previousLabel={lang.pagination.previous}
                nextLabel={lang.pagination.next}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                forcePage={this.state.page}
                marginPagesDisplayed={this.state.neighgbours}
                pageRangeDisplayed={this.state.pageRange}
                onPageChange={this.handlePageClick}
                initialPage={this.state.page}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                activeClassName={"page-item active"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
              />
            </div>
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
            handleFavoriteClick={this.handleFavoriteBreed}
            imageUrl={data.url}
            data={data}
          />
        );
      });
    }

    console.log("tiles: ", tiles);

    const tabIconStyleLogo = {
      marginRight: "0.4rem",
      height: "3rem",
      width: "3rem",
      color: "#ff072a",
    };

    return (
      <Fade bottom>
        <div className="row options-wrapper">
          <div className="col-12">
            <GiNestedHearts style={tabIconStyleLogo} />
          </div>
          {tiles}
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
        <ul className="tab tab-block">
          <li
            className={
              this.state.view === "breeds" ? "tab-item active" : "tab-item"
            }
            onClick={() => {
              this.handleViewClick("breeds");
            }}
          >
            <a href="#">
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
            <a href="#">
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
        <div className="container">
          {this.state.view === "breeds"
            ? this.renderBreeds()
            : this.renderFavorites()}
        </div>
      </>
    );
  }
}

export default Options;
