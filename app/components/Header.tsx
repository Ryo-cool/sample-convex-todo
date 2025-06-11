interface HeaderProps {
	compact?: boolean;
}

export default function Header({ compact = false }: HeaderProps) {
	if (compact) {
		return (
			<header className="text-center space-y-3">
				<h1
					className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight"
					style={{
						textShadow: "0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(147,51,234,0.3)",
					}}
				>
					Liquid Glass ToDo
				</h1>
				<p className="text-base lg:text-lg text-white/70 font-medium">
					リアルタイムで同期する美しいタスク管理
				</p>
			</header>
		);
	}

	return (
		<header className="text-center space-y-6 mb-4">
			<h1
				className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none"
				style={{
					textShadow: "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(147,51,234,0.4)",
				}}
			>
				Liquid Glass ToDo
			</h1>
			<p className="text-lg sm:text-xl text-white/80 font-medium max-w-md mx-auto leading-relaxed">
				リアルタイムで同期する美しいタスク管理
			</p>
		</header>
	);
}
