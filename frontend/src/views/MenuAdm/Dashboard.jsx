import AdminSidebar from "../../components/layout/AdminSidebar"
import { useState } from "react";
import MiniProfile from "../../components/common/MiniProfile";

function Dashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapseChange = (collapsed) => {
        setIsCollapsed(collapsed);
      };
    return (
        <div className="Admin-layout">
            
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px" }}>
                <MiniProfile />
            </div>
            <AdminSidebar onCollapseChange={handleCollapseChange} />
            <main style={{marginTop:"0px"}} className={`content ${isCollapsed ? 'collapsed' : ''}`}>



            </main>
        </div>
    )
}

export default Dashboard
