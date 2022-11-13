import Table from 'react-bootstrap/Table';
import React from "react";

function ListTable(props) {
    // console.log(props.listBody)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type</th>
          <th>Size (sqft)</th>
          <th>Download Link</th>
        </tr>
      </thead>
      <tbody>  
        {props.listBody}
      </tbody>
    </Table>
  );
}

export default ListTable;