import React, { useEffect, useState } from "react";
import "./homeDetail.scss";
import { getHomeById } from "../../services/utils";
import { Card } from "../../components/cardRoom/cardRoom";
import { DeviceTable } from "../../components/deviceList";
import {Pie} from '../../components/pieChart/pieChart';
import {FormattedMessage} from "react-intl"

export const HomeDetail = ({ match }) => {
  const id = match.params.id;
  const [allDev, setAllDev] = useState([]);
  const [homes, setHomes] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) 
    {
      console.log("OFFLINE, loading cache");
      if (localStorage.getItem("house" + id) === null) setHomes(["loading"]);
      else 
      {
        setHomes(JSON.parse(localStorage.getItem("house" + id)));
        inicialDevices(JSON.parse(localStorage.getItem("house" + id)));
      }
    }
    else {
    getHomeById(id).then((data) => {
      setHomes(data);
      inicialDevices(data);
      localStorage.setItem("house"+id, JSON.stringify(data))

    });
  }
  }, []);

  function inicialDevices(data) {
    let dev = [];
    let state = [];
    data.rooms.map((room) => {
      dev.push(room.devices);
      state = state.concat(room.devices);
    });
    setDevices(state);
    setAllDev(dev);
  }

  function funcion(i) {
    setDevices(allDev[i]);
  }

  return (
    <div className="container home">
      <h1><FormattedMessage id="myRooms"/></h1>
      <div className="main-section-rooms">
        <div className="card-section-rooms">
          {homes.rooms && homes.rooms.map((room, i) => Card(room, i, funcion))}
        </div>
        <div className="table-section">
            {DeviceTable(devices)}
        </div>
      </div>
      <div className="card-visualization-info">
        <h2><FormattedMessage id="graf"/></h2>
            {Pie(homes)}
      </div>
    </div>
  );
};
