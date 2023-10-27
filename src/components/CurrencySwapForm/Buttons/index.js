import { Button } from "antd";

function Buttons({ handleResetForm }) {
  return (
    <div>
      <Button className="btn-reset" onClick={handleResetForm}>
        Làm mới
      </Button>
      <Button type="primary" htmlType="submit">
        Chuyển đổi
      </Button>
    </div>
  );
}

export default Buttons;
