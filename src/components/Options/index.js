import React from "react";
import Tile from "./../Tile";
import Loading from "./../Loading";
import { searchCats, getBreeds, getCategories } from "./../../controllers/cat";
import "./styles.css";

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breedId: "",
      breeds: [],
      categoryIds: [],
      categories: [],
      error: false,
      errorMessage: "",
      page: 0,
      limit: 20,
      results: [],
      loadingResults: false,
    };

    this.setup = this.setup.bind(this);
    this.handleBreed = this.handleBreed.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.doSearch = this.doSearch.bind(this);
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

  componentDidMount() {
    this.setup();
  }

  doSearch() {
    console.log("breedId: ", this.state.breedId);
    console.log("categoryIds: ", this.state.categoryIds);
    console.log("page: ", this.state.page);
    console.log("limit: ", this.state.limit);
    this.setState(
      {
        loadingResults: true,
      },
      () => {
        searchCats(
          this.state.breedId,
          this.state.categoryIds.join(","),
          this.state.page,
          this.state.limit
        )
          .then((results) => {
            console.log("doSearch results: ", results);
            this.setState({ results, loadingResults: false });
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

  render() {
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
        tiles.push(<Tile key={data.id} imageUrl={data.url} data={data} />);
      });
    }

    return (
      <div className="container">
        <div className="row options-wrapper">
          <div className="col-6">
            <div className="form-group">
              <label className="form-label" htmlFor="input-search">
                Search
              </label>
              <div className="has-icon-right">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search..."
                  id="input-search"
                />
                <i className="form-icon icon icon-search" />
              </div>
            </div>
          </div>
          <div className="col-3">
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
          <div className="col-3">
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
          <div className="col-12">
            {this.state.loadingResults ? <Loading /> : tiles}
          </div>
        </div>
      </div>
    );
  }
}

export default Options;
