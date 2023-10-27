import { Select } from "antd";

function Currencies({ currencies, fieldNames }) {
  return (
    <>
      <Select
        fieldNames={fieldNames}
        options={currencies.map((currency) => ({
          label: currency.currency,
          value: currency.price,
        }))}
        placeholder="Chọn loại tiền..."
      />
    </>
  );
}

export default Currencies;
