import {Icon} from "../Icon";
					import { CheckIconSvg } from './CheckIconSvg';

					export const CheckIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {CheckIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
