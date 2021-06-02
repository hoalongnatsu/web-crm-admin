import "./product-detail.scss";

import { Button, Input, Rate, Tag } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import React from "react";

const ProductDetail = () => {

  return (
    <div className="product-page">
      <div className="product-detail">
        <div className="product-image">
          <img
            src="https://cf.shopee.vn/file/3d6a3b229e348c5c78baddac823666ce"
            alt="shopee"
          />
        </div>
        <div className="product-info">
          <div className="product-name">
            <Tag color="#f50">Yêu thích</Tag>
            <span className="text">
              RAM Kingston 8GB DDR3 1600MHz PC3L-12800 Sodimm Dùng Cho MacBook
              Laptop sử dụng CPU Haswell (1.35V). RAM Kingston 8GB DDR3 1600MHz PC3L-12800 Sodimm Dùng Cho MacBook
              Laptop sử dụng CPU Haswell (1.35V)
            </span>
          </div>
          <div className="product-rate">
            <div className="rate">
              <span>4.8</span>
              <Rate disabled={true} />
            </div>
            <div className="comment">
              <span>71</span> đánh giá
            </div>
            <div className="bought">
              <span>89</span> đã mua
            </div>
          </div>
          <div className="product-price">
            <div className="sale">80.000đ</div>
            <div className="origin">100.000đ</div>
            <Tag color="#f50">Giảm 20%</Tag>
          </div>
          <div className="product-variant">
            <div className="name">Màu sắc</div>
            <div className="options">
              <Button className="item">Bạc - D103</Button>
              <Button className="item">Đen</Button>
              <Button className="item">Xám đen</Button>
              <Button className="item">Vàng - D103</Button>
              <Button className="item">Đen vàng</Button>
              <Button className="item">Xám xanh</Button>
              <Button className="item">Bạc tím- D105</Button>
              <Button className="item">Đen hoa lá hẹ</Button>
              <Button className="item">Xám đen mộng mơ</Button>
            </div>
          </div>
          <div className="product-number">
            <div className="label">Số lượng</div>
            <Input addonBefore={<PlusOutlined />} addonAfter={<MinusOutlined />} />
          </div>
          <div className="product-button-action">
            <Button
              type="primary"
              danger={true}
              icon={<ShoppingCartOutlined />}
              size="large"
            >
              Thêm vào giỏ hàng
            </Button>
            <Button size="large" danger={true}>Mua ngay</Button>
          </div>
          <div className="product-coupon">
            <div className="label">Mã giảm</div>
            <div className="list">
              <div className="item">Giảm 5k</div>
              <div className="item">Giảm 10k</div>
              <div className="item">Giảm 15k</div>
              <div className="item">Giảm 20k</div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-relative"></div>
    </div>
  );
};

export default ProductDetail;
