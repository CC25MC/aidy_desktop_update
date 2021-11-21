import {Icon} from "../Icon";
					import { Main3horizontalIconSvg } from './Main3horizontalIconSvg';

					export const Main3horizontalIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {Main3horizontalIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
