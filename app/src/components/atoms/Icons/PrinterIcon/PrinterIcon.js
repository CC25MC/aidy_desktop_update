import {Icon} from "../Icon";
					import { PrinterIconSvg } from './PrinterIconSvg';

					export const PrinterIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {PrinterIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
