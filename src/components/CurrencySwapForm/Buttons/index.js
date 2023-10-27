import { Button } from "antd";

function Buttons({ handleResetForm }) {
  return (
    <div>
      <Button type="primary" htmlType="submit">
        Chuyển đổi
      </Button>
      <Button className="btn-reset" onClick={handleResetForm}>
        Làm mới
      </Button>
    </div>
  );
}

export default Buttons;
