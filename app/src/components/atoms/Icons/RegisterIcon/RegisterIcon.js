import {Icon} from "../Icon";
					import { RegisterIconSvg } from './RegisterIconSvg';

					export const RegisterIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {RegisterIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
