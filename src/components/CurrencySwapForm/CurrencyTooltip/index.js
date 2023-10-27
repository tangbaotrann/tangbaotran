import dayjs from "dayjs";

function CurrencyTooltip({
  currencySourceAffterSwap,
  currencyExchangeAffterSwap,
}) {
  return (
    <div>
      <i>
        {/* Loại tiền nguồn */}* Loại tiền:{" "}
        {currencySourceAffterSwap ? currencySourceAffterSwap?.currency : null}
        {" - "}
        Giá:{" "}
        {currencySourceAffterSwap
          ? currencySourceAffterSwap?.price?.toFixed(5)
          : null}{" "}
        - Cập nhật ngày:{" "}
        {currencySourceAffterSwap
          ? dayjs(currencySourceAffterSwap?.date).format("DD/MM/YYYY")
          : null}
        <br />
        {/* Loại tiền muốn hoán đổi */}* Loại tiền:{" "}
        {currencyExchangeAffterSwap
          ? currencyExchangeAffterSwap?.currency
          : null}
        {" - "}
        Giá:{" "}
        {currencyExchangeAffterSwap
          ? currencyExchangeAffterSwap?.price?.toFixed(5)
          : null}{" "}
        - Cập nhật ngày:{" "}
        {currencyExchangeAffterSwap
          ? dayjs(currencyExchangeAffterSwap?.date).format("DD/MM/YYYY")
          : null}
      </i>
    </div>
  );
}

export default CurrencyTooltip;
