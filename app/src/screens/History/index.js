import { Actions } from "./Actions";
import HistoryView from "./View";

const HistoryContainer = ({ ...props }) => {
	const actions = Actions();
	return <HistoryView {...props} {...actions} />;
};

export default HistoryContainer;
