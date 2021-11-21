import {Icon} from "../Icon";
					import { SettingsIconSvg } from './SettingsIconSvg';

					export const SettingsIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {SettingsIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
