import {Icon} from "../Icon";
					import { ArrowRightIconSvg } from './ArrowRightIconSvg';

					export const ArrowRightIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {ArrowRightIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
