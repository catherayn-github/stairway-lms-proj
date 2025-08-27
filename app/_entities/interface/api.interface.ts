export interface NewAuth {
	access_token: string;
	refresh_token: string;
}

export interface SetNewAuth {
	new_auth?: NewAuth;
}

export interface ResponseData<ReturnType = null> {
	status: boolean;
	result: ReturnType | null;
	error: string;
}

export interface HookCallbacks<T = unknown> {
	onSuccess?: (data?: T) => void;
	onError?: (error: string) => void;
}
