import React from "react";
import {FormattedMessage} from "react-intl"

export const DeviceTable = (props) => {
  return (
    <div className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col"><FormattedMessage id="devices"/></th>
          <th scope="col"><FormattedMessage id="value"/></th>
        </tr>
      </thead>
      <tbody>
          {props.map((dev,i) => <tr> 
                                    <th scope="row">{i+1}</th>    
                                    <td>{dev.id}</td>
                                    <td>{dev.name}</td>
                                    <td>{dev.desired.value + ""}</td>
                                </tr>)}
      </tbody>
    </div>
  );
};
