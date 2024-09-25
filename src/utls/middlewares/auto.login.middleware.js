import {login} from "../../store/actions/login.action";
import {connect} from "react-redux";

const AutoLoginMiddleware = ({login}) => {
    const provider = JSON.parse(localStorage.getItem('takemeproviderdata'));
    const providertoken = JSON.parse(localStorage.getItem('takemeprovidertoken'));

    if(!provider.id && !providertoken) {
        // const customerdata
    }
}



