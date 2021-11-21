import {Icon} from "../Icon";
					import { OtherpaymentIconSvg } from './OtherpaymentIconSvg';

					export const OtherpaymentIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {OtherpaymentIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
