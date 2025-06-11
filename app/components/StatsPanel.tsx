interface StatsPanelProps {
	todos: Array<{
		_id: string;
		isCompleted: boolean;
	}>;
	isFiltered?: boolean;
}

export default function StatsPanel({ todos, isFiltered = false }: StatsPanelProps) {
	const totalTodos = todos.length;
	const completedTodos = todos.filter(t => t.isCompleted).length;
	const incompleteTodos = totalTodos - completedTodos;
	const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

	return (
		<section>
			<div
				className="glass rounded-3xl p-8 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl
                    hover:bg-white/15 transition-all duration-500 group"
			>
				<div className="text-center mb-8">
					<h2 className="text-xl font-bold text-white/90 tracking-wide">
						{isFiltered ? "検索結果の統計" : "統計情報"}
					</h2>
					{isFiltered && (
						<p className="text-white/60 text-sm mt-2">フィルター適用中の結果です</p>
					)}
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
					{/* 全タスク */}
					<div className="text-center group/stat cursor-default">
						<div className="transform transition-all duration-300 group-hover/stat:scale-110">
							<div
								className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight
                            bg-gradient-to-br from-white to-white/80 bg-clip-text"
								style={{ textShadow: "0 4px 20px rgba(255,255,255,0.3)" }}
							>
								{totalTodos}
							</div>
							<div className="text-sm font-semibold text-white/70 tracking-wider uppercase">
								全タスク
							</div>
						</div>
					</div>

					{/* 完了 */}
					<div className="text-center group/stat cursor-default">
						<div className="transform transition-all duration-300 group-hover/stat:scale-110">
							<div
								className="text-4xl lg:text-5xl font-black text-emerald-400 mb-3 tracking-tight"
								style={{ textShadow: "0 4px 20px rgba(52, 211, 153, 0.4)" }}
							>
								{completedTodos}
							</div>
							<div className="text-sm font-semibold text-white/70 tracking-wider uppercase">
								完了
							</div>
						</div>
					</div>

					{/* 未完了 */}
					<div className="text-center group/stat cursor-default">
						<div className="transform transition-all duration-300 group-hover/stat:scale-110">
							<div
								className="text-4xl lg:text-5xl font-black text-purple-400 mb-3 tracking-tight"
								style={{ textShadow: "0 4px 20px rgba(168, 85, 247, 0.4)" }}
							>
								{incompleteTodos}
							</div>
							<div className="text-sm font-semibold text-white/70 tracking-wider uppercase">
								未完了
							</div>
						</div>
					</div>

					{/* 達成率 */}
					<div className="text-center group/stat cursor-default">
						<div className="transform transition-all duration-300 group-hover/stat:scale-110">
							<div
								className="text-4xl lg:text-5xl font-black text-pink-400 mb-3 tracking-tight"
								style={{ textShadow: "0 4px 20px rgba(244, 114, 182, 0.4)" }}
							>
								{completionRate}%
							</div>
							<div className="text-sm font-semibold text-white/70 tracking-wider uppercase">
								達成率
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
