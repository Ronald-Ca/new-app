import FormLogin from "@app/components/form/form-login";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@app/components/ui/card";
import { motion } from "framer-motion";

export default function Login() {
	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black p-4">
			<div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-full max-w-md relative z-10">
					<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<Card className="border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-cyan-500/10">
							<CardHeader className="space-y-1 pb-4">
								<CardTitle className="text-2xl font-bold text-center text-white">
									Bem-vindo de volta
								</CardTitle>
								<CardDescription className="text-center text-slate-400">
									Entre com suas credenciais para acessar sua conta
								</CardDescription>
							</CardHeader>
							<CardContent>
								<FormLogin />
							</CardContent>
						</Card>
					</motion.div>

					<div className="mt-8 text-center text-sm text-slate-500">
						<p>© {new Date().getFullYear()} Ronald Camargo. Todos os direitos reservados.</p>
					</div>
				</div>
			</div>
		</div>
	);
}