import UserSidebar from "../../components/layout/UserSidebar"
import { useState } from "react";
import MiniProfileUser from "../../components/common/MiniProfileUser";

function MisCompras() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleCollapseChange = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div>
      <UserSidebar  onCollapseChange={handleCollapseChange} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
        }}
      >
        <MiniProfileUser />
      </div>

      <main
        style={{ marginTop: "0px" }}
        className={`content ${isCollapsed ? "collapsed" : ""}`}
      >
        Hola
      </main>
    </div>
  );
}

export default MisCompras
