import React, { useEffect, useState } from 'react';
import reader from 'g-sheets-api';

import AVATAR from '../../assets/imgs/avatar.jpg';
import ICON_VERIFY from '../../assets/imgs/icon-verify.jpg';
import ICON_FB from '../../assets/imgs/icon-facebook.png';
import TEXT_FB from '../../assets/imgs/text-facebook.png';
import ICON_SHOPEE from '../../assets/imgs/icon-shopee.png';
import TEXT_SHOPEE from '../../assets/imgs/text-shopee.png';

import './style.css';

const api = `https://docs.google.com/spreadsheets/d/1VSLMdt7ODUh7b1-S5fsSkhph-E8avJSSn-n3wOavJok/gviz/tq`;

const formatPrice = (num = 0, comma = '.') => `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, comma)}₫`;

export default () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(api)
      .then(res => res.text() || '')
      .then(res => {
        const js = JSON.parse(res.substring(47).slice(0, -2));
        const cols = (js?.table?.cols || [])
          .reduce(
            (acc, curr) => curr
              ? ([...acc, (curr?.label || '').replace(/\s/g, '')])
              : acc
            , []
          );
        setData(
          (js?.table?.rows || [])
            .map(
              row => cols.reduce((acc, curr, idx) => curr ? ({ ...acc, [curr]: row?.c?.[idx]?.v }) : acc, {})
            )
        );
      });
  }, []);

  return (
    <div className="container">
      <img
        className="avatar"
        src={AVATAR}
      />
      <div className="name">
        <h1>Ngọc Quý</h1>
        <img src={ICON_VERIFY} />
      </div>
      <p className="introduc">
        Hello bạn! Link Facebook và sản phẩm mình để ở dưới nha
      </p>
      <div className="social">
        <a className="link facebook" href="https://www.facebook.com/ngocquy114" target="_blank">
          <img className="logo" src={ICON_FB} />
          <img className="text" src={TEXT_FB} />
        </a>
        <a className="link shopee" href="https://shopee.vn/ngaostore99">
          <img className="logo" src={ICON_SHOPEE} />
          <img className="text" src={TEXT_SHOPEE} />
        </a>
      </div>
      <div className="products">
        {data.map(p => (
          <a key={`${p?.STT}-${p?.NAME}`} className="product" href={p?.SHOPEE_LINK} target="_blank">
            <span className="sale-tag">-{p?.DISCOUNT}%</span>
            <div className="info">
              <p className="name">{p?.NAME}</p>
              <p className="description">{p?.DESCRIPTION}</p>
              <div className="price">
                <span className="dis-price">{formatPrice(p?.PRICE)}</span>
                {p?.DISCOUNT > 0 && <span className="org-price">{formatPrice(p?.ORIGINAL_PRICE)}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
};
