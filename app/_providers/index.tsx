/* REACT */
import { PropsWithChildren } from "react";
/* COMPONENTS */
import QueryClientProvider from "@app/_providers/QueryClientProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider>
			<NuqsAdapter>{children}</NuqsAdapter>
		</QueryClientProvider>
	);
};

export default Providers;
