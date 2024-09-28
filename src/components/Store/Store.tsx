import React from 'react'
import storeItems from "../../data/items.json";
import {Row, Col} from "react-bootstrap"
import StoreItem from '../StoreItem/StoreItem';

const Store = () => {
  return (
    <Row md={2} xs={1} lg={3} className='g-3'>
        {storeItems.map((item, index) => {
            return(
                <Col key={index}>
                    <StoreItem {...item}></StoreItem>
                </Col>
            )
        })}
    </Row>
  )
};


export default Store;
