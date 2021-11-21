import { Actions } from "./Actions";
import KeyView from "./View";

const KeyContainer = ({ ...props }) => {
	const actions = Actions();
	return <KeyView {...props} {...actions} />;
};

export default KeyContainer;
