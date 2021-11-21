import {Icon} from "../Icon";
					import { PosIconSvg } from './PosIconSvg';

					export const PosIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {PosIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
