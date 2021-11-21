import {Icon} from "../Icon";
					import { CleaningIconSvg } from './CleaningIconSvg';

					export const CleaningIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {CleaningIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
