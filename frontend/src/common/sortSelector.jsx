import React from 'react'
import { Dropdown } from "react-bootstrap";

function SortSelector(props) {
 return (
   <div>
     <Dropdown>
       <Dropdown.Toggle variant="warning" id="dropdown-basic" size="sm">
         Sort By
       </Dropdown.Toggle>

       <Dropdown.Menu>
         <Dropdown.Item onClick={() => props.onSort("name")}>
           Name
         </Dropdown.Item>
         <Dropdown.Item onClick={() => props.onSort("price")}>
           Price
         </Dropdown.Item>
         <Dropdown.Item onClick={() => props.onSort("rate")}>
           Rate
         </Dropdown.Item>
       </Dropdown.Menu>
     </Dropdown>
   </div>
 );
}

export default SortSelector
