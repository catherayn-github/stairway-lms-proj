"use client";

/* COMPONENTS */
import { Toaster as RhtToaster, ToastBar } from "react-hot-toast";

const Toaster = () => {
	return (
		<RhtToaster
			position="top-center"
			toastOptions={{
				duration: 5000,
				style: {
					padding: "1rem",
				},
				success: {
					iconTheme: {
						primary: "#00C360",
						secondary: "#FFFFFF",
					},
				},
				error: {
					iconTheme: {
						primary: "#EB1C25",
						secondary: "#FFFFFF",
					},
				},
			}}
		>
			{(t) => (
				<ToastBar toast={t} position="bottom-right">
					{({ icon, message }) => {
						const toast_title = t.type === "success" ? "Success" : "Error Occurred";

						return (
							<div className="flex w-full items-center gap-[2rem]">
								<div className="bg-medium/30 flex size-[16] items-center justify-center rounded-full">
									{icon}
								</div>
								<div className="flex flex-col items-start gap-[9] *:m-[0px_0px_!important]">
									<span className="text-[1.9rem] font-bold">{toast_title}</span>
									<span className="max-w-[45rem] text-[1.6rem] *:m-[0px_0px_!important]">
										{message}
									</span>
								</div>
							</div>
						);
					}}
				</ToastBar>
			)}
		</RhtToaster>
	);
};

export default Toaster;
