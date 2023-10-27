import { Tooltip } from "antd";
import CurrencyTooltip from "../CurrencyTooltip";

function CurrencyResult({
  currencySourceAffterSwap,
  currencyExchangeAffterSwap,
  resultCurrency,
}) {
  return (
    <strong>
      <i>Số tiền sau khi đổi:</i>

      {Object.keys(currencySourceAffterSwap).length > 0 ||
      Object.keys(currencyExchangeAffterSwap).length > 0 ? (
        <Tooltip
          title={
            <CurrencyTooltip
              currencySourceAffterSwap={currencySourceAffterSwap}
              currencyExchangeAffterSwap={currencyExchangeAffterSwap}
            />
          }
        >
          <span className="result-amount">
            {resultCurrency} {currencyExchangeAffterSwap?.currency}
          </span>
        </Tooltip>
      ) : (
        " ..."
      )}
    </strong>
  );
}

export default CurrencyResult;
