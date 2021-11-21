import {Icon} from "../Icon";
					import { CardsIconSvg } from './CardsIconSvg';

					export const CardsIcon = ({
						css,
						color,
						...props
					}) => {
						return (
							<Icon 
								{...props} 
								as = {CardsIconSvg} 
								css = {{
									...css,
									color
								}}
							/>
						);
					};
