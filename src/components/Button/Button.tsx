import React, {
	ReactNode,
	isValidElement,
	ElementType,
	HTMLAttributes,
} from 'react';
import clsx from 'clsx';
import Spinner, { spinnerColorsEnum } from '../Spinner/Spinner';


type variants = 'primary' | 'secondary';
type sizes = 'sm' | 'md' | 'lg';
type types = 'submit' | 'reset' | 'button';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	to?: string;
	as?: ReactNode;
	variant?: variants;
	isLoading?: boolean;
	isFullWidth?: boolean;
	type?: types;
	disabled?: boolean;
	size?: sizes;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

const spinnerColors = {
	primary: spinnerColorsEnum.white,
	secondary: spinnerColorsEnum.darkBlue,
};

const addHttps = (url: string) =>
	url.startsWith('www') ? `https://${url}` : url;

const isExternalURL = (url: string) =>
	new URL(addHttps(url)).origin !== window.location.origin;

export const Button = (props: ButtonProps) => {
	const {
		type = 'button',
		to,
		as,
		disabled = false,
		isLoading = false,
		isFullWidth = false,
		variant = 'primary',
		size = 'md',
		className,
		leftIcon,
		rightIcon,
		children,
		...rest
	} = props;
	const buttonClasses = clsx(
		// default
		'relative inline-flex items-center justify-center py-2 px-4',
		'border border-transparent rounded-md',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue',

		// variants
		variant === 'primary' && 'bg-blue text-white shadow-sm',
		variant === 'secondary' && 'bg-blue-100 text-darkBlue',

		// sizes
		size === 'sm' && '',
		size === 'md' && '',
		size === 'lg' && '',

		// states
		isFullWidth && 'w-full',
		isLoading && 'select-none !text-transparent',
		(disabled || isLoading) && 'opacity-70 pointer-events-none',

		// className
		className,
	);

	const content = () => (
		<>
			{leftIcon && <span className="mr-1 button-icon-wrapper">{leftIcon}</span>}

			{children}

			{rightIcon && (
				<span className="ml-1 button-icon-wrapper">{rightIcon}</span>
			)}
		</>
	);

	if (to) {
		const isExternal = isExternalURL(to);
		const isValidLinkElement = isValidElement(as);
		const As = (isExternal || !isValidLinkElement ? 'a' : as) as ElementType;
		const asProps = {
			className: buttonClasses,
			[isExternal || !isValidLinkElement ? 'href' : 'to']: addHttps(to),
			...(isExternal && { target: '_blank' }),
			...rest,
		};

		return <As {...asProps}>{content()}</As>;
	}

	const buttonProps = {
		className: buttonClasses,
		disabled: disabled || isLoading,
		type,
		...rest,
	};

	return (
		<button {...buttonProps}>
			{content()}

			{isLoading && (
				<span className="absolute inset-0 flex items-center justify-center">
					<Spinner color={spinnerColors[variant]} />
				</span>
			)}
		</button>
	);
};

export default Button;
