import {Icon} from "../Icon";
					import { CloseIconSvg } from './CloseIconSvg';

					export const CloseIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {CloseIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
