import {Icon} from "../Icon";
					import { ShareIconSvg } from './ShareIconSvg';

					export const ShareIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {ShareIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
