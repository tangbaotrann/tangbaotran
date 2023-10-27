import { Form, Select, Row, Col, InputNumber, message } from "antd";
import { useEffect, useState } from "react";

import "./index.css";
import swapCurrency from "../../utils/swapCurrency";
import Buttons from "./Buttons";
import CurrencyResult from "./CurrencyResult";

const { useForm } = Form;

function CurrencySwapForm() {
  const customFormInput = {
    labelCol: {
      span: 24,
    },
  };
  const [formSwap] = useForm();

  const [currencies, setCurrencies] = useState([]);
  const [resultCurrency, setResultCurrency] = useState(0);
  const [currencyExchangeAffterSwap, setCurrencyExchangeAffterSwap] = useState(
    {}
  );
  const [currencySourceAffterSwap, setCurrencySourceAffterSwap] = useState({});

  // fetch api get currencies
  useEffect(() => {
    const fetchApiGetCurrencies = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}prices.json`
        )
          .then((res) => res.json())
          .then((data) => {
            const customData = data.map((_data, index) => {
              return {
                id: index + 1,
                currency: _data.currency,
                date: _data.date,
                price: _data.price,
              };
            });

            setCurrencies(customData);
          });

        return response;
      } catch (e) {
        console.log({ e });
      }
    };

    fetchApiGetCurrencies();
  }, []);

  // handle submit form swap
  const handleOnFinishForm = (values) => {
    if (values) {
      const { soTienHoanDoi, loaiTienNguon, loaiTienMuonHoanDoi } = values;

      // filter
      const findLoaiTienNguon = currencies.find(
        (_currency) => _currency.id === loaiTienNguon
      );
      const findLoaiTienMuonHoanDoi = currencies.find(
        (_currency) => _currency.id === loaiTienMuonHoanDoi
      );

      // get price
      const newLoaiTienNguon = findLoaiTienNguon.price;
      const newLoaiTienMuonHoanDoi = findLoaiTienMuonHoanDoi.price;

      //   handle swap currency
      setResultCurrency(
        swapCurrency(soTienHoanDoi, newLoaiTienNguon, newLoaiTienMuonHoanDoi)
      );
      setCurrencySourceAffterSwap(findLoaiTienNguon);
      setCurrencyExchangeAffterSwap(findLoaiTienMuonHoanDoi);
      message.success(
        `Chuyển đổi thành công từ loại tiền "${findLoaiTienNguon.currency}" sang loại tiền "${findLoaiTienMuonHoanDoi.currency}".`
      );
    }
  };

  // handle reset form
  const handleResetForm = () => {
    formSwap.resetFields();
    setResultCurrency(0);
    setCurrencySourceAffterSwap({});
    setCurrencyExchangeAffterSwap({});
  };

  return (
    <div>
      <h2>Xin Chào, Chuyển Đổi Tiền Tuệ Ngay Tại Đây</h2>
      <Form
        {...customFormInput}
        form={formSwap}
        onFinish={handleOnFinishForm}
        className="form-swap"
      >
        {/* Nguồn tiền gốc */}
        <Row>
          <Col xs={12} sm={24} md={24} lg={24}>
            <Form.Item
              name="loaiTienNguon"
              label="Loại tiền nguồn"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại tiền nguồn này!",
                },
              ]}
            >
              <Select
                fieldNames="loaiTienNguon"
                options={currencies.map((currency) => ({
                  label: currency.currency,
                  value: currency.id,
                }))}
                placeholder="Chọn loại tiền..."
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Loại tiền muốn đổi sang */}
        <Row>
          <Col xs={12} sm={24} md={24} lg={24}>
            <Form.Item
              name="loaiTienMuonHoanDoi"
              label="Loại tiền muốn hoán đổi"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại tiền muốn hoán đổi!",
                },
              ]}
            >
              <Select
                fieldNames="loaiTienMuonHoanDoi"
                options={currencies.map((currency) => ({
                  label: currency.currency,
                  value: currency.id,
                }))}
                placeholder="Chọn loại tiền..."
              ></Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Giá sau khi chuyển đổi loại tiền */}
        <Row>
          <Col xs={12} sm={24} md={24} lg={24}>
            <Form.Item
              name="soTienHoanDoi"
              label="Số tiền hoán đổi"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiền cần hoán đổi!",
                },
              ]}
            >
              <InputNumber
                name="soTienHoanDoi"
                className="inp-price"
                placeholder="Nhập số tiền cần đổi..."
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={24} md={24} lg={24}>
            <div className="func-swap">
              {/* Currency result */}
              <CurrencyResult
                currencySourceAffterSwap={currencySourceAffterSwap}
                currencyExchangeAffterSwap={currencyExchangeAffterSwap}
                resultCurrency={resultCurrency}
              />

              {/* Buttons footer */}
              <Buttons handleResetForm={handleResetForm} />
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CurrencySwapForm;
