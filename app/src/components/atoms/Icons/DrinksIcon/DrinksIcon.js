import {Icon} from "../Icon";
					import { DrinksIconSvg } from './DrinksIconSvg';

					export const DrinksIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {DrinksIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
