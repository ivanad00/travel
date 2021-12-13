import React, { Component } from "react";
import Trips from "./Trips";

import "../styles/style.css";

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      departure: "",
      arrival: "",
      sortBy: "Cheapest",
      formSubmitted: false,
    };

    this.cities = [
      "London",
      "Amsterdam",
      "Warsaw",
      "Stockholm",
      "Paris",
      "Brussels",
      "Prague",
      "Moscow",
      "Madrid",
      "Geneva",
      "Budapest",
      "Kiev",
      "Lisbon",
      "Rome",
      "Athens",
      "Istanbul",
    ];

    this.setRefTo = (element) => {
      this.arrival = element;
    };
    this.setRefFrom = (element) => {
      this.departure = element;
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      departure: this.departure.value.trim(),
      arrival: this.arrival.value.trim(),
      isFormSubmitted: true,
    });
  };

  changeSorting = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  render() {
    let { departure, arrival, sortBy, isFormSubmitted } = this.state;
    return (
      <div className="results">
        <form onSubmit={this.handleSubmit} className="form">
          <select className="" ref={this.setRefFrom}>
            <option value="">From</option>
            {this.cities &&
              this.cities.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
          </select>
          <select className="" ref={this.setRefTo}>
            <option value="">To</option>
            {this.cities &&
              this.cities.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
          </select>
          <div className="radioButtons">
            <label className="radio">
              <input
                type="radio"
                name="sortBy"
                value="Cheapest"
                onChange={this.changeSorting.bind(this)}
                defaultChecked
                className="radio"
              />
              Cheapest
            </label>

            <label className="radio">
              <input
                type="radio"
                name="sortBy"
                onChange={this.changeSorting.bind(this)}
                value="Fastest"
              />
              Fastest
            </label>
          </div>

          <div>
            <button type="submit" className="submit">
              Search
            </button>
          </div>
        </form>

        {departure && arrival && sortBy && (
          <Trips departure={departure} arrival={arrival} sortBy={sortBy} />
        )}
      </div>
    );
  }
}
