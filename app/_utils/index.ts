/* REACT */
import { redirect } from "next/navigation";
/* PLUGINS */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StoreApi, UseBoundStore } from "zustand";
/* ENTITIES */
import { AxiosError } from "axios";
/* CONSTANTS */
import { SIGNOUT_ERROR } from "@app/_constants";
type WithSelectors<S> = S extends { getState: () => infer T }
	? S & { use: { [K in keyof T]: () => T[K] } }
	: never;

/**
 * DOCU: Creates selector hooks for a Zustand store to access individual state slices without causing unnecessary re-renders. <br>
 * Triggered: When initializing a Zustand store that needs selectors for optimized component updates. <br>
 * @param {UseBoundStore<StoreApi<object>>} _store - The Zustand store to create selectors for
 * @returns {WithSelectors<S>} The original store enhanced with a `use` object containing selector hooks
 */
export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
	const store = _store as WithSelectors<typeof _store>;
	store.use = {};
	for (const k of Object.keys(store.getState())) {
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		(store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
	}

	return store;
};

/**
 * DOCU: Merges multiple class names using clsx and tailwind-merge to handle conditional classes. <br>
 * Triggered: When dynamic class names need to be combined in component rendering. <br>
 * @param {ClassValue[]} inputs - Array of class names, objects, or arrays to be merged
 * @returns {string} A single string of merged and optimized class names
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * DOCU: Extracts a readable error message from different error types and provides a fallback for unknown error types. <br>
 * Triggered: When handling errors in try/catch blocks or error boundaries across the application. <br>
 * Last Updated Date: March 16, 2022
 * @param {unknown} error - The error object or message to format
 * @returns {string} A human-readable error message
 * @author Error Handling Team
 */
export const formatErrorMessage = (error: unknown) => {
	if (typeof error === "string") {
		return error;
	} 
	else if (error instanceof AxiosError) {
		return error.message;
	} 
	else if (error instanceof Error) {
		return error.message;
	} 
	else {
		return "Something went wrong. Please try again.";
	}
};

/**
 * DOCU: Checks if an error matches the authentication error that requires re-login and throws it if matched. <br>
 * Triggered: When an error occurs in authenticated API requests to determine if it's an authentication issue. <br>
 * Last Updated Date: December 10, 2024
 * @param {string} error - The error message to evaluate
 * @throws {string} Throws the error if it matches the authentication error requiring re-login
 * @author Alfonso
 */
export function throwAuthenticationError(error: string) {
	if (error === SIGNOUT_ERROR) {
		throw error;
	}
}

/**
 * DOCU: Redirects the user to the sign-out endpoint when an authentication error is detected. <br>
 * Triggered: When an authentication error occurs during API requests or component rendering. <br>
 * Last Updated Date: January 15, 2025
 * @param {unknown} error - The error to check against authentication failure conditions
 * @returns {never|void} Either redirects (never returns) or returns void if not an auth error
 * @author Auth Team
 */
export const signOutUnauthenticatedUser = (error: unknown) => {
	if (error === SIGNOUT_ERROR) {
		redirect("/api/sign-out");
	}
};