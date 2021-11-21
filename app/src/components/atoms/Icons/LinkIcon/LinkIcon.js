import {Icon} from "../Icon";
					import { LinkIconSvg } from './LinkIconSvg';

					export const LinkIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {LinkIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
