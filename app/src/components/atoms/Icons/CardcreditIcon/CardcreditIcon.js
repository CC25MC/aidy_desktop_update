import {Icon} from "../Icon";
					import { CardcreditIconSvg } from './CardcreditIconSvg';

					export const CardcreditIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {CardcreditIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
