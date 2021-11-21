import {Icon} from "../Icon";
					import { DiscountIconSvg } from './DiscountIconSvg';

					export const DiscountIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {DiscountIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
