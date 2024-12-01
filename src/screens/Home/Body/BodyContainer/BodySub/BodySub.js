import React, {useState} from 'react';
import Sidebar from "../../../../../components/Sidebar/Sidebar";
import Backdrop from "../../../../../components/Backdrop/Backdrop";
import BodyContainerComponent from "../Body.Container.Component";
import Footer from "../../Footer/Footer";

const BodySub = () => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <>
            {/*<Navbar setSidebar={setSidebar} />*/}
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            <Backdrop sidebar={sidebar} setSidebar={setSidebar} />
            <BodyContainerComponent />
            <Footer />
        </>
    );
};

export default React.memo(BodySub);