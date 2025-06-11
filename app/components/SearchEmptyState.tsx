interface SearchEmptyStateProps {
	searchTerm: string;
	filter: "all" | "completed" | "pending";
	onClearSearch: () => void;
}

export default function SearchEmptyState({ searchTerm, filter, onClearSearch }: SearchEmptyStateProps) {
	const getEmptyMessage = () => {
		if (searchTerm && filter !== "all") {
			return {
				title: "該当するタスクが見つかりません",
				description: `「${searchTerm}」に一致する${filter === "completed" ? "完了済み" : "未完了"}のタスクはありません`,
			};
		} else if (searchTerm) {
			return {
				title: "検索結果がありません",
				description: `「${searchTerm}」に一致するタスクは見つかりませんでした`,
			};
		} else if (filter === "completed") {
			return {
				title: "完了済みタスクがありません",
				description: "まだ完了したタスクがありません。頑張ってタスクを完了させましょう！",
			};
		} else if (filter === "pending") {
			return {
				title: "未完了タスクがありません",
				description: "素晴らしい！すべてのタスクが完了しています。",
			};
		} else {
			return {
				title: "タスクがありません",
				description: "新しいタスクを追加して始めましょう",
			};
		}
	};

	const { title, description } = getEmptyMessage();

	return (
		<div className="text-center py-16 px-6">
			<div className="glass rounded-3xl p-12 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl max-w-lg mx-auto">
				{/* アイコン */}
				<div className="mb-6">
					{searchTerm ? (
						<div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
							<svg
								className="w-10 h-10 text-yellow-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					) : (
						<div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center">
							<svg
								className="w-10 h-10 text-purple-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
						</div>
					)}
				</div>

				{/* メッセージ */}
				<h3 className="text-2xl font-bold text-white/90 mb-3">{title}</h3>
				<p className="text-white/60 text-base leading-relaxed mb-8">{description}</p>

				{/* アクション */}
				{searchTerm && (
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<button
							onClick={onClearSearch}
							className="px-6 py-3 rounded-xl font-medium text-white
								bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
								transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
						>
							検索をクリア
						</button>
						<div className="text-white/40 text-sm py-3">
							または検索条件を変更してください
						</div>
					</div>
				)}

				{/* 検索のヒント */}
				{searchTerm && (
					<div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
						<h4 className="text-white/80 font-medium mb-2 flex items-center gap-2">
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							検索のコツ
						</h4>
						<ul className="text-white/60 text-sm space-y-1 text-left">
							<li>• 短いキーワードで検索してみてください</li>
							<li>• フィルターを「すべて」に変更してみてください</li>
							<li>• 英数字の場合は大文字小文字を確認してください</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}