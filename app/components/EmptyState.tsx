export default function EmptyState() {
	return (
		<section className="max-w-lg mx-auto">
			<div
				className="glass rounded-3xl p-12 backdrop-blur-xl bg-white/8 border border-white/15 
                    shadow-xl transform hover:scale-102 transition-all duration-500 ease-out
                    hover:bg-white/12 hover:shadow-white/5 group cursor-default"
			>
				<div className="text-center space-y-6">
					{/* アイコン */}
					<div
						className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/15 to-pink-400/15 
                        flex items-center justify-center backdrop-blur-sm border border-white/15
                        group-hover:scale-110 transition-transform duration-500"
					>
						<svg
							className="w-10 h-10 text-white/40 group-hover:text-white/60 transition-colors duration-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h4.125m0-15.75v15.75"
							/>
						</svg>
					</div>

					{/* メッセージ */}
					<div className="space-y-3">
						<h3 className="text-xl font-bold text-white/80 tracking-wide">タスクがありません</h3>
						<p className="text-white/50 text-base font-medium max-w-xs mx-auto leading-relaxed">
							上のフォームから
							<br className="sm:hidden" />
							新しいタスクを追加しましょう
						</p>
					</div>

					{/* 矢印アイコン（上向き） */}
					<div className="pt-2">
						<svg
							className="w-6 h-6 mx-auto text-white/30 animate-bounce"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
}
