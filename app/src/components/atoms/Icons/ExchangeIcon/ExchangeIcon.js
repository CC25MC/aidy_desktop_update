import {Icon} from "../Icon";
					import { ExchangeIconSvg } from './ExchangeIconSvg';

					export const ExchangeIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {ExchangeIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
