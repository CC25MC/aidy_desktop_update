import {Icon} from "../Icon";
					import { MoneyIconSvg } from './MoneyIconSvg';

					export const MoneyIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {MoneyIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
