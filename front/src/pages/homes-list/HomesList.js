import React, { useEffect, useState } from "react";
import "./HomesList.scss";
import { getHomes } from "../../services/utils";
import { Card } from "../../components/card/Card";
import {FormattedMessage} from "react-intl"

export const HomesList = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      console.log("OFFLINE, loading cache");
      if (localStorage.getItem("houses") === null) setHomes(["loading"]);
      else {
        setHomes(JSON.parse(localStorage.getItem("houses")));
      }
    } else {
      getHomes().then((data) => {
        setHomes(data);
        localStorage.setItem("houses", JSON.stringify(data));
      });
    }
  }, []);

  return (
    <div className="container home">
      <h1><FormattedMessage id="spaces"/></h1>
      <div className="card-section">
        {homes && homes.map(function(home){ if(home.isActive){return Card(home)}})}
      </div>
    </div>
  );
};
