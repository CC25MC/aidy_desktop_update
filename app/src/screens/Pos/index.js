import { Actions } from "./Actions";
import PosView from "./View";

const PosContainer = ({ ...props }) => {
	const actions = Actions();
	return <PosView {...props} {...actions} />;
};

export default PosContainer;
