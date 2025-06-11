"use client";

import { useState } from "react";

interface SearchAndFilterProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	filter: "all" | "completed" | "pending";
	onFilterChange: (filter: "all" | "completed" | "pending") => void;
	sortBy: "newest" | "oldest" | "alphabetical";
	onSortChange: (sort: "newest" | "oldest" | "alphabetical") => void;
	totalCount: number;
	filteredCount: number;
}

export default function SearchAndFilter({
	searchTerm,
	onSearchChange,
	filter,
	onFilterChange,
	sortBy,
	onSortChange,
	totalCount,
	filteredCount,
}: SearchAndFilterProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="glass rounded-2xl p-6 backdrop-blur-2xl bg-white/15 border border-white/25 shadow-xl">
			{/* 検索バー */}
			<div className="relative mb-4">
				<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<svg
						className="w-5 h-5 text-white/60"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="タスクを検索..."
					className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-md rounded-xl
						text-white placeholder-white/60 outline-none text-base font-medium
						border border-white/20 transition-all duration-300
						focus:bg-white/30 focus:border-white/40 focus:ring-2 focus:ring-white/20"
				/>
				{searchTerm && (
					<button
						onClick={() => onSearchChange("")}
						className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors"
					>
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				)}
			</div>

			{/* フィルター切り替えボタン */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					{/* 結果カウント */}
					<span className="text-white/80 text-sm font-medium">
						{filteredCount !== totalCount
							? `${filteredCount} / ${totalCount} タスク`
							: `${totalCount} タスク`}
					</span>

					{/* 詳細フィルターボタン */}
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 
							transition-all duration-200 text-white/80 hover:text-white text-sm font-medium"
					>
						<svg
							className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
						フィルター
					</button>
				</div>

				{/* クイックフィルターボタン */}
				<div className="flex gap-2">
					{(["all", "pending", "completed"] as const).map((filterOption) => (
						<button
							key={filterOption}
							onClick={() => onFilterChange(filterOption)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
								filter === filterOption
									? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
									: "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
							}`}
						>
							{filterOption === "all" && "すべて"}
							{filterOption === "pending" && "未完了"}
							{filterOption === "completed" && "完了済み"}
						</button>
					))}
				</div>
			</div>

			{/* 詳細フィルター（展開時） */}
			{isExpanded && (
				<div className="mt-4 pt-4 border-t border-white/20 animate-in">
					<div className="flex flex-wrap items-center gap-4">
						{/* ソート */}
						<div className="flex items-center gap-2">
							<span className="text-white/80 text-sm font-medium">並び順:</span>
							<select
								value={sortBy}
								onChange={(e) => onSortChange(e.target.value as "newest" | "oldest" | "alphabetical")}
								className="px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white text-sm
									border border-white/20 outline-none transition-all duration-200
									focus:bg-white/30 focus:border-white/40"
							>
								<option value="newest" className="bg-gray-800">新しい順</option>
								<option value="oldest" className="bg-gray-800">古い順</option>
								<option value="alphabetical" className="bg-gray-800">アルファベット順</option>
							</select>
						</div>

						{/* 検索統計 */}
						{searchTerm && (
							<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
								<svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-white/80 text-sm">
									「{searchTerm}」で検索中
								</span>
							</div>
						)}

						{/* フィルターリセット */}
						{(searchTerm || filter !== "all" || sortBy !== "newest") && (
							<button
								onClick={() => {
									onSearchChange("");
									onFilterChange("all");
									onSortChange("newest");
								}}
								className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 
									transition-all duration-200 text-red-300 hover:text-red-200 text-sm font-medium"
							>
								<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
								リセット
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}