import React, { Component } from "react";
import axios from "axios";
import '../styles/style.css'

export default class Trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      currency: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getTrips();
  }

  componentDidUpdate(prev) {
    if (JSON.stringify(prev) !== JSON.stringify(this.props)) {
      this.getTrips();
    }
  }

  getTrips = () => {
    Promise.all([axios.get("/response.json")])
      .then((res) => {
        let data = this.filterTrips(
          res[0].data.deals,
          this.props.departure,
          this.props.arrival
        );
        data =
          this.props.sortBy === "Cheapest"
            ? this.sortCheapest(data)
            : this.sortFastest(data);
        this.setState({
          trips: data,
          currency: res[0].data.currency,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  filterTrips = (trips, departure, arrival) => {
    return trips.filter(
      (filter) => filter.departure === departure && filter.arrival === arrival
    );
  };

  sortCheapest = (trips) => {
    return trips.sort((a, b) => a.cost - b.cost);
  };

  sortFastest = (trips) => {
    return trips.sort((a, b) => {
      if (a.duration.h < b.duration.h) return -1;
      if (a.duration.h > b.duration.h) return 1;

      if (a.duration.m < b.duration.m) return -1;
      if (a.duration.m > b.duration.m) return 1;

      return 0;
    });
  };

  render() {
    let { cities, trips, currency, isLoading } = this.state;
    return (
      <div className="trips">
        {!isLoading && trips && trips.length !== 0 && (
          <div>
            {trips &&
              trips.map((trip, key) => {
                return (
                  <div key={key}>
                    <div className="tripsDepartureArrival">
                      {trip.departure} 
                -
                      {trip.arrival}
                    </div>
                    <div className="tripsPrice">
                     Cost: {trip.cost} EUR
                    </div>
                    <div className="tripsDetails">
                      By: {trip.transport} <br />
                      Duration: {trip.duration.h}h {trip.duration.m}m
                    </div>
                    <hr />
                  </div>
                );
              })}
          </div>
        )}

        {isLoading && <div className="loading" />}

        {!isLoading && trips && trips.length === 0 && (
          <div className="empty">
            No results.
          </div>
        )}
      </div>
    );
  }
}
