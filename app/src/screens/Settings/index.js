import { Actions } from "./Actions";
import SettingsView from "./View";

const SettingsContainer = ({ ...props }) => {
	const actions = Actions();
	return <SettingsView {...props} {...actions} />;
};

export default SettingsContainer;
