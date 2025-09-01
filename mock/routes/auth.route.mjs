import users_data from "../data/user.data.mjs";
export default function authRoutes(app) {
	app.post("/api/auth/signin", (req, res) => {
		const { email_address, password } = req.body;
		const user = users_data.find((u) => u.email === email_address);

		if (user && password === "admin123" && user.role === "Admin") {
			res.jsonp({
				status: true,
				result: {
					user : user,
					access_token:
						"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFBQ1R4dyIsInR5cGUiOiJhY2MiLCJpYXQiOjE3NDEwNTQyMTcsImV4cCI6MTc0MTA1NDI3N30.2QDc7RbU6fF_rjG5jBPdjy5ySASYu1D9ZYI-3jlSOn7YOWZPkEPP6Yhwa7EiY17WEen-d3b8CnnuLWKkOasdKjA7_0PVjAdov8BZPuVDkgHUq8Qkl0GkGva5ly8-Ud65q-36CXYtT3CArbkx41gxuvfyU8SLftRajvMWLgCqFd9Ae-ZmtJRYZfzZL3Itdn0V734zAnbXdnUVsNXujvuZtVriSkXdzsfuQt1v3H1mkr2F5_FRBgYNTCnuAdt-Hu-B8vot3GOiXhME67ppVCJQAuMpNXzG7xODDoj_4KJ_mDAdsJe7fdZdSnUinBS-ezRZ2kc7aZYL6KlcRivN4z2OiZErDji99vMzo2WPiQsYlH_lCts813J9dKmGo7UT0s8YuAgCNnuCBESow_enSc6tKfc-Qien584Oq-o5i08t1dWhqJKeWP22fsV7785yitGIue1P21-WUhupv0oYuTb4luP5VLDIo0nBPIhezZgOphxbG8oeixHBXV4zB7Dq0T3S5apIo47tn9BVSMrlHX1lH05I8kwl3AZSxl2rlljgmekdQMRehozOTiZUp2mPsbHojqBb-ehiEhueAQ_1MFGjjgulGAYFC6xNa_Mh3uOHUah0j0jKkqkvglHeqYi29JvxL6fKvek2WyObSzj0rrVCYH_G3eUY6j7ThO2-4oietNU",
					refresh_token:
						"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFBQ1R4dyIsInR5cGUiOiJyZWYiLCJscHUiOiIyMDI1LTAyLTE4VDAzOjQ4OjE3LjAwMFoiLCJpYXQiOjE3NDA1NTIxMDgsImV4cCI6MTc0MzE0NDEwOH0.2x5Qmn_txxXoDjptnAWinwcq5qKo4nuPYDYrmcxGiVlWcvNc1S_p_wk6SRW2FASYM-BmV-oxm15YhNJ8i1ZVQ_iOy3Dv-geSLnje48IytG7Www5q8UrabIdgaFouW-nDgfvd0-Aw6xeq_qU1DbGGFz0UUPFpjZfSMbI7RQb9FQuQlWDNDihyqfoItrFbufg6AaH8mB--W_-9RCRyE1S8hEg_BhVqOcJy8oqthLPDb8rBRFZKCOXJ3YRz71_2A9af3r80rqkE0QB5b80QeTR2EOu2IJQTLidBGAzL-l8IomOVCGD7cTbVHFA_JluHSZ5U2zhzUnB46OZQSOHp6L21g_hf1OF63v2EAYYqVp8WnsOfzKgTS2yNctl1Ktud3bThES_GM6Ql8CtQI0blXYqAECsksAjHkRn7ibQvyvBBjVRj0nOvkiOElQdFe3ex-nVwUEM68-n7-rZLiG5Ybnvb3_KH_6E_X7zrOnDHI5YTl7MgeEhRAMfCOXNTnG8tctFqzAJpW2bWJ45VGqXwToGUV-GTyvDVXbgRsVeu1a0Ay7XWmZroS3SzmzIsdHZFgW9vBDUM6-d_3u4J_RtpW5D51vUxQjjJLwuSPCTkfwlUVhQAUqPNyV56rNDQ0WrAaUFD-b-QwO3bpFnSEMXcbsamX1jaTzbyofaVSYe5scdv5AI",
				},
				error: null,
			});
		} 
		else {
			res.jsonp({
				status: false,
				result: null,
				error: "Invalid credentials",
			});
		}
	});
}
